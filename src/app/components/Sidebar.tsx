import { useTranslation } from '../hooks/useTranslation';

// Custom SVG Icons
const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m5.196-15.804l-4.242 4.242m-2.828 2.828l-4.242 4.242m15.876 0l-4.242-4.242m-2.828-2.828l-4.242-4.242"></path>
  </svg>
);

// Custom SENTRIA Logo SVG
const SentriaLogo = () => (
  <svg viewBox="0 0 480 120" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sentriaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d4d5ed" />
        <stop offset="15%" stopColor="#b8bade" />
        <stop offset="35%" stopColor="#8b8dc4" />
        <stop offset="55%" stopColor="#5b5fa8" />
        <stop offset="75%" stopColor="#3d448f" />
        <stop offset="100%" stopColor="#1a2570" />
      </linearGradient>
    </defs>
    
    {/* SENTRIA Text with gradient */}
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
      SENTRIA
    </text>
  </svg>
);

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
  bio: string;
  avatarUrl?: string;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: UserProfile;
}

export function Sidebar({ activeTab, setActiveTab, userProfile }: SidebarProps) {
  const { t } = useTranslation();
  
  const menuItems = [
    { id: 'overview', icon: HomeIcon, label: t('nav.overview') },
    { id: 'bookings', icon: CalendarIcon, label: t('nav.bookings') },
    { id: 'users', icon: UsersIcon, label: t('nav.profile') },
    { id: 'performance', icon: ActivityIcon, label: t('nav.analytics') },
    { id: 'settings', icon: SettingsIcon, label: t('nav.settings') },
  ];

  return (
    <div className="w-64 bg-[#060a1a] border-r border-blue-500/20 h-screen fixed left-0 top-0 flex flex-col shadow-xl shadow-black/20 z-30">
      {/* Logo */}
      <div className="p-4 border-b border-blue-500/20 bg-gradient-to-b from-[#0d1128] to-transparent">
        <div className="flex items-center justify-center">
          <SentriaLogo />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 pt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl mb-2 transition-all font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-blue-950/30 hover:border hover:border-blue-500/10'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-blue-500/20 bg-gradient-to-t from-[#0d1128] to-transparent">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-[#121633]/50 border border-blue-500/10">
          {userProfile.avatarUrl ? (
            <img 
              src={userProfile.avatarUrl} 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full object-cover shadow-lg shadow-blue-500/30"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              {userProfile.firstName[0]}{userProfile.lastName[0]}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium truncate">{userProfile.firstName} {userProfile.lastName}</p>
            <p className="text-xs text-gray-400 truncate">{userProfile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}