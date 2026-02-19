import { Bell, AlertTriangle, Info, CheckCircle, XCircle, ArrowLeft, Filter, MailOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  time: string;
  timestamp: number;
  read: boolean;
}

const baseNotifications: Omit<Notification, 'time' | 'timestamp'>[] = [
  {
    id: 1,
    type: 'success',
    title: 'Model Update Complete',
    message: 'Neural Voice Pro v4.2 has been successfully deployed',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'High Traffic Alert',
    message: 'API requests increased by 45% in the last hour',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Scheduled Maintenance',
    message: 'System maintenance scheduled for Feb 15 at 11:00 PM',
    read: true,
  },
  {
    id: 4,
    type: 'success',
    title: 'Training Complete',
    message: 'SentiBot Analytics training cycle finished successfully',
    read: true,
  },
  {
    id: 5,
    type: 'error',
    title: 'API Rate Limit',
    message: 'Rate limit exceeded for external API integration',
    read: true,
  },
  {
    id: 6,
    type: 'info',
    title: 'New User Registration',
    message: '15 new users registered in the last 24 hours',
    read: true,
  },
  {
    id: 7,
    type: 'success',
    title: 'Database Backup Complete',
    message: 'All data has been backed up successfully to secure storage',
    read: true,
  },
  {
    id: 8,
    type: 'warning',
    title: 'Storage Usage Alert',
    message: 'Storage capacity is at 78% - consider upgrading plan',
    read: false,
  },
  {
    id: 9,
    type: 'info',
    title: 'New Feature Available',
    message: 'Voice cloning feature is now available in your dashboard',
    read: true,
  },
  {
    id: 10,
    type: 'error',
    title: 'Connection Timeout',
    message: 'External API connection timed out - retrying automatically',
    read: true,
  },
];

interface AllNotificationsPageProps {
  onBack: () => void;
}

export function AllNotificationsPage({ onBack }: AllNotificationsPageProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'success' | 'warning' | 'error' | 'info'>('all');
  const [notifications, setNotifications] = useState<Notification[]>(
    baseNotifications.map((notification, index) => ({
      ...notification,
      time: index === 0 ? '5 min ago' : index === 1 ? '12 min ago' : `${index} hour${index > 1 ? 's' : ''} ago`,
      timestamp: Date.now() - (index === 0 ? 5 : index === 1 ? 12 : index * 60) * 60000,
    }))
  );

  // Update timestamps every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => prev.map(notification => {
        const minutesAgo = Math.floor((Date.now() - notification.timestamp) / 60000);
        const hoursAgo = Math.floor(minutesAgo / 60);
        
        let timeText;
        if (minutesAgo < 1) {
          timeText = 'Just now';
        } else if (minutesAgo < 60) {
          timeText = `${minutesAgo} min ago`;
        } else if (hoursAgo < 24) {
          timeText = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
        } else {
          const daysAgo = Math.floor(hoursAgo / 24);
          timeText = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
        }
        
        return { ...notification, time: timeText };
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'from-emerald-600 to-green-600',
          text: 'text-emerald-100',
          border: 'border-emerald-500/30',
          glow: 'shadow-emerald-500/20',
        };
      case 'warning':
        return {
          bg: 'from-amber-600 to-orange-600',
          text: 'text-amber-100',
          border: 'border-amber-500/30',
          glow: 'shadow-amber-500/20',
        };
      case 'error':
        return {
          bg: 'from-rose-600 to-red-600',
          text: 'text-rose-100',
          border: 'border-rose-500/30',
          glow: 'shadow-rose-500/20',
        };
      default:
        return {
          bg: 'from-blue-600 to-blue-700',
          text: 'text-blue-100',
          border: 'border-blue-500/30',
          glow: 'shadow-blue-500/20',
        };
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-blue-400" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                All Notifications
              </h2>
              {unreadCount > 0 && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm font-bold shadow-lg shadow-purple-500/30">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <p className="text-gray-400 mt-2">Stay updated with system events and alerts</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-300 text-sm font-medium transition-all"
          >
            <MailOpen className="w-4 h-4" />
            Mark all as read
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-3">
        <Filter className="w-5 h-5 text-gray-400" />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-blue-600/10 text-gray-400 hover:text-white border border-blue-500/20'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'unread'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                : 'bg-purple-600/10 text-gray-400 hover:text-white border border-purple-500/20'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('success')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'success'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                : 'bg-emerald-600/10 text-gray-400 hover:text-white border border-emerald-500/20'
            }`}
          >
            Success
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'warning'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                : 'bg-amber-600/10 text-gray-400 hover:text-white border border-amber-500/20'
            }`}
          >
            Warnings
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'error'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg'
                : 'bg-rose-600/10 text-gray-400 hover:text-white border border-rose-500/20'
            }`}
          >
            Errors
          </button>
          <button
            onClick={() => setFilter('info')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === 'info'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'bg-blue-600/10 text-gray-400 hover:text-white border border-blue-500/20'
            }`}
          >
            Info
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-blue-400" />
          <h3 className="text-white text-lg font-semibold">
            {filter === 'all' ? 'All Notifications' : filter === 'unread' ? 'Unread Notifications' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Notifications`}
          </h3>
          <span className="text-sm text-gray-400">({filteredNotifications.length})</span>
        </div>

        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const colors = getColorClasses(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    notification.read
                      ? 'bg-[#121633]/30 border-blue-500/10 hover:border-blue-500/20'
                      : 'bg-gradient-to-br from-blue-600/10 to-purple-600/5 border-blue-500/30 hover:border-blue-500/40 shadow-lg'
                  }`}
                  onClick={() => {
                    setNotifications(prev => 
                      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
                    );
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${colors.bg} ${colors.text} shadow-lg ${colors.glow} flex-shrink-0`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className={`text-base font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 flex-shrink-0 mt-1.5 animate-pulse shadow-lg shadow-purple-500/50" />
                        )}
                      </div>
                      <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-400'} mb-3`}>
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-600">{notification.time}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-base">No notifications found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
