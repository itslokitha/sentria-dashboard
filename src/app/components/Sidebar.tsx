import { Home, BarChart3, Settings, Users, Activity, Calendar } from 'lucide-react';
import logo from 'figma:asset/3ca298a21007a50a7e4273fbaceaee5a09caa649.png';
import { useTranslation } from '../hooks/useTranslation';

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
    { id: 'overview', icon: Home, label: t('nav.overview') },
    { id: 'bookings', icon: Calendar, label: t('nav.bookings') },
    { id: 'users', icon: Users, label: t('nav.profile') },
    { id: 'performance', icon: Activity, label: t('nav.analytics') },
    { id: 'settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <div className="w-64 bg-[#060a1a] border-r border-blue-500/20 h-screen fixed left-0 top-0 flex flex-col shadow-xl shadow-black/20 z-30">
      {/* Logo */}
      <div className="p-4 border-b border-blue-500/20 bg-gradient-to-b from-[#0d1128] to-transparent">
        <div className="flex items-center justify-center">
          <img 
            src={logo} 
            alt="SENTRIA" 
            className="w-full h-auto object-contain brightness-110"
          />
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