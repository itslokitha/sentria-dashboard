import { Bell, AlertTriangle, Info, CheckCircle, XCircle, Settings, Calendar, Clock, Phone } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useGoogleSheets } from '../hooks/useGoogleSheets';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  time: string;
  timestamp: number;
  read: boolean;
}

interface NotificationBoardProps {
  searchQuery?: string;
  onViewAll?: () => void;
}

export function NotificationBoard({ searchQuery = '', onViewAll }: NotificationBoardProps) {
  const { data: bookingsData, loading } = useGoogleSheets('1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M');
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());

  // Generate notifications from real booking data
  const notifications = useMemo(() => {
    if (!bookingsData || bookingsData.length === 0) return [];

    const now = new Date();
    const notifs: Notification[] = [];

    bookingsData.forEach((booking, index) => {
      // Skip bookings with missing required fields
      if (!booking.callDate || !booking.callTime || !booking.name || !booking.serviceType) {
        return;
      }

      const callDateTime = new Date(booking.callDate + ' ' + booking.callTime);
      const timeDiff = callDateTime.getTime() - now.getTime();
      const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesAgo = Math.floor((now.getTime() - callDateTime.getTime()) / 60000);

      // Upcoming booking within 24 hours
      if (hoursUntil > 0 && hoursUntil <= 24) {
        notifs.push({
          id: `upcoming-${index}`,
          type: hoursUntil <= 2 ? 'warning' : 'info',
          title: `Upcoming ${booking.serviceType} Call`,
          message: `Scheduled with ${booking.name} in ${hoursUntil} hour${hoursUntil > 1 ? 's' : ''}`,
          time: `${hoursUntil}h from now`,
          timestamp: callDateTime.getTime(),
          read: readNotifications.has(`upcoming-${index}`)
        });
      }

      // Recently confirmed bookings
      if (booking.bookingStatus && booking.bookingStatus.toLowerCase() === 'confirmed' && minutesAgo >= 0 && minutesAgo <= 120) {
        notifs.push({
          id: `confirmed-${index}`,
          type: 'success',
          title: 'Booking Confirmed',
          message: `${booking.name} - ${booking.serviceType} on ${booking.callDate}`,
          time: minutesAgo < 1 ? 'Just now' : minutesAgo < 60 ? `${minutesAgo} min ago` : `${Math.floor(minutesAgo / 60)} hour${Math.floor(minutesAgo / 60) > 1 ? 's' : ''} ago`,
          timestamp: callDateTime.getTime(),
          read: readNotifications.has(`confirmed-${index}`)
        });
      }

      // Pending bookings need attention
      if (booking.bookingStatus && booking.bookingStatus.toLowerCase() === 'pending') {
        notifs.push({
          id: `pending-${index}`,
          type: 'warning',
          title: 'Action Required',
          message: `Pending booking for ${booking.name} - ${booking.serviceType}`,
          time: 'Needs attention',
          timestamp: callDateTime.getTime(),
          read: readNotifications.has(`pending-${index}`)
        });
      }

      // Completed calls
      if (booking.bookingStatus && booking.bookingStatus.toLowerCase() === 'completed' && minutesAgo >= 0 && minutesAgo <= 180) {
        notifs.push({
          id: `completed-${index}`,
          type: 'success',
          title: 'Call Completed',
          message: `${booking.callDurationMinutes || 'N/A'} min call with ${booking.name} - ${booking.serviceType}`,
          time: minutesAgo < 1 ? 'Just now' : minutesAgo < 60 ? `${minutesAgo} min ago` : `${Math.floor(minutesAgo / 60)} hour${Math.floor(minutesAgo / 60) > 1 ? 's' : ''} ago`,
          timestamp: callDateTime.getTime(),
          read: readNotifications.has(`completed-${index}`)
        });
      }

      // After-hours bookings
      if (booking.afterHours && booking.afterHours.toLowerCase() === 'yes') {
        notifs.push({
          id: `afterhours-${index}`,
          type: 'info',
          title: 'After-Hours Booking',
          message: `${booking.name} scheduled for ${booking.callTime} on ${booking.callDate}`,
          time: hoursUntil > 0 ? `${hoursUntil}h from now` : 'Past',
          timestamp: callDateTime.getTime(),
          read: readNotifications.has(`afterhours-${index}`)
        });
      }
    });

    // Sort by timestamp (most recent first)
    return notifs.sort((a, b) => b.timestamp - a.timestamp).slice(0, 12);
  }, [bookingsData, readNotifications]);

  // Update timestamps every 30 seconds
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
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

  // Filter notifications based on search query
  const filteredNotifications = notifications.filter(notification => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      notification.title.toLowerCase().includes(query) ||
      notification.message.toLowerCase().includes(query)
    );
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-white text-lg font-semibold">Notifications</h3>
          </div>
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-gray-400">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="w-5 h-5 text-blue-400" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-[10px] text-white font-bold">{unreadCount}</span>
              </div>
            )}
          </div>
          <h3 className="text-white text-lg font-semibold">Notifications</h3>
          {searchQuery && (
            <span className="text-xs text-gray-400">
              ({filteredNotifications.length} result{filteredNotifications.length !== 1 ? 's' : ''})
            </span>
          )}
        </div>
        <button className="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 transition-all">
          <Settings className="w-4 h-4 text-blue-400" />
        </button>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const colors = getColorClasses(notification.type);
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-all ${
                  notification.read
                    ? 'bg-[#121633]/30 border-blue-500/10 hover:border-blue-500/20'
                    : 'bg-gradient-to-br from-blue-600/10 to-purple-600/5 border-blue-500/30 hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${colors.bg} ${colors.text} shadow-lg ${colors.glow} flex-shrink-0`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`text-sm font-semibold ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1 animate-pulse" />
                      )}
                    </div>
                    <p className={`text-xs ${notification.read ? 'text-gray-500' : 'text-gray-400'} mb-2`}>
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-600">{notification.time}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No notifications found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-blue-500/10">
        <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 text-blue-300 text-sm font-medium hover:from-blue-600/30 hover:to-purple-600/30 transition-all" onClick={onViewAll}>
          View All Notifications
        </button>
      </div>
    </div>
  );
}