import { FileText, Users, Calendar, Bell, Activity, ChevronRight } from 'lucide-react';

interface SearchResult {
  type: 'booking' | 'activity' | 'notification' | 'user';
  title: string;
  description: string;
  page: string;
  category: string;
}

interface GlobalSearchResultsProps {
  searchQuery: string;
  onNavigate: (page: string) => void;
  bookingsData: any[];
}

export function GlobalSearchResults({ searchQuery, onNavigate, bookingsData }: GlobalSearchResultsProps) {
  if (!searchQuery) return null;

  // Search through all data sources
  const results: SearchResult[] = [];

  // Activity Feed Items
  const activityItems = [
    { type: 'training', text: 'AI model training completed successfully', time: '2 min ago' },
    { type: 'alert', text: 'High traffic detected on voice server #3', time: '5 min ago' },
    { type: 'success', text: 'System backup completed', time: '15 min ago' },
    { type: 'info', text: 'New user registration: Sarah Johnson', time: '23 min ago' },
    { type: 'warning', text: 'API rate limit approaching threshold', time: '45 min ago' },
    { type: 'training', text: 'Neural network optimization in progress', time: '1 hour ago' },
    { type: 'success', text: 'Database migration completed', time: '2 hours ago' },
    { type: 'alert', text: 'Unusual activity detected in voice patterns', time: '3 hours ago' }
  ];

  activityItems.forEach(item => {
    if (item.text.toLowerCase().includes(searchQuery.toLowerCase())) {
      results.push({
        type: 'activity',
        title: item.text,
        description: item.time,
        page: 'overview',
        category: 'Activity Feed'
      });
    }
  });

  // Notification Items
  const notificationItems = [
    { type: 'system', text: 'System maintenance scheduled for tonight at 2 AM', time: '10 min ago' },
    { type: 'alert', text: 'Voice recognition accuracy dropped below 95%', time: '1 hour ago' },
    { type: 'update', text: 'New feature: Multi-language support now available', time: '3 hours ago' },
    { type: 'info', text: 'Weekly performance report is ready', time: '5 hours ago' },
    { type: 'alert', text: 'Server CPU usage exceeded 80%', time: '6 hours ago' },
    { type: 'system', text: 'Security patch applied successfully', time: '8 hours ago' }
  ];

  notificationItems.forEach(item => {
    if (item.text.toLowerCase().includes(searchQuery.toLowerCase())) {
      results.push({
        type: 'notification',
        title: item.text,
        description: item.time,
        page: 'overview',
        category: 'Notifications'
      });
    }
  });

  // Bookings Data
  bookingsData.forEach(booking => {
    const searchLower = searchQuery.toLowerCase();
    const matchesBooking = 
      booking.name.toLowerCase().includes(searchLower) ||
      booking.email.toLowerCase().includes(searchLower) ||
      booking.phoneNumber.includes(searchQuery) ||
      booking.serviceType.toLowerCase().includes(searchLower) ||
      booking.bookingStatus.toLowerCase().includes(searchLower);

    if (matchesBooking) {
      results.push({
        type: 'booking',
        title: `${booking.name} - ${booking.serviceType}`,
        description: `${booking.email} • ${booking.bookingStatus} • $${booking.cost}`,
        page: 'bookings',
        category: 'Call Bookings'
      });
    }
  });

  // User Management matches
  const userKeywords = ['user', 'users', 'management', 'registration', 'profile', 'account'];
  if (userKeywords.some(keyword => searchQuery.toLowerCase().includes(keyword))) {
    results.push({
      type: 'user',
      title: 'User Management',
      description: 'Manage users and monitor user activity',
      page: 'users',
      category: 'User Management'
    });
  }

  // Analytics matches
  const analyticsKeywords = ['analytics', 'stats', 'metrics', 'performance', 'chart', 'graph', 'data'];
  if (analyticsKeywords.some(keyword => searchQuery.toLowerCase().includes(keyword))) {
    results.push({
      type: 'activity',
      title: 'Analytics Dashboard',
      description: 'View comprehensive analytics and performance metrics',
      page: 'analytics',
      category: 'Analytics'
    });
  }

  // Performance matches
  const performanceKeywords = ['performance', 'monitoring', 'system', 'health', 'speed', 'response time'];
  if (performanceKeywords.some(keyword => searchQuery.toLowerCase().includes(keyword))) {
    results.push({
      type: 'activity',
      title: 'Performance Monitoring',
      description: 'Real-time performance metrics and system health',
      page: 'performance',
      category: 'Performance'
    });
  }

  // Settings matches
  const settingsKeywords = ['settings', 'preferences', 'configuration', 'calendar'];
  if (settingsKeywords.some(keyword => searchQuery.toLowerCase().includes(keyword))) {
    results.push({
      type: 'notification',
      title: 'Settings',
      description: 'Configure your SENTRIA dashboard preferences',
      page: 'settings',
      category: 'Settings'
    });
  }

  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return FileText;
      case 'activity':
        return Activity;
      case 'notification':
        return Bell;
      case 'user':
        return Users;
      default:
        return FileText;
    }
  };

  return (
    <div className="mb-8">
      {/* Search Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Search Results for "{searchQuery}"
        </h2>
        <p className="text-gray-400">
          Found {results.length} result{results.length !== 1 ? 's' : ''} across your dashboard
        </p>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-12 border border-blue-500/20 text-center">
          <div className="w-16 h-16 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
          <p className="text-gray-400 mb-6">
            We couldn't find anything matching "{searchQuery}". Try different keywords or check your spelling.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-gray-300 mb-2 font-medium">Search Tips:</p>
            <ul className="text-sm text-gray-400 space-y-1 text-left">
              <li>• Try searching for: bookings, users, analytics, notifications</li>
              <li>• Search by customer name, email, or phone number</li>
              <li>• Use keywords like "training", "alert", "system", "performance"</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedResults).map(([category, items]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-semibold text-white">{category}</h3>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
                  {items.length}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {items.map((result, index) => {
                  const Icon = getIcon(result.type);
                  return (
                    <button
                      key={`${category}-${index}`}
                      onClick={() => onNavigate(result.page)}
                      className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/40 hover:bg-[#1a1f3a] transition-all text-left group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium mb-1 group-hover:text-blue-300 transition-colors">
                              {result.title}
                            </h4>
                            <p className="text-sm text-gray-400">{result.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0">
                          <span className="text-xs font-medium capitalize">{result.page}</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
