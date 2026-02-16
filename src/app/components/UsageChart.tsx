import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useGoogleSheets } from '../hooks/useGoogleSheets';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronDown } from 'lucide-react';

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'sixMonths' | 'yearly' | 'allTime';

export function UsageChart() {
  const { data, loading } = useGoogleSheets('1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M');
  const { t } = useTranslation();
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('allTime');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Process booking data by date with time period filter
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

    // Group bookings by date
    const dateMap = new Map<string, { confirmed: number; total: number; dateObj: Date }>();
    
    data.forEach((booking) => {
      // Skip bookings without required fields
      if (!booking.callDate || !booking.bookingStatus) return;
      
      const bookingDate = parseDate(booking.callDate);
      if (!bookingDate) return;
      
      // Filter by time period
      if (bookingDate < cutoffDate) return;
      
      // Create a normalized date key (M/D format for display)
      const dateKey = `${bookingDate.getMonth() + 1}/${bookingDate.getDate()}`;
      
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, { confirmed: 0, total: 0, dateObj: bookingDate });
      }
      const current = dateMap.get(dateKey)!;
      current.total += 1;
      if (booking.bookingStatus && booking.bookingStatus.toLowerCase() === 'confirmed') {
        current.confirmed += 1;
      }
    });

    // Convert to array and sort by date
    const sortedData = Array.from(dateMap.entries())
      .map(([name, stats]) => ({
        name,
        date: stats.dateObj,
        bookings: stats.total,
        confirmed: stats.confirmed
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(({ name, bookings, confirmed }) => ({ name, bookings, confirmed }));

    return sortedData;
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
          <h3 className="text-white text-lg font-semibold">{t('charts.bookingTrends')}</h3>
          <p className="text-gray-400 text-sm">{t('charts.dailyBookingVolume')}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 transition-all flex items-center gap-2"
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
              <div className="absolute right-0 mt-2 w-48 bg-[#0d1128] border border-blue-500/30 rounded-lg shadow-xl z-20 overflow-hidden">
                {timePeriods.map((period) => (
                  <button
                    key={period.value}
                    onClick={() => {
                      setTimePeriod(period.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      timePeriod === period.value
                        ? 'bg-blue-600/30 text-blue-300'
                        : 'text-gray-400 hover:bg-blue-600/20 hover:text-blue-300'
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
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
          <XAxis dataKey="name" stroke="#9ca3c4" />
          <YAxis stroke="#9ca3c4" allowDecimals={false} />
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
          <Line 
            type="monotone" 
            dataKey="bookings" 
            stroke="#3b82f6" 
            strokeWidth={3}
            name="Total Bookings"
            dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            fill="url(#colorBookings)"
          />
          <Line 
            type="monotone" 
            dataKey="confirmed" 
            stroke="#10b981" 
            strokeWidth={3}
            name="Confirmed"
            dot={{ fill: '#10b981', r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            fill="url(#colorConfirmed)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}