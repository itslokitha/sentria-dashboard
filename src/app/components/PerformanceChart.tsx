import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useGoogleSheets } from '../hooks/useGoogleSheets';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronDown } from 'lucide-react';

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'sixMonths' | 'yearly' | 'allTime';

export function PerformanceChart() {
  const { data, loading } = useGoogleSheets('1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M');
  const { t } = useTranslation();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('allTime');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Process booking data by status with time period filter
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Calculate date cutoff based on time period
    const now = new Date();
    let cutoffDate = new Date(0); // Default to beginning of time for 'allTime'
    
    switch (timePeriod) {
      case 'daily':
        cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        break;
      case 'weekly':
        cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'monthly':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'sixMonths':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        break;
      case 'yearly':
        cutoffDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      case 'allTime':
        cutoffDate = new Date(0);
        break;
    }

    // Helper function to parse date in multiple formats
    const parseDate = (dateStr: string): Date | null => {
      if (!dateStr) return null;
      
      // Try format: "2026-01-01" (YYYY-MM-DD)
      if (dateStr.includes('-')) {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) return date;
      }
      
      // Try format: "1/1/2026" (M/D/YYYY)
      if (dateStr.includes('/')) {
        const parts = dateStr.split('/').map(Number);
        if (parts.length >= 2) {
          const month = parts[0];
          const day = parts[1];
          const year = parts[2] || 2026;
          return new Date(year, month - 1, day);
        }
      }
      
      return null;
    };

    // Filter data by time period
    const filteredData = data.filter((booking) => {
      if (!booking.callDate) return false;
      const bookingDate = parseDate(booking.callDate);
      if (!bookingDate) return false;
      return bookingDate >= cutoffDate;
    });

    // Count bookings by status
    const statusCounts: { [key: string]: number } = {};
    const durationByStatus: { [key: string]: number[] } = {};
    
    filteredData.forEach((booking) => {
      const status = booking.bookingStatus;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      
      if (!durationByStatus[status]) {
        durationByStatus[status] = [];
      }
      durationByStatus[status].push(booking.callDurationMinutes);
    });

    // Calculate average duration per status
    const result = Object.entries(statusCounts).map(([status, count]) => {
      const avgDuration = durationByStatus[status].length > 0
        ? Math.round(durationByStatus[status].reduce((sum, d) => sum + d, 0) / durationByStatus[status].length)
        : 0;
      
      return {
        name: status,
        count: count,
        avgDuration: avgDuration
      };
    });

    return result;
  }, [data, timePeriod]);

  const timePeriods: { value: TimePeriod; label: string }[] = [
    { value: 'daily', label: t('charts.daily') },
    { value: 'weekly', label: t('charts.weekly') },
    { value: 'monthly', label: t('charts.monthly') },
    { value: 'sixMonths', label: t('charts.sixMonths') },
    { value: 'yearly', label: t('charts.yearly') },
    { value: 'allTime', label: t('charts.allTime') },
  ];

  const selectedPeriodLabel = timePeriods.find(p => p.value === timePeriod)?.label || t('charts.allTime');

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-gray-400">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold">{t('charts.bookingPerformance')}</h3>
          <p className="text-gray-400 text-sm">{t('charts.statusDistribution')}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 transition-all flex items-center gap-2"
          >
            <span className="text-xs">{selectedPeriodLabel}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-[#0d1128] border border-purple-500/30 rounded-lg shadow-xl z-20 overflow-hidden">
                {timePeriods.map((period) => (
                  <button
                    key={period.value}
                    onClick={() => {
                      setTimePeriod(period.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      timePeriod === period.value
                        ? 'bg-purple-600/30 text-purple-300'
                        : 'text-gray-400 hover:bg-purple-600/20 hover:text-purple-300'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis dataKey="name" stroke="#9ca3c4" />
          <YAxis stroke="#9ca3c4" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0d1128', 
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
            labelStyle={{ color: '#e2e4f3' }}
          />
          <Legend />
          <Bar 
            dataKey="count" 
            fill="#3b82f6" 
            radius={[8, 8, 0, 0]} 
            name="Booking Count"
          />
          <Bar 
            dataKey="avgDuration" 
            fill="#a855f7" 
            radius={[8, 8, 0, 0]} 
            name="Avg Duration (min)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}