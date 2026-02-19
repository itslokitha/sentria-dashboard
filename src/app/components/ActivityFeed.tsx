import { Phone, CheckCircle, AlertCircle, Clock, Sparkles, TrendingUp, Calendar, User } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useGoogleSheets } from '../hooks/useGoogleSheets';

interface ActivityFeedProps {
  searchQuery?: string;
  onViewAll?: () => void;
}

export function ActivityFeed({ searchQuery = '', onViewAll }: ActivityFeedProps) {
  const { data: bookingsData, loading } = useGoogleSheets('1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M');

  // Generate activities from real booking data
  const activities = useMemo(() => {
    if (!bookingsData || bookingsData.length === 0) return [];

    // Sort bookings by date/time (most recent first)
    const sortedBookings = [...bookingsData].filter(booking => 
      // Filter out bookings with missing required fields
      booking.callDate && booking.callTime && booking.name && booking.serviceType
    ).sort((a, b) => {
      const dateA = new Date(a.callDate + ' ' + a.callTime);
      const dateB = new Date(b.callDate + ' ' + b.callTime);
      return dateB.getTime() - dateA.getTime();
    });

    // Convert bookings to activities
    return sortedBookings.slice(0, 10).map((booking, index) => {
      const callDateTime = new Date(booking.callDate + ' ' + booking.callTime);
      const now = new Date();
      const timeDiff = now.getTime() - callDateTime.getTime();
      const minutesAgo = Math.floor(timeDiff / 60000);
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);

      let timeText;
      if (minutesAgo < 1) {
        timeText = 'Just now';
      } else if (minutesAgo < 60) {
        timeText = `${minutesAgo} min ago`;
      } else if (hoursAgo < 24) {
        timeText = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
      } else {
        timeText = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
      }

      // Determine activity type and message based on booking data
      let type, message, detail, status;
      const bookingStatus = booking.bookingStatus ? booking.bookingStatus.toLowerCase() : '';

      if (bookingStatus === 'confirmed') {
        type = 'success';
        message = `Booking confirmed for ${booking.name}`;
        detail = `${booking.serviceType} - ${booking.callDurationMinutes || 'N/A'} min`;
        status = 'success';
      } else if (bookingStatus === 'pending') {
        type = 'warning';
        message = `Pending booking for ${booking.name}`;
        detail = `${booking.serviceType} - Awaiting confirmation`;
        status = 'warning';
      } else if (bookingStatus === 'completed') {
        type = 'call';
        message = `Call completed with ${booking.name}`;
        detail = `Duration: ${booking.callDurationMinutes || 'N/A'} min - ${booking.serviceType}`;
        status = 'success';
      } else {
        type = 'call';
        message = `New booking from ${booking.name}`;
        detail = `${booking.serviceType} - ${booking.phoneNumber || 'N/A'}`;
        status = 'active';
      }

      return {
        id: `booking-${index}`,
        type,
        message,
        detail,
        status,
        time: timeText,
        timestamp: callDateTime.getTime(),
        booking
      };
    });
  }, [bookingsData]);

  // Update timestamps every 30 seconds
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Recalculate time text based on current time
  const activitiesWithUpdatedTime = useMemo(() => {
    return activities.map(activity => {
      const minutesAgo = Math.floor((currentTime - activity.timestamp) / 60000);
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);

      let timeText;
      if (minutesAgo < 1) {
        timeText = 'Just now';
      } else if (minutesAgo < 60) {
        timeText = `${minutesAgo} min ago`;
      } else if (hoursAgo < 24) {
        timeText = `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
      } else {
        timeText = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
      }

      return { ...activity, time: timeText };
    });
  }, [activities, currentTime]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'upgrade':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'from-emerald-600 to-green-600';
      case 'warning':
        return 'from-amber-600 to-orange-600';
      case 'active':
        return 'from-blue-600 to-blue-700';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-emerald-100';
      case 'warning':
        return 'text-amber-100';
      case 'active':
        return 'text-blue-100';
      default:
        return 'text-gray-100';
    }
  };

  // Filter activities based on search query
  const filteredActivities = activitiesWithUpdatedTime.filter(activity => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      activity.message.toLowerCase().includes(query) ||
      activity.detail.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h3 className="text-white text-lg font-semibold">Live Activity Feed</h3>
        </div>
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-gray-400">Loading activities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-400" />
        <h3 className="text-white text-lg font-semibold">Live Activity Feed</h3>
        {searchQuery && (
          <span className="text-xs text-gray-400">
            ({filteredActivities.length} result{filteredActivities.length !== 1 ? 's' : ''})
          </span>
        )}
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <button 
              key={activity.id} 
              className="w-full text-left flex items-start gap-3 p-3 rounded-xl bg-[#121633]/50 border border-blue-500/10 hover:border-blue-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer"
              onClick={() => console.log('Activity clicked:', activity.id)}
              aria-label={`${activity.message}. ${activity.detail}. ${activity.time}`}
            >
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getStatusColor(activity.status)} ${getTextColor(activity.status)} shadow-lg`} aria-hidden="true">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{activity.message}</p>
                <p className="text-blue-300 text-xs mt-1">{activity.detail}</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
            </button>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No activities found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
      <button 
        className="mt-4 w-full py-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/50 rounded-lg"
        onClick={onViewAll}
        aria-label="View all activities"
      >
        View All Activities →
      </button>
    </div>
  );
}