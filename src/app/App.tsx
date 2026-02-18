import { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatCard } from './components/StatCard';
import { UsageChart } from './components/UsageChart';
import { PerformanceChart } from './components/PerformanceChart';
import { ActivityFeed } from './components/ActivityFeed';
import { Calendar } from './components/Calendar';
import { NotificationBoard } from './components/NotificationBoard';
import { BookingsTable } from './components/BookingsTable';
import { NotificationPanel } from './components/NotificationPanel';
import { UserMenu } from './components/UserMenu';
import { ProfilePage } from './components/ProfilePage';
import { SecurityPage } from './components/SecurityPage';
import { NotificationSettingsPage } from './components/NotificationSettingsPage';
import { HelpPage } from './components/HelpPage';
import { LogoutModal } from './components/LogoutModal';
import { GlobalSearchResults } from './components/GlobalSearchResults';
import { WorldClockModal } from './components/WorldClockModal';
import { AllActivitiesPage } from './components/AllActivitiesPage';
import { AllNotificationsPage } from './components/AllNotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import { useSettings, SettingsProvider } from './hooks/useSettings.tsx';
import { useTranslation } from './hooks/useTranslation';
import { Brain, Users, Zap, TrendingUp, Search, Bell, Settings, X, Calendar as CalendarIcon, CheckCircle, Clock, Target, Phone } from 'lucide-react';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
  bio: string;
  avatarUrl?: string;
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWorldClock, setShowWorldClock] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Load settings and translation
  const { settings } = useSettings();
  const { t } = useTranslation();
  
  // Apply theme to document
  useEffect(() => {
    const theme = settings.theme;
    const root = document.documentElement;
    
    if (theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      console.log('🎨 Theme switched to LIGHT mode');
    } else if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      console.log('🎨 Theme switched to DARK mode');
    } else if (theme === 'auto') {
      // Auto mode: detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark-theme');
        root.classList.remove('light-theme');
        console.log('🎨 Theme set to AUTO (detected DARK)');
      } else {
        root.classList.add('light-theme');
        root.classList.remove('dark-theme');
        console.log('🎨 Theme set to AUTO (detected LIGHT)');
      }
    }
  }, [settings.theme]);
  
  // Load bookings data for global search
  const { data: bookingsData, refetch } = useGoogleSheets('1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M');
  
  // User Profile State - Shared across dashboard
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@sentria.ai',
    phone: '+1 (555) 123-4567',
    jobTitle: 'System Administrator',
    location: 'San Francisco, CA',
    bio: 'Experienced system administrator specializing in AI voice assistant platforms and enterprise dashboard management.'
  });

  const updateUserProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    // You could also save to localStorage here for persistence
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  // Load user profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to load user profile:', e);
      }
    }
  }, []);

  // Calculate booking statistics
  const stats = useMemo(() => {
    if (!bookingsData || bookingsData.length === 0) {
      return {
        totalCalls: 0,
        confirmedCalls: 0,
        avgDuration: 0,
        successRate: 0
      };
    }

    const total = bookingsData.length;
    const confirmed = bookingsData.filter(b => b.bookingStatus && b.bookingStatus.toLowerCase() === 'confirmed').length;
    const totalDuration = bookingsData.reduce((sum, b) => sum + (b.callDurationMinutes || 0), 0);
    const avg = total > 0 ? totalDuration / total : 0;
    const rate = total > 0 ? (confirmed / total) * 100 : 0;

    return {
      totalCalls: total,
      confirmedCalls: confirmed,
      avgDuration: avg,
      successRate: rate,
    };
  }, [bookingsData]);

  // Get user initials for avatar
  const getUserInitials = () => {
    return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase();
  };

  // Get full name
  const getFullName = () => {
    return `${userProfile.firstName} ${userProfile.lastName}`;
  };

  // Format time based on user settings
  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: settings.timeFormat === '12h',
      timeZone: settings.timezone,
    };
    return date.toLocaleTimeString('en-US', options);
  };

  // Auto-refresh data based on settings
  useEffect(() => {
    if (settings.autoRefresh && refetch) {
      const intervalMs = settings.refreshInterval * 1000;
      const interval = setInterval(() => {
        refetch();
        setRefreshTrigger(prev => prev + 1);
        console.log('Auto-refreshing dashboard data...');
      }, intervalMs);
      
      return () => clearInterval(interval);
    }
  }, [settings.autoRefresh, settings.refreshInterval, refetch]);

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      
      // Get the hour in the selected timezone with fallback
      let hour: number;
      try {
        hour = parseInt(now.toLocaleString('en-US', {
          hour: 'numeric',
          hour12: false,
          timeZone: settings.timezone
        }));
      } catch (error) {
        // Fallback to browser's local time if timezone is invalid
        console.error('Invalid timezone, using local time:', error);
        hour = now.getHours();
      }
      
      const timeStr = formatTime(now);
      
      setCurrentTime(timeStr);
      
      if (hour >= 0 && hour < 5) {
        setGreeting(t('greeting.night'));
      } else if (hour >= 5 && hour < 12) {
        setGreeting(t('greeting.morning'));
      } else if (hour >= 12 && hour < 17) {
        setGreeting(t('greeting.afternoon'));
      } else {
        setGreeting(t('greeting.evening'));
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [settings.timeFormat, settings.timezone, t]);

  return (
    <div className="min-h-screen bg-[#070b1f] relative overflow-hidden">
      {/* Animated Background - Layer -20 */}
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse pointer-events-none"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Nebula Effect - Layer -20 */}
      <div className="absolute inset-0 opacity-30 pointer-events-none -z-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Sidebar - Layer 30 */}
      <div className="relative z-30">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userProfile={userProfile} />
      </div>
      
      {/* Main Content Area - Layer 10 */}
      <div className="ml-64 relative z-10">
        {/* Header/Taskbar */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-[#0d1128] to-[#070b1f] border-b border-blue-500/20 backdrop-blur-xl shadow-lg shadow-black/20">
          <div className="relative px-8 py-6 overflow-hidden">
            {/* Animated Space Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e23] via-[#0d1128] to-[#0a0e23] pointer-events-none">
              {/* Stars Layer 1 - Small twinkling stars */}
              <div className="absolute inset-0 opacity-60 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={`star1-${i}`}
                    className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Stars Layer 2 - Medium stars */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`star2-${i}`}
                    className="absolute w-1 h-1 bg-blue-300 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 4}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              {/* Nebula Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 blur-3xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
              {/* Left - Greeting */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
                  {greeting}, {userProfile.firstName}
                </h1>
                <p className="text-base text-gray-300 drop-shadow">
                  Welcome back to your SENTRIA dashboard
                </p>
              </div>

              {/* Right - Time and Actions */}
              <div className="flex items-center gap-5">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search dashboard..."
                    className="pl-12 pr-12 py-3 bg-black/30 backdrop-blur-xl border border-blue-400/30 rounded-xl text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400/60 focus:bg-black/40 w-72 transition-all shadow-lg"
                    value={searchQuery}
                    onChange={(e) => {
                      console.log('Search query:', e.target.value);
                      setSearchQuery(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setSearchQuery('');
                      }
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-blue-500/20 rounded-full transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                  )}
                </div>

                {/* Time Display */}
                <button 
                  onClick={() => setShowWorldClock(true)}
                  className="flex items-center gap-3 px-5 py-3 bg-black/30 backdrop-blur-xl border border-blue-400/30 rounded-xl shadow-lg cursor-pointer hover:bg-blue-500/20 hover:border-blue-400/50 transition-all group"
                  aria-label="Open world clock"
                >
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-500/50 group-hover:shadow-emerald-400" />
                  <span className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors">{currentTime}</span>
                </button>

                {/* Notification Icon */}
                <button className="relative p-3 bg-black/30 backdrop-blur-xl border border-blue-400/30 rounded-xl hover:bg-blue-500/20 hover:border-blue-400/50 transition-all group shadow-lg" onClick={() => setShowNotifications(!showNotifications)}>
                  <Bell className="w-6 h-6 text-gray-300 group-hover:text-blue-300 transition-colors" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-purple-500 rounded-full ring-2 ring-black/50 shadow-lg shadow-purple-500/50" />
                </button>

                {/* Settings Icon */}
                <button className="p-3 bg-black/30 backdrop-blur-xl border border-blue-400/30 rounded-xl hover:bg-blue-500/20 hover:border-blue-400/50 transition-all group shadow-lg" onClick={() => setActiveTab('settings')}>
                  <Settings className="w-6 h-6 text-gray-300 group-hover:text-blue-300 transition-colors" />
                </button>

                {/* User Avatar */}
                <button 
                  className="flex items-center gap-4 pl-5 border-l border-blue-400/30 cursor-pointer hover:opacity-80 transition-opacity" 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="Open user menu"
                  aria-expanded={showUserMenu}
                  aria-haspopup="menu"
                >
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white drop-shadow">{getFullName()}</p>
                    <p className="text-xs text-gray-300">{userProfile.jobTitle}</p>
                  </div>
                  {userProfile.avatarUrl ? (
                    <img 
                      src={userProfile.avatarUrl} 
                      alt="User Avatar" 
                      className="w-12 h-12 rounded-full object-cover shadow-xl shadow-blue-500/40 ring-2 ring-blue-400/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-blue-500/40 ring-2 ring-blue-400/30">
                      {getUserInitials()}
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Global Search Results */}
          {searchQuery ? (
            <GlobalSearchResults 
              searchQuery={searchQuery} 
              onNavigate={(page) => {
                setActiveTab(page);
                setSearchQuery(''); // Clear search after navigation
              }}
              bookingsData={bookingsData}
            />
          ) : (
            <>
              {activeTab === 'overview' && (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                      title={t('stats.totalBookings')}
                      value={stats.totalCalls.toLocaleString()}
                      change="18.4%"
                      trend="up"
                      icon={CalendarIcon}
                      color="indigo"
                      onClick={() => {
                        setActiveTab('bookings');
                        console.log('📊 Navigating to Bookings page');
                      }}
                    />
                    <StatCard
                      title={t('stats.completedCalls')}
                      value={stats.confirmedCalls.toLocaleString()}
                      change="12.8%"
                      trend="up"
                      icon={Phone}
                      color="purple"
                      onClick={() => {
                        setActiveTab('bookings');
                        console.log('📞 Navigating to Bookings page (Confirmed filter)');
                      }}
                    />
                    <StatCard
                      title={t('stats.avgCallDuration')}
                      value={`${stats.avgDuration.toFixed(1)}m`}
                      change="15%"
                      trend="up"
                      icon={Clock}
                      color="blue"
                      onClick={() => {
                        setActiveTab('performance');
                        console.log('⏱️ Navigating to Performance page');
                      }}
                    />
                    <StatCard
                      title={t('stats.successRate')}
                      value={`${stats.successRate.toFixed(1)}%`}
                      change="4.2%"
                      trend="up"
                      icon={TrendingUp}
                      color="violet"
                      onClick={() => {
                        setActiveTab('performance');
                        console.log('📈 Navigating to Performance page');
                      }}
                    />
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <UsageChart />
                    <PerformanceChart />
                  </div>

                  {/* Bottom Section - Calendar, Activity & Notifications */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <Calendar bookingsData={bookingsData || []} />
                    </div>
                    <div className="lg:col-span-1">
                      <ActivityFeed 
                        searchQuery={searchQuery} 
                        onViewAll={() => setActiveTab('all-activities')}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <NotificationBoard 
                        searchQuery={searchQuery}
                        onViewAll={() => setActiveTab('all-notifications')}
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                        Call Bookings Management
                      </h2>
                      <p className="text-gray-400">View and manage all customer call bookings in real-time</p>
                    </div>
                  </div>
                  <BookingsTable searchQuery={searchQuery} />
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                      User Management
                    </h2>
                    <p className="text-gray-400">Manage users and monitor activity</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ActivityFeed 
                      searchQuery={searchQuery} 
                      onViewAll={() => setActiveTab('all-activities')}
                    />
                    <NotificationBoard 
                      searchQuery={searchQuery}
                      onViewAll={() => setActiveTab('all-notifications')}
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                      Performance Monitoring
                    </h2>
                    <p className="text-gray-400">Real-time performance metrics and system health</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PerformanceChart />
                    <UsageChart />
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <SettingsPage />
              )}
              
              {activeTab === 'profile' && <ProfilePage userProfile={userProfile} onUpdateProfile={updateUserProfile} />}
              
              {activeTab === 'security' && <SecurityPage />}
              
              {activeTab === 'notification-settings' && <NotificationSettingsPage />}
              
              {activeTab === 'help' && <HelpPage />}
              
              {activeTab === 'all-activities' && <AllActivitiesPage onBack={() => setActiveTab('overview')} />}
              
              {activeTab === 'all-notifications' && <AllNotificationsPage onBack={() => setActiveTab('overview')} />}
            </>
          )}
        </div>

        {/* Decorative Background Elements */}
        <div className="fixed top-0 left-64 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="fixed top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-700/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      </div>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* User Menu */}
      <UserMenu 
        isOpen={showUserMenu} 
        onClose={() => setShowUserMenu(false)}
        onSettingsClick={() => {
          setActiveTab('settings');
          setShowUserMenu(false);
        }}
        onLogoutClick={() => setShowLogoutModal(true)}
        onProfileClick={() => {
          setActiveTab('profile');
          setShowUserMenu(false);
        }}
        onSecurityClick={() => {
          setActiveTab('security');
          setShowUserMenu(false);
        }}
        onNotificationSettingsClick={() => {
          setActiveTab('notification-settings');
          setShowUserMenu(false);
        }}
        onHelpClick={() => {
          setActiveTab('help');
          setShowUserMenu(false);
        }}
        userProfile={userProfile}
      />

      {/* Logout Modal */}
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          console.log('User logged out');
          setShowLogoutModal(false);
          // Here you would handle actual logout logic
        }}
      />

      {/* World Clock Modal */}
      <WorldClockModal 
        isOpen={showWorldClock} 
        onClose={() => setShowWorldClock(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}