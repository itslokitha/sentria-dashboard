import { User, Settings, LogOut, Shield, Bell, HelpCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { UserProfile } from '../App';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
  onProfileClick: () => void;
  onSecurityClick: () => void;
  onNotificationSettingsClick: () => void;
  onHelpClick: () => void;
  userProfile: UserProfile;
}

export function UserMenu({ 
  isOpen, 
  onClose, 
  onSettingsClick, 
  onLogoutClick,
  onProfileClick,
  onSecurityClick,
  onNotificationSettingsClick,
  onHelpClick,
  userProfile
}: UserMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const focusedIndexRef = useRef(0);

  const getUserInitials = () => {
    return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase();
  };

  const getFullName = () => {
    return `${userProfile.firstName} ${userProfile.lastName}`;
  };

  const menuItems = [
    { id: 'profile', icon: User, label: 'My Profile', action: onProfileClick },
    { id: 'settings', icon: Settings, label: 'Account Settings', action: onSettingsClick },
    { id: 'security', icon: Shield, label: 'Security & Privacy', action: onSecurityClick },
    { id: 'notifications', icon: Bell, label: 'Notification Settings', action: onNotificationSettingsClick },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', action: onHelpClick },
    { id: 'logout', icon: LogOut, label: 'Logout', action: onLogoutClick, danger: true },
  ];

  // Focus management and keyboard navigation
  useEffect(() => {
    if (isOpen) {
      // Auto-focus first menu item when opened
      focusedIndexRef.current = 0;
      menuItemsRef.current[0]?.focus();

      // Handle keyboard navigation
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            onClose();
            break;
          case 'ArrowDown':
            e.preventDefault();
            focusedIndexRef.current = (focusedIndexRef.current + 1) % menuItems.length;
            menuItemsRef.current[focusedIndexRef.current]?.focus();
            break;
          case 'ArrowUp':
            e.preventDefault();
            focusedIndexRef.current = focusedIndexRef.current === 0 
              ? menuItems.length - 1 
              : focusedIndexRef.current - 1;
            menuItemsRef.current[focusedIndexRef.current]?.focus();
            break;
          case 'Home':
            e.preventDefault();
            focusedIndexRef.current = 0;
            menuItemsRef.current[0]?.focus();
            break;
          case 'End':
            e.preventDefault();
            focusedIndexRef.current = menuItems.length - 1;
            menuItemsRef.current[menuItems.length - 1]?.focus();
            break;
          case 'Tab':
            e.preventDefault();
            // Allow Tab to cycle through menu items
            if (e.shiftKey) {
              focusedIndexRef.current = focusedIndexRef.current === 0 
                ? menuItems.length - 1 
                : focusedIndexRef.current - 1;
            } else {
              focusedIndexRef.current = (focusedIndexRef.current + 1) % menuItems.length;
            }
            menuItemsRef.current[focusedIndexRef.current]?.focus();
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose, menuItems.length]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100]" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Menu Dropdown */}
      <div 
        ref={menuRef}
        role="menu"
        aria-label="User account menu"
        className="fixed top-20 right-8 w-80 bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] border border-blue-500/20 rounded-2xl shadow-2xl z-[110] overflow-hidden"
      >
        {/* User Info Header */}
        <div className="p-5 border-b border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <div className="flex items-center gap-4 mb-3">
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
            <div>
              <p className="text-sm font-semibold text-white">{getFullName()}</p>
              <p className="text-xs text-gray-400">{userProfile.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
            <span className="text-gray-300">Online</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2" role="none">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                ref={(el) => menuItemsRef.current[index] = el}
                role="menuitem"
                tabIndex={-1}
                aria-label={item.label}
                onClick={() => {
                  item.action();
                  onClose();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.action();
                    onClose();
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-blue-500/20 ${
                  item.danger
                    ? 'text-red-400 hover:bg-red-500/10 hover:border-red-500/20 focus:ring-red-400/50'
                    : 'text-gray-300 hover:bg-blue-500/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500/20 bg-gradient-to-t from-[#0a0e23] to-transparent">
          <p className="text-xs text-center text-gray-500">
            SENTRIA Dashboard v2.4.1
          </p>
        </div>
      </div>
    </>
  );
}