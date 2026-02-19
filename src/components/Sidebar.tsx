// ============================================================
// SENTRIA — Config-Driven Sidebar
// Tabs come from the user's ClientConfig, not hardcoded.
// Each client sees only the tabs assigned to them.
// ============================================================

import {
  LayoutDashboard,
  Calendar,
  Users,
  Activity,
  Settings,
  BarChart2,
  Phone,
  FileText,
  MessageSquare,
  Map,
  Star,
  Briefcase,
  LucideProps,
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import type { DashboardTab } from '../../types/dashboard';
import type { SentriaUser } from '../../types/dashboard';

// ── Icon registry — add new icons here as needed ──────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  LayoutDashboard,
  Calendar,
  Users,
  Activity,
  Settings,
  BarChart2,
  Phone,
  FileText,
  MessageSquare,
  Map,
  Star,
  Briefcase,
};

function TabIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? LayoutDashboard;
  return <Icon className={className} size={20} />;
}

// ── Custom SENTRIA Logo ────────────────────────────────────────────────────────
const SentriaLogo = ({ companyName }: { companyName?: string }) => (
  <svg viewBox="0 0 480 120" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sentriaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d4d5ed" />
        <stop offset="35%" stopColor="#8b8dc4" />
        <stop offset="75%" stopColor="#3d448f" />
        <stop offset="100%" stopColor="#1a2570" />
      </linearGradient>
    </defs>
    <text
      x="240"
      y="75"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="72"
      fontWeight="700"
      textAnchor="middle"
      letterSpacing="3"
      fill="url(#sentriaGradient)"
    >
      {companyName ?? 'SENTRIA'}
    </text>
  </svg>
);

// ── Props ──────────────────────────────────────────────────────────────────────
interface SidebarProps {
  /** All tabs for this client (from ClientConfig) */
  tabs: DashboardTab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: SentriaUser;
  /** Optional branding overrides */
  companyName?: string;
  logoUrl?: string;
}

// ── Component ──────────────────────────────────────────────────────────────────
export function Sidebar({
  tabs,
  activeTab,
  setActiveTab,
  userProfile,
  companyName,
  logoUrl,
}: SidebarProps) {
  // Sort enabled tabs by order
  const visibleTabs = tabs
    .filter((t) => t.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="w-64 bg-[#060a1a] border-r border-blue-500/20 h-screen fixed left-0 top-0 flex flex-col shadow-xl shadow-black/20 z-30">
      {/* Logo / Branding */}
      <div className="p-4 border-b border-blue-500/20 bg-gradient-to-b from-[#0d1128] to-transparent">
        <div className="flex items-center justify-center">
          {logoUrl ? (
            <img src={logoUrl} alt={companyName ?? 'Logo'} className="h-10 object-contain" />
          ) : (
            <SentriaLogo companyName={companyName} />
          )}
        </div>
      </div>

      {/* Navigation — built from config */}
      <nav className="flex-1 p-4 pt-6 overflow-y-auto">
        {visibleTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl mb-2 transition-all font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-blue-950/30 hover:border hover:border-blue-500/10'
              }`}
            >
              <TabIcon
                name={tab.icon}
                className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-400' : ''}`}
              />
              <span className="text-sm truncate">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="p-6 border-t border-blue-500/20 bg-gradient-to-t from-[#0d1128] to-transparent">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-[#121633]/50 border border-blue-500/10">
          {userProfile.avatarUrl ? (
            <img
              src={userProfile.avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover shadow-lg shadow-blue-500/30 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 flex-shrink-0">
              {userProfile.firstName[0]}{userProfile.lastName[0]}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">
              {userProfile.firstName} {userProfile.lastName}
            </p>
            <p className="text-xs text-gray-400 truncate">{userProfile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
