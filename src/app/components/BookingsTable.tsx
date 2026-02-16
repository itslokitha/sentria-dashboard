import { useState, useMemo } from 'react';
import { useGoogleSheets, BookingData } from '../hooks/useGoogleSheets';
import { Phone, Clock, DollarSign, Calendar, Search, Filter, Download, RefreshCw } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface BookingsTableProps {
  searchQuery?: string;
}

export function BookingsTable({ searchQuery = '' }: BookingsTableProps) {
  const { data, loading, error } = useGoogleSheets('1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M');
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState('all');

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCalls = data.length;
    const totalRevenue = data.length * 49.99; // Assuming $49.99 per call
    const avgDuration = data.length > 0 
      ? data.reduce((sum, booking) => sum + (booking.callDurationMinutes || 0), 0) / data.length 
      : 0;
    const confirmedBookings = data.filter(b => b.bookingStatus && b.bookingStatus.toLowerCase() === 'confirmed').length;

    return { totalCalls, totalRevenue, avgDuration, confirmedBookings };
  }, [data]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter(booking => {
      // If no search query, just check status
      const matchesSearch = !searchQuery || 
        booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.phoneNumber.includes(searchQuery);
      
      const matchesStatus = 
        statusFilter === 'all' || 
        booking.bookingStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'confirmed') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (statusLower === 'pending') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (statusLower === 'cancelled') return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (statusLower === 'completed') return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getStatusLabel = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'confirmed') return t('bookings.confirmed');
    if (statusLower === 'pending') return t('bookings.pending');
    if (statusLower === 'cancelled') return t('bookings.cancelled');
    if (statusLower === 'completed') return t('bookings.completed');
    return status;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <div className="flex items-center justify-center space-x-3">
          <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
          <p className="text-gray-300">Loading booking data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-5 border border-blue-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Calls</p>
              <p className="text-2xl font-bold text-white">{stats.totalCalls}</p>
            </div>
            <Phone className="w-10 h-10 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-xl p-5 border border-purple-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Avg Duration</p>
              <p className="text-2xl font-bold text-white">{stats.avgDuration.toFixed(1)}m</p>
            </div>
            <Clock className="w-10 h-10 text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-violet-600/20 to-violet-800/20 rounded-xl p-5 border border-violet-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-white">{stats.confirmedBookings}</p>
            </div>
            <Calendar className="w-10 h-10 text-violet-400" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Call Bookings
              {searchQuery && (
                <span className="ml-2 text-sm text-gray-400 font-normal">
                  ({filteredData.length} result{filteredData.length !== 1 ? 's' : ''})
                </span>
              )}
            </h2>
            <p className="text-gray-400 text-sm">Manage and track all customer bookings</p>
          </div>
          <button 
            onClick={() => {
              // Convert bookings data to CSV
              const headers = ['Name', 'Email', 'Phone', 'Date', 'Time', 'Service', 'Duration (min)', 'Duration (sec)', 'Status', 'Hours Type'];
              const csvData = filteredData.map(booking => [
                booking.name,
                booking.email,
                booking.phoneNumber,
                booking.callDate,
                booking.callTime,
                booking.serviceType,
                booking.callDurationMinutes,
                booking.callDurationSeconds,
                booking.bookingStatus,
                booking.afterHoursBeforeHours
              ]);
              
              // Create CSV string
              const csvContent = [
                headers.join(','),
                ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
              ].join('\n');
              
              // Create download link
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              const url = URL.createObjectURL(blob);
              link.setAttribute('href', url);
              link.setAttribute('download', `sentria-bookings-${new Date().toISOString().split('T')[0]}.csv`);
              link.style.visibility = 'hidden';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-all"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-[#121633]/50 border border-blue-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/40 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-500/20">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">{t('bookings.name')}</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">{t('bookings.email')}</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">{t('bookings.callDateTime')}</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">{t('bookings.serviceType')}</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">{t('bookings.duration')}</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">{t('bookings.status')}</th>
                <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Hours</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    {t('bookings.noBookings')}
                  </td>
                </tr>
              ) : (
                filteredData.map((booking, index) => (
                  <tr
                    key={index}
                    className="border-b border-blue-500/10 hover:bg-blue-500/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <p className="text-white font-medium">{booking.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-300 text-sm">{booking.email}</p>
                      <p className="text-gray-500 text-xs">{booking.phoneNumber}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-300 text-sm">{booking.callDate}</p>
                      <p className="text-gray-500 text-xs">{booking.callTime}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-blue-400 text-sm">{booking.serviceType}</span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-300 text-sm">{booking.callDurationMinutes}m</p>
                      <p className="text-gray-500 text-xs">{booking.callDurationSeconds}s</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.bookingStatus)}`}>
                        {getStatusLabel(booking.bookingStatus)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-400 text-sm">{booking.afterHoursBeforeHours || 'Regular'}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Showing {filteredData.length} of {data.length} bookings
        </div>
      </div>
    </div>
  );
}