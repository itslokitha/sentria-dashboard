// ============================================================
// SENTRIA — DashboardApp
// The authenticated dashboard. Replaces dev1/src/app/App.tsx.
// All tabs, widgets, and data sources come from ClientConfig —
// nothing is hardcoded. Each user gets their own dashboard.
// ============================================================

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Sidebar } from './components/Sidebar';
import { NotificationPanel } from './components/NotificationPanel';
import { UserMenu } from './components/UserMenu';
import { LogoutModal } from './components/LogoutModal';
import { WorldClockModal } from './components/WorldClockModal';
import { GlobalSearchResults } from './components/GlobalSearchResults';
import { SettingsPage } from './components/SettingsPage';
import { ProfilePage } from './components/ProfilePage';
import { SecurityPage } from './components/SecurityPage';
import { NotificationSettingsPage } from './components/NotificationSettingsPage';
import { HelpPage } from './components/HelpPage';
import { AllActivitiesPage } from './components/AllActivitiesPage';
import { AllNotificationsPage } from './components/AllNotificationsPage';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import { useSettings, SettingsProvider } from './hooks/useSettings';
import { useTranslation } from './hooks/useTranslation';
import { renderWidget } from './config/widgetRegistry';
import type { WidgetId } from '../types/dashboard';
import { Search, Bell, Settings, X } from 'lucide-react';

// ── Internal pages not driven by widget registry ──────────────────────────────
const INTERNAL_PAGES = new Set([
  'settings',
  'profile',
  'security',
  'notification-settings',
  'help',
  'all-activities',
  'all-notifications',
]);

// ── Main content ──────────────────────────────────────────────────────────────
function DashboardContent() {
  const { session, logout } = useAuth();
  const { settings } = useSettings();
  const { t } = useTranslation();

  const config = session!.config;
  const user = session!.user;
  const dataSource = config.dataSource;

  // Resolve the Sheet ID from config (or empty string for non-sheets sources)
  const sheetId = dataSource.type === 'googleSheets' ? dataSource.sheetId : '';

  const [activeTab, setActiveTab] = useState(() => {
    // Default to first enabled tab
    const firstTab = config.dashboard.tabs
      .filter((t) => t.enabled)
      .sort((a, b) => a.order - b.order)[0];
    return firstTab?.id ?? 'overview';
  });

  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWorldClock, setShowWorldClock] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // User profile — starts from auth session, editable locally
  const [userProfile, setUserProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: '',
    jobTitle: user.jobTitle ?? 'Dashboard User',
    location: '',
    bio: '',
    avatarUrl: user.avatarUrl,
  });

  // Theme
  useEffect(() => {
    const root = document.documentElement;
    const theme = settings.theme;
    if (theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark-theme', prefersDark);
      root.classList.toggle('light-theme', !prefersDark);
    }
  }, [settings.theme]);

  // Data — from config's sheet ID (dynamic per client)
  const { data: bookingsData, refetch } = useGoogleSheets(sheetId);

  // Auto-refresh
  useEffect(() => {
    if (!config.dashboard.features.autoRefresh || !refetch) return;
    const ms = (config.dashboard.features.refreshIntervalSeconds ?? 120) * 1000;
    const id = setInterval(() => {
      refetch();
      setRefreshTrigger((n) => n + 1);
    }, ms);
    return () => clearInterval(id);
  }, [config.dashboard.features.autoRefresh, config.dashboard.features.refreshIntervalSeconds, refetch]);

  // Clock & greeting
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let hour: number;
      try {
        hour = parseInt(
          now.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: settings.timezone })
        );
      } catch {
        hour = now.getHours();
      }

      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: settings.timeFormat === '12h',
          timeZone: settings.timezone,
        })
      );

      if (hour < 5) setGreeting(t('greeting.night'));
      else if (hour < 12) setGreeting(t('greeting.morning'));
      else if (hour < 17) setGreeting(t('greeting.afternoon'));
      else setGreeting(t('greeting.evening'));
    };

    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [settings.timeFormat, settings.timezone, t]);

  // Stats derived from bookings data
  const stats = useMemo(() => {
    if (!bookingsData?.length) return { totalCalls: 0, confirmedCalls: 0, avgDuration: 0, successRate: 0 };
    const total = bookingsData.length;
    const confirmed = bookingsData.filter((b) => b.bookingStatus?.toLowerCase() === 'confirmed').length;
    const totalDuration = bookingsData.reduce((s, b) => s + (b.callDurationMinutes || 0), 0);
    return {
      totalCalls: total,
      confirmedCalls: confirmed,
      avgDuration: total > 0 ? totalDuration / total : 0,
      successRate: total > 0 ? (confirmed / total) * 100 : 0,
    };
  }, [bookingsData]);

  // Shared widget props
  const widgetProps = {
    bookingsData: bookingsData ?? [],
    searchQuery,
    onNavigate: setActiveTab,
    onViewAll: (suffix?: string) => setActiveTab(suffix ?? 'overview'),
    stats,
  };

  // Find the active tab config
  const activeTabConfig = config.dashboard.tabs.find((t) => t.id === activeTab);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  return (
    <div className="min-h-screen bg-[#070b1f] relative overflow-hidden">
      {/* Background nebula */}
      <div className="absolute inset-0 opacity-30 pointer-events-none -z-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Sidebar — receives config tabs */}
      <div className="relative z-30">
        <Sidebar
          tabs={config.dashboard.tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userProfile={user}
          companyName={config.dashboard.branding.companyName}
          logoUrl={config.dashboard.branding.logoUrl}
        />
      </div>

      {/* Main content */}
      <div className="ml-64 relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#0d1128] to-[#070b1f] border-b border-blue-500/20 backdrop-blur-xl shadow-lg">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                {greeting}, {userProfile.firstName}
              </h1>
              <p className="text-base text-gray-300 mt-1">
                Welcome back to your {config.dashboard.branding.companyName} dashboard
              </p>
            </div>

            <div className="flex items-center gap-5">
              {/* Search */}
              {config.dashboard.features.globalSearch && (
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search dashboard..."
                    className="pl-12 pr-12 py-3 bg-black/30 backdrop-blur-xl border border-blue-400/30 rounded-xl text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400/60 w-72 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Escape' && setSearchQuery('')}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-blue-500/20 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              )}

              {/* Time / World Clock */}
              {config.dashboard.features.worldClock && (
                <button
                  onClick={() => setShowWorldClock(true)}
                  className="flex items-center gap-3 px-5 py-3 bg-black/30 border border-blue-400/30 rounded-xl hover:bg-blue-500/20 transition-all"
                >
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-200 font-medium">{currentTime}</span>
                </button>
              )}

              {/* Notifications */}
              {config.dashboard.features.notifications && (
                <button
                  className="relative p-3 bg-black/30 border border-blue-400/30 rounded-xl hover:bg-blue-500/20 transition-all"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-6 h-6 text-gray-300" />
                  {unreadCount > 0 && (
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-purple-500 rounded-full" />
                  )}
                </button>
              )}

              {/* Settings */}
              <button
                className="p-3 bg-black/30 border border-blue-400/30 rounded-xl hover:bg-blue-500/20 transition-all"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="w-6 h-6 text-gray-300" />
              </button>

              {/* User avatar */}
              <button
                className="flex items-center gap-4 pl-5 border-l border-blue-400/30 hover:opacity-80 transition-opacity"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    {userProfile.firstName} {userProfile.lastName}
                  </p>
                  <p className="text-xs text-gray-300">{userProfile.jobTitle}</p>
                </div>
                {userProfile.avatarUrl ? (
                  <img src={userProfile.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-400/30" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold ring-2 ring-blue-400/30">
                    {userProfile.firstName[0]}{userProfile.lastName[0]}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-8">
          {/* Global search overlay */}
          {searchQuery ? (
            <GlobalSearchResults
              searchQuery={searchQuery}
              onNavigate={(page) => { setActiveTab(page); setSearchQuery(''); }}
              bookingsData={bookingsData}
            />
          ) : INTERNAL_PAGES.has(activeTab) ? (
            // Internal pages (not in widget registry)
            <>
              {activeTab === 'settings' && <SettingsPage />}
              {activeTab === 'profile' && (
                <ProfilePage userProfile={userProfile} onUpdateProfile={setUserProfile} />
              )}
              {activeTab === 'security' && <SecurityPage />}
              {activeTab === 'notification-settings' && <NotificationSettingsPage />}
              {activeTab === 'help' && <HelpPage />}
              {activeTab === 'all-activities' && (
                <AllActivitiesPage onBack={() => setActiveTab(config.dashboard.tabs[0]?.id ?? 'overview')} />
              )}
              {activeTab === 'all-notifications' && (
                <AllNotificationsPage onBack={() => setActiveTab(config.dashboard.tabs[0]?.id ?? 'overview')} />
              )}
            </>
          ) : (
            // Config-driven tab content — render widgets for this tab
            <div className="space-y-6">
              {activeTabConfig && (
                <>
                  {/* Tab header (optional — only shown if tab has a label) */}
                  {activeTab !== config.dashboard.tabs[0]?.id && (
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent mb-2">
                        {activeTabConfig.label}
                      </h2>
                    </div>
                  )}

                  {/* Render each widget in this tab's widgets list */}
                  {activeTabConfig.widgets.map((widgetId) =>
                    renderWidget(widgetId as WidgetId, {
                      ...widgetProps,
                      onViewAll: (suffix?: string) =>
                        setActiveTab(suffix ?? 'all-activities'),
                    })
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals & panels */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onUnreadCountChange={setUnreadCount}
      />
      <UserMenu
        isOpen={showUserMenu}
        onClose={() => setShowUserMenu(false)}
        onSettingsClick={() => { setActiveTab('settings'); setShowUserMenu(false); }}
        onLogoutClick={() => setShowLogoutModal(true)}
        onProfileClick={() => { setActiveTab('profile'); setShowUserMenu(false); }}
        onSecurityClick={() => { setActiveTab('security'); setShowUserMenu(false); }}
        onNotificationSettingsClick={() => { setActiveTab('notification-settings'); setShowUserMenu(false); }}
        onHelpClick={() => { setActiveTab('help'); setShowUserMenu(false); }}
        userProfile={userProfile}
      />
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
      {config.dashboard.features.worldClock && (
        <WorldClockModal isOpen={showWorldClock} onClose={() => setShowWorldClock(false)} />
      )}
    </div>
  );
}

// ── Exported with providers ───────────────────────────────────────────────────
export function DashboardApp() {
  return (
    <SettingsProvider>
      <DashboardContent />
    </SettingsProvider>
  );
}
