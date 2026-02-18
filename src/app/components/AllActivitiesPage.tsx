import { Phone, CheckCircle, AlertCircle, Clock, Sparkles, TrendingUp, ArrowLeft, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

const baseActivities = [
  {
    id: 1,
    type: 'success',
    message: 'AI model training completed successfully',
    detail: 'Neural network v4.2 deployed',
    status: 'success',
  },
  {
    id: 2,
    type: 'call',
    message: 'New conversation session initiated',
    detail: 'User ID: USR-8472',
    status: 'active',
  },
  {
    id: 3,
    type: 'upgrade',
    message: 'Performance optimization detected',
    detail: '+12% response improvement',
    status: 'success',
  },
  {
    id: 4,
    type: 'warning',
    message: 'High traffic volume alert',
    detail: 'Scaling resources automatically',
    status: 'warning',
  },
  {
    id: 5,
    type: 'call',
    message: 'Voice synthesis request completed',
    detail: 'Duration: 45s',
    status: 'success',
  },
  {
    id: 6,
    type: 'success',
    message: 'System health check passed',
    detail: 'All services operational',
    status: 'success',
  },
  {
    id: 7,
    type: 'call',
    message: 'New API integration request',
    detail: 'External service connected',
    status: 'active',
  },
  {
    id: 8,
    type: 'upgrade',
    message: 'Database optimization complete',
    detail: 'Query performance +18%',
    status: 'success',
  },
  {
    id: 9,
    type: 'warning',
    message: 'Memory usage threshold reached',
    detail: 'Optimizing cache storage',
    status: 'warning',
  },
  {
    id: 10,
    type: 'success',
    message: 'Backup completed successfully',
    detail: 'All data secured',
    status: 'success',
  },
];

interface AllActivitiesPageProps {
  onBack: () => void;
}

export function AllActivitiesPage({ onBack }: AllActivitiesPageProps) {
  const [filter, setFilter] = useState<'all' | 'success' | 'warning' | 'active'>('all');
  const [activities, setActivities] = useState(baseActivities.map((activity, index) => ({
    ...activity,
    time: `${2 + index * 6} min ago`,
    timestamp: Date.now() - (2 + index * 6) * 60000,
  })));

  // Update timestamps every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => prev.map(activity => {
        const minutesAgo = Math.floor((Date.now() - activity.timestamp) / 60000);
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
        
        return { ...activity, time: timeText };
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'upgrade':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
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

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.status === filter);

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
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
              All Activities
            </h2>
            <p className="text-gray-400">Complete activity history and system events</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
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
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'active'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'bg-blue-600/10 text-gray-400 hover:text-white border border-blue-500/20'
              }`}
            >
              Active
            </button>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h3 className="text-white text-lg font-semibold">
            {filter === 'all' ? 'All Activities' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Activities`}
          </h3>
          <span className="text-sm text-gray-400">({filteredActivities.length})</span>
        </div>

        <div className="space-y-3">
          {filteredActivities.map((activity) => (
            <button 
              key={activity.id} 
              className="w-full text-left flex items-start gap-4 p-4 rounded-xl bg-[#121633]/50 border border-blue-500/10 hover:border-blue-500/30 hover:bg-[#121633]/70 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer"
              onClick={() => console.log('Activity clicked:', activity.id)}
              aria-label={`${activity.message}. ${activity.detail}. ${activity.time}`}
            >
              <div className={`p-3 rounded-lg bg-gradient-to-br ${getStatusColor(activity.status)} ${getTextColor(activity.status)} shadow-lg flex-shrink-0`} aria-hidden="true">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-base font-medium mb-1">{activity.message}</p>
                <p className="text-blue-300 text-sm">{activity.detail}</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
