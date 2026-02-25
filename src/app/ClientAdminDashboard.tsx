// ============================================================
// SENTRIA — Client Admin Dashboard
// Full management view for clinic/store admins.
// Sees all bookings for their store + team management + usage.
// ============================================================

import { useState, useMemo } from 'react';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import {
  LayoutDashboard, CalendarDays, TrendingUp, Users, CreditCard,
  Settings, Bell, Search, LogOut, ChevronRight, Phone, Clock,
  CheckCircle, XCircle, RefreshCw, BarChart3, Activity,
  UserPlus, Trash2, Mail, Shield, Star, ArrowUpRight,
  ArrowDownRight, Filter, Download, MoreHorizontal, Zap,
  AlertCircle, Calendar, TrendingDown, Award
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'client-admin' | 'client-user';
  status: 'active' | 'inactive';
  lastActive: string;
  totalCalls: number;
}

interface ClientAdminDashboardProps {
  userEmail: string;
  userName: string;
  clientName: string;
  sheetId: string;
  onLogout: () => void;
}

// ── Mock team data ─────────────────────────────────────────────────────────
const MOCK_TEAM: TeamMember[] = [
  { id: '1', name: 'Sarah Mitchell', email: 'sarah@tremomanagement.com', role: 'client-admin', status: 'active', lastActive: '2 mins ago', totalCalls: 0 },
  { id: '2', name: 'James Rowan', email: 'james@tremomanagement.com', role: 'client-user', status: 'active', lastActive: '1 hour ago', totalCalls: 0 },
  { id: '3', name: 'Priya Nair', email: 'priya@tremomanagement.com', role: 'client-user', status: 'active', lastActive: '3 hours ago', totalCalls: 0 },
  { id: '4', name: 'Carlos Vega', email: 'carlos@tremomanagement.com', role: 'client-user', status: 'inactive', lastActive: '5 days ago', totalCalls: 0 },
];

// ── Sidebar nav ────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',    icon: LayoutDashboard, label: 'Overview' },
  { id: 'bookings',    icon: CalendarDays,    label: 'All Bookings' },
  { id: 'performance', icon: TrendingUp,      label: 'Performance' },
  { id: 'team',        icon: Users,           label: 'Team' },
  { id: 'usage',       icon: CreditCard,      label: 'Usage & Billing' },
  { id: 'settings',    icon: Settings,        label: 'Settings' },
];

// ── Stat card component ────────────────────────────────────────────────────
function StatCard({ title, value, change, trend, icon: Icon, color }: {
  title: string; value: string; change: string; trend: 'up' | 'down' | 'neutral';
  icon: any; color: string;
}) {
  const colors: Record<string, string> = {
    blue:   'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
    green:  'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
    amber:  'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400',
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-5 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div className={`p-2 rounded-xl bg-gradient-to-br ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="flex items-center gap-1 text-sm">
        {trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-emerald-400" /> :
         trend === 'down' ? <ArrowDownRight className="w-4 h-4 text-red-400" /> : null}
        <span className={trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}>
          {change}
        </span>
        <span className="text-gray-500 ml-1">vs last month</span>
      </div>
    </div>
  );
}

// ── Mini bar chart using CSS ────────────────────────────────────────────────
function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const colors: Record<string, string> = {
    blue: 'bg-blue-500', purple: 'bg-purple-500', emerald: 'bg-emerald-500', amber: 'bg-amber-500'
  };
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end">
          <div
            className={`${colors[color] || 'bg-blue-500'} rounded-sm opacity-80 transition-all`}
            style={{ height: `${(v / max) * 100}%`, minHeight: v > 0 ? '4px' : '0' }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────
function OverviewTab({ data, loading, userName, clientName }: {
  data: any[]; loading: boolean; userName: string; clientName: string;
}) {
  const stats = useMemo(() => {
    if (!data.length) return { total: 0, confirmed: 0, cancelled: 0, avgDuration: 0, successRate: 0, totalMinutes: 0 };
    const total = data.length;
    const confirmed = data.filter(b => b.bookingStatus?.toLowerCase() === 'confirmed').length;
    const cancelled = data.filter(b => b.bookingStatus?.toLowerCase() === 'cancelled').length;
    const totalMin = data.reduce((s, b) => s + (b.callDurationMinutes || 0), 0);
    return {
      total, confirmed, cancelled,
      avgDuration: total ? totalMin / total : 0,
      successRate: total ? (confirmed / total) * 100 : 0,
      totalMinutes: totalMin,
    };
  }, [data]);

  // Weekly breakdown for mini chart
  const weeklyData = useMemo(() => {
    const weeks = [0, 0, 0, 0, 0, 0, 0];
    const now = new Date();
    data.forEach(b => {
      if (!b.callDate) return;
      const d = new Date(b.callDate);
      const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diff >= 0 && diff < 7) weeks[6 - diff]++;
    });
    return weeks;
  }, [data]);

  const recentBookings = useMemo(() =>
    [...data].sort((a, b) => new Date(b.callDate).getTime() - new Date(a.callDate).getTime()).slice(0, 6),
    [data]
  );

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 5 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">
          {greeting}, <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">{userName.split(' ')[0]}</span>
        </h1>
        <p className="text-gray-400">Here's what's happening at <span className="text-white font-medium">{clientName}</span> today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Calls" value={stats.total.toString()} change="+12.4%" trend="up" icon={Phone} color="blue" />
        <StatCard title="Confirmed" value={stats.confirmed.toString()} change="+8.1%" trend="up" icon={CheckCircle} color="green" />
        <StatCard title="Success Rate" value={`${stats.successRate.toFixed(1)}%`} change="+2.3%" trend="up" icon={TrendingUp} color="purple" />
        <StatCard title="Avg Duration" value={`${stats.avgDuration.toFixed(1)}m`} change="-0.4m" trend="down" icon={Clock} color="amber" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-day trend */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Call Activity — Last 7 Days</h3>
              <p className="text-gray-500 text-sm mt-0.5">All agents combined</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5" />
              Active
            </div>
          </div>
          <MiniBarChart data={weeklyData} color="blue" />
          <div className="flex justify-between mt-2">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <span key={d} className="text-gray-600 text-xs flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Status Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: 'Confirmed', count: stats.confirmed, total: stats.total, color: 'bg-emerald-500' },
              { label: 'Cancelled', count: stats.cancelled, total: stats.total, color: 'bg-red-500' },
              { label: 'Other', count: stats.total - stats.confirmed - stats.cancelled, total: stats.total, color: 'bg-amber-500' },
            ].map(({ label, count, total, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-white font-medium">{count} <span className="text-gray-500 font-normal">/ {total}</span></span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all`} style={{ width: total > 0 ? `${(count / total) * 100}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold">Recent Bookings</h3>
          <span className="text-blue-400 text-sm cursor-pointer hover:text-blue-300">View all →</span>
        </div>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading bookings…</div>
        ) : (
          <div className="space-y-2">
            {recentBookings.map((b, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {b.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{b.name || 'Unknown'}</p>
                  <p className="text-gray-500 text-xs truncate">{b.serviceType || 'No service'} · {b.callDate}</p>
                </div>
                <div className="text-xs shrink-0">
                  <span className={`px-2 py-1 rounded-full font-medium ${
                    b.bookingStatus?.toLowerCase() === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400' :
                    b.bookingStatus?.toLowerCase() === 'cancelled' ? 'bg-red-500/15 text-red-400' :
                    'bg-amber-500/15 text-amber-400'
                  }`}>
                    {b.bookingStatus || 'Unknown'}
                  </span>
                </div>
                <div className="text-gray-500 text-xs shrink-0 w-12 text-right">
                  {b.callDurationMinutes?.toFixed(1) || '—'}m
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Bookings Tab ──────────────────────────────────────────────────────────
function BookingsTab({ data, loading }: { data: any[]; loading: boolean }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() =>
    data.filter(b => {
      const matchSearch = !search || b.name?.toLowerCase().includes(search.toLowerCase()) || b.email?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || b.bookingStatus?.toLowerCase() === statusFilter;
      return matchSearch && matchStatus;
    }),
    [data, search, statusFilter]
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">All Bookings</h2>
        <p className="text-gray-400 mt-1">Every call booking across your entire team</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 flex-1 min-w-56">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-600"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'confirmed', 'cancelled', 'updated/rescheduled'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                statusFilter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'
              }`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_1fr] gap-4 px-5 py-3.5 border-b border-white/[0.06]">
          {['Customer', 'Service', 'Date & Time', 'Duration', 'Status', 'Hours'].map(h => (
            <span key={h} className="text-gray-500 text-xs font-medium uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No bookings found</div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((b, i) => (
              <div key={i} className="grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_1fr] gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600/70 to-purple-600/70 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {b.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{b.name || '—'}</p>
                    <p className="text-gray-500 text-xs truncate">{b.email || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-300 text-sm truncate">{b.serviceType || '—'}</span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-gray-300 text-sm">{b.callDate || '—'}</span>
                  <span className="text-gray-500 text-xs">{b.callTime || '—'}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-300 text-sm">{b.callDurationMinutes?.toFixed(1) || '—'}m</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    b.bookingStatus?.toLowerCase() === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400' :
                    b.bookingStatus?.toLowerCase() === 'cancelled' ? 'bg-red-500/15 text-red-400' :
                    'bg-amber-500/15 text-amber-400'
                  }`}>
                    {b.bookingStatus || '—'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs ${b.afterHoursBeforeHours === 'After Hours' ? 'text-amber-400' : 'text-gray-500'}`}>
                    {b.afterHoursBeforeHours || '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="px-5 py-3.5 border-t border-white/[0.06] text-gray-500 text-sm">
          Showing {filtered.length} of {data.length} bookings
        </div>
      </div>
    </div>
  );
}

// ── Performance Tab ────────────────────────────────────────────────────────
function PerformanceTab({ data }: { data: any[] }) {
  const stats = useMemo(() => {
    if (!data.length) return { byService: {}, byHour: new Array(24).fill(0), byDay: {} };
    const byService: Record<string, number> = {};
    const byHour: number[] = new Array(24).fill(0);
    const byDay: Record<string, number> = {};

    data.forEach(b => {
      const svc = b.serviceType || 'Unknown';
      byService[svc] = (byService[svc] || 0) + 1;
      const time = b.callTime;
      if (time) {
        const match = time.match(/(\d+)/);
        if (match) byHour[parseInt(match[1]) % 24]++;
      }
      const date = b.callDate || '';
      if (date) byDay[date] = (byDay[date] || 0) + 1;
    });
    return { byService, byHour, byDay };
  }, [data]);

  const topHours = stats.byHour
    .map((count, h) => ({ hour: h, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const serviceEntries = Object.entries(stats.byService).sort((a, b) => b[1] - a[1]);
  const totalByService = serviceEntries.reduce((s, [, v]) => s + v, 0);

  const serviceColors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Performance</h2>
        <p className="text-gray-400 mt-1">Aggregate performance metrics for your entire team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service breakdown */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-5">Calls by Service Type</h3>
          <div className="space-y-4">
            {serviceEntries.slice(0, 5).map(([svc, count], i) => (
              <div key={svc}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-300">{svc}</span>
                  <span className="text-white font-medium">{count} <span className="text-gray-500 font-normal">({totalByService > 0 ? ((count/totalByService)*100).toFixed(0) : 0}%)</span></span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full ${serviceColors[i % serviceColors.length]} rounded-full`}
                    style={{ width: totalByService > 0 ? `${(count/totalByService)*100}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak hours */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-5">Peak Call Hours</h3>
          <div className="space-y-3">
            {topHours.map(({ hour, count }) => {
              const label = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
              return (
                <div key={hour} className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm w-14">{label}</span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(count / Math.max(...topHours.map(h => h.count))) * 100}%` }} />
                  </div>
                  <span className="text-gray-300 text-sm w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
          <p className="text-gray-600 text-xs mt-4">Based on all recorded bookings</p>
        </div>

        {/* After-hours breakdown */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-5">Active vs After Hours</h3>
          {(() => {
            const active = data.filter(b => b.afterHoursBeforeHours === 'Active Hours').length;
            const after = data.filter(b => b.afterHoursBeforeHours === 'After Hours').length;
            const total = data.length || 1;
            return (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1.5 text-sm">
                    <span className="text-gray-300">Active Hours</span>
                    <span className="text-white">{active} ({((active/total)*100).toFixed(0)}%)</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(active/total)*100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1.5 text-sm">
                    <span className="text-gray-300">After Hours</span>
                    <span className="text-white">{after} ({((after/total)*100).toFixed(0)}%)</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(after/total)*100}%` }} />
                  </div>
                </div>
                <p className="text-gray-600 text-xs mt-2">After-hours calls highlight the value of AI coverage</p>
              </div>
            );
          })()}
        </div>

        {/* KPIs */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-5">Key Performance Indicators</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Calls', value: data.length, icon: Phone, color: 'text-blue-400' },
              { label: 'Confirmed', value: data.filter(b => b.bookingStatus?.toLowerCase() === 'confirmed').length, icon: CheckCircle, color: 'text-emerald-400' },
              { label: 'Cancelled', value: data.filter(b => b.bookingStatus?.toLowerCase() === 'cancelled').length, icon: XCircle, color: 'text-red-400' },
              { label: 'Total Minutes', value: data.reduce((s, b) => s + (b.callDurationMinutes || 0), 0).toFixed(0), icon: Clock, color: 'text-purple-400' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white/[0.03] rounded-xl p-4 flex items-center gap-3">
                <Icon className={`w-6 h-6 ${color} shrink-0`} />
                <div>
                  <p className="text-gray-500 text-xs">{label}</p>
                  <p className="text-white text-xl font-bold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Team Tab ──────────────────────────────────────────────────────────────
function TeamTab() {
  const [team, setTeam] = useState(MOCK_TEAM);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');

  const handleRemove = (id: string) => {
    setTeam(t => t.filter(m => m.id !== id));
  };

  const handleInvite = () => {
    if (!inviteEmail || !inviteName) return;
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteName,
      email: inviteEmail,
      role: 'client-user',
      status: 'active',
      lastActive: 'Just added',
      totalCalls: 0,
    };
    setTeam(t => [...t, newMember]);
    setInviteEmail('');
    setInviteName('');
    setShowInvite(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Team</h2>
          <p className="text-gray-400 mt-1">Manage users who have access to your dashboard</p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Invite User
        </button>
      </div>

      {/* Invite form */}
      {showInvite && (
        <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Invite New Team Member</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={inviteName}
                onChange={e => setInviteName(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Email Address</label>
              <input
                type="email"
                placeholder="jane@yourcompany.com"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleInvite} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
              Send Invite
            </button>
            <button onClick={() => setShowInvite(false)} className="bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 px-5 py-2.5 rounded-xl text-sm transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Team summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Members', value: team.length, color: 'text-blue-400' },
          { label: 'Active', value: team.filter(m => m.status === 'active').length, color: 'text-emerald-400' },
          { label: 'Inactive', value: team.filter(m => m.status === 'inactive').length, color: 'text-red-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 text-center">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-gray-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Team table */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-3.5 border-b border-white/[0.06]">
          {['Member', 'Email', 'Role', 'Status', ''].map(h => (
            <span key={h} className="text-gray-500 text-xs font-medium uppercase tracking-wide">{h}</span>
          ))}
        </div>
        <div className="divide-y divide-white/[0.04]">
          {team.map(member => (
            <div key={member.id} className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {member.name[0]}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{member.name}</p>
                  <p className="text-gray-500 text-xs">{member.lastActive}</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm truncate">{member.email}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${
                member.role === 'client-admin' ? 'bg-purple-500/15 text-purple-400' : 'bg-blue-500/15 text-blue-400'
              }`}>
                {member.role === 'client-admin' ? 'Admin' : 'User'}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${
                member.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-500/15 text-gray-400'
              }`}>
                {member.status}
              </span>
              <button
                onClick={() => handleRemove(member.id)}
                className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Usage & Billing Tab ────────────────────────────────────────────────────
function UsageBillingTab({ data }: { data: any[] }) {
  const now = new Date();
  const currentMonth = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  const monthlyData = useMemo(() => {
    const thisMonth = data.filter(b => {
      const d = new Date(b.callDate || '');
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const total = thisMonth.length;
    const minutes = thisMonth.reduce((s, b) => s + (b.callDurationMinutes || 0), 0);
    const confirmed = thisMonth.filter(b => b.bookingStatus?.toLowerCase() === 'confirmed').length;
    return { total, minutes, confirmed, avgDuration: total ? minutes / total : 0 };
  }, [data]);

  const weeklyBreakdown = useMemo(() => {
    const weeks: { label: string; calls: number; minutes: number }[] = [];
    for (let w = 3; w >= 0; w--) {
      const start = new Date(now);
      start.setDate(start.getDate() - (w + 1) * 7);
      const end = new Date(now);
      end.setDate(end.getDate() - w * 7);
      const weekData = data.filter(b => {
        const d = new Date(b.callDate || '');
        return d >= start && d < end;
      });
      weeks.push({
        label: `Week ${4 - w}`,
        calls: weekData.length,
        minutes: weekData.reduce((s, b) => s + (b.callDurationMinutes || 0), 0),
      });
    }
    return weeks;
  }, [data]);

  const maxCalls = Math.max(...weeklyBreakdown.map(w => w.calls), 1);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Usage & Billing</h2>
        <p className="text-gray-400 mt-1">Your usage summary for {currentMonth}</p>
      </div>

      {/* Plan badge */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600/15 to-purple-600/15 border border-blue-500/30 rounded-2xl px-6 py-4">
        <Award className="w-5 h-5 text-blue-400" />
        <div>
          <span className="text-white font-semibold">Pro Plan</span>
          <span className="text-gray-400 text-sm ml-2">· Unlimited AI call minutes</span>
        </div>
        <div className="ml-auto">
          <span className="bg-blue-600/30 text-blue-300 text-xs px-3 py-1 rounded-full font-medium">Active</span>
        </div>
      </div>

      {/* This month stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Calls', value: monthlyData.total.toString(), icon: Phone, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Total Minutes', value: `${monthlyData.minutes.toFixed(0)}m`, icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Confirmed', value: monthlyData.confirmed.toString(), icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Avg Duration', value: `${monthlyData.avgDuration.toFixed(1)}m`, icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Weekly breakdown */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-5">Weekly Call Volume (Last 4 Weeks)</h3>
        <div className="flex items-end gap-4 h-40 mb-3">
          {weeklyBreakdown.map(({ label, calls }) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-gray-400 text-sm font-medium">{calls}</span>
              <div className="w-full flex flex-col justify-end" style={{ height: '100px' }}>
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all"
                  style={{ height: `${(calls / maxCalls) * 100}%`, minHeight: calls > 0 ? '6px' : '0' }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {weeklyBreakdown.map(({ label }) => (
            <div key={label} className="flex-1 text-center">
              <span className="text-gray-500 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Minutes detail */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Minutes Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weeklyBreakdown.map(({ label, minutes }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-semibold">{minutes.toFixed(1)} min</p>
                <p className="text-gray-500 text-xs">{label}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-semibold">{monthlyData.minutes.toFixed(1)} min</p>
              <p className="text-gray-500 text-xs">Total this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Settings Tab ───────────────────────────────────────────────────────────
function SettingsTab({ clientName }: { clientName: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Settings</h2>
        <p className="text-gray-400 mt-1">Manage your account and notification preferences</p>
      </div>
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <h3 className="text-white font-semibold">Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Company Name</label>
            <input defaultValue={clientName} className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Time Zone</label>
            <select className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60">
              <option value="UTC">UTC</option>
              <option value="America/Toronto">Eastern Time</option>
              <option value="America/Vancouver">Pacific Time</option>
            </select>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
          Save Changes
        </button>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-semibold">Notifications</h3>
        {[
          { label: 'New booking alerts', description: 'Get notified when a new booking is made' },
          { label: 'Daily summary email', description: 'Receive a daily summary of all call activity' },
          { label: 'Cancellation alerts', description: 'Get notified when a booking is cancelled' },
        ].map(({ label, description }) => (
          <div key={label} className="flex items-center justify-between py-2">
            <div>
              <p className="text-white text-sm font-medium">{label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{description}</p>
            </div>
            <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export function ClientAdminDashboard({ userEmail, userName, clientName, sheetId, onLogout }: ClientAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { data, loading } = useGoogleSheets(sheetId);

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="flex h-screen bg-[#070A12] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#060a1a] border-r border-white/[0.06] flex flex-col z-30 fixed left-0 top-0 h-screen">
        {/* Logo */}
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 480 120" className="w-40 h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="caGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4d5ed" />
                  <stop offset="50%" stopColor="#5b5fa8" />
                  <stop offset="100%" stopColor="#1a2570" />
                </linearGradient>
              </defs>
              <text x="240" y="75" fontFamily="Arial, sans-serif" fontSize="72" fontWeight="700"
                textAnchor="middle" letterSpacing="3" fill="url(#caGrad)">SENTRIA</text>
            </svg>
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full font-medium">Admin Portal</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-gradient-to-r from-blue-600/25 to-purple-600/15 text-white border border-blue-500/25 shadow-lg shadow-blue-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${activeTab === id ? 'text-blue-400' : ''}`} size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {getInitials(userName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{userName}</p>
              <p className="text-gray-500 text-xs truncate">{userEmail}</p>
            </div>
            <button onClick={onLogout} className="text-gray-600 hover:text-red-400 transition-colors">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-[#070A12]/90 backdrop-blur-sm border-b border-white/[0.06] px-8 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="text-white font-medium">{clientName}</span>
            <ChevronRight size={14} />
            <span className="capitalize">{NAV.find(n => n.id === activeTab)?.label}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2">
              <Search size={14} className="text-gray-500" />
              <input placeholder="Search…" className="bg-transparent text-white text-sm outline-none placeholder-gray-600 w-40" />
            </div>
            <button className="relative p-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-gray-400 hover:text-white transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">
          {activeTab === 'overview'    && <OverviewTab data={data} loading={loading} userName={userName} clientName={clientName} />}
          {activeTab === 'bookings'    && <BookingsTab data={data} loading={loading} />}
          {activeTab === 'performance' && <PerformanceTab data={data} />}
          {activeTab === 'team'        && <TeamTab />}
          {activeTab === 'usage'       && <UsageBillingTab data={data} />}
          {activeTab === 'settings'    && <SettingsTab clientName={clientName} />}
        </div>
      </main>

      {/* Ambient glows */}
      <div className="fixed top-0 left-64 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}
