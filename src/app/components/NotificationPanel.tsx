import { X, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';
import { useState } from 'react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Booking Confirmed',
      message: 'New booking from John Smith for tomorrow at 2:00 PM',
      time: '5 minutes ago',
      icon: CheckCircle,
      color: 'text-emerald-400',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Call Volume',
      message: 'AI assistant handling 45% more calls than usual',
      time: '15 minutes ago',
      icon: AlertCircle,
      color: 'text-yellow-400',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New features available in dashboard v2.4.1',
      time: '1 hour ago',
      icon: Info,
      color: 'text-blue-400',
      read: false
    },
    {
      id: 4,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight at 11 PM',
      time: '2 hours ago',
      icon: Clock,
      color: 'text-purple-400',
      read: false
    },
    {
      id: 5,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of $250.00 processed successfully',
      time: '3 hours ago',
      icon: CheckCircle,
      color: 'text-emerald-400',
      read: false
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-[100]" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Panel */}
      <div 
        className="fixed right-0 top-0 h-screen w-96 bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] border-l border-blue-500/20 shadow-2xl z-[110] overflow-hidden"
        role="dialog"
        aria-label="Notifications panel"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              aria-label="Close notifications panel"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
          <p className="text-sm text-gray-400">You have {unreadCount} unread notifications</p>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100vh-140px)] p-4 space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <button
                key={notification.id}
                className={`w-full text-left p-4 bg-gradient-to-br from-[#0a0e23] to-[#0d1128] border rounded-xl hover:border-blue-400/40 transition-all group focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                  notification.read ? 'border-blue-500/10 opacity-60' : 'border-blue-500/20'
                }`}
                onClick={() => markAsRead(notification.id)}
                aria-label={`${notification.title}. ${notification.message}. ${notification.time}`}
              >
                <div className="flex gap-3">
                  <div className={`flex-shrink-0 ${notification.color}`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-400 rounded-full" aria-label="Unread" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0d1128] to-transparent border-t border-blue-500/20">
          <button 
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all font-medium text-sm shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            aria-label="Mark all notifications as read"
          >
            Mark All as Read
          </button>
        </div>
      </div>
    </>
  );
}