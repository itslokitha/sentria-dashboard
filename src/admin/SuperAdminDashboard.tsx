// ============================================================
// SENTRIA — Super Admin Dashboard
// Full platform management: all clients, all users, analytics,
// system health. Data-ready but uses placeholders for now.
// ============================================================

import { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard, Building2, Users, BarChart3, Activity,
  LogOut, ChevronRight, Bell, Search, Plus, Edit2, Eye,
  Trash2, CheckCircle, XCircle, Clock, Phone, TrendingUp,
  TrendingDown, ArrowUpRight, ArrowDownRight, Shield,
  Database, Server, Zap, Globe, MoreHorizontal, Filter,
  Download, RefreshCw, AlertCircle, X, ChevronDown,
  Mail, Calendar, Award, Settings, Star, Save, Loader2
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { API_BASE_URL } from '../auth/cognitoConfig';

// ── Types ────────────────────────────────────────────────────────────────────
interface Client {
  id: string;
  name: string;
  industry: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  status: 'active' | 'inactive' | 'pending';
  adminEmail: string;
  userCount: number;
  totalCalls: number;
  totalMinutes: number;
  createdAt: string;
  sheetId?: string;
}

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'client-admin' | 'client-user';
  clientId: string;
  clientName: string;
  status: 'active' | 'inactive';
  lastActive: string;
  createdAt: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────
const MOCK_CLIENTS: Client[] = [
  { id: 'c1', name: 'Tremo Management', industry: 'Beauty & Wellness', plan: 'Pro', status: 'active', adminEmail: 'info@tremomanagement.com', userCount: 4, totalCalls: 217, totalMinutes: 384, createdAt: '2025-11-15', sheetId: '1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M' },
  { id: 'c2', name: 'Apex Dental Clinic', industry: 'Healthcare', plan: 'Enterprise', status: 'active', adminEmail: 'ops@apexdental.ca', userCount: 8, totalCalls: 541, totalMinutes: 1020, createdAt: '2025-10-03' },
  { id: 'c3', name: 'Nova Fitness Co.', industry: 'Fitness & Wellness', plan: 'Pro', status: 'active', adminEmail: 'admin@novafitness.com', userCount: 3, totalCalls: 188, totalMinutes: 275, createdAt: '2025-12-01' },
  { id: 'c4', name: 'Sunrise Auto Group', industry: 'Automotive', plan: 'Free', status: 'pending', adminEmail: 'info@sunriseauto.com', userCount: 1, totalCalls: 12, totalMinutes: 14, createdAt: '2026-01-20' },
  { id: 'c5', name: 'Harbor Legal LLP', industry: 'Legal Services', plan: 'Enterprise', status: 'active', adminEmail: 'admin@harborlegal.com', userCount: 12, totalCalls: 892, totalMinutes: 2100, createdAt: '2025-09-10' },
  { id: 'c6', name: 'Bloom Florist', industry: 'Retail', plan: 'Free', status: 'inactive', adminEmail: 'hello@bloomflorist.ca', userCount: 2, totalCalls: 34, totalMinutes: 41, createdAt: '2026-02-01' },
];

const MOCK_USERS: PlatformUser[] = [
  { id: 'u1', name: 'Lokitha Nilaweera', email: 'info@tremomanagement.com', role: 'super-admin', clientId: 'sentria-internal', clientName: 'Sentria', status: 'active', lastActive: '2 mins ago', createdAt: '2025-10-01' },
  { id: 'u2', name: 'Sarah Mitchell', email: 'sarah@tremomanagement.com', role: 'client-admin', clientId: 'c1', clientName: 'Tremo Management', status: 'active', lastActive: '1 hour ago', createdAt: '2025-11-15' },
  { id: 'u3', name: 'James Rowan', email: 'james@tremomanagement.com', role: 'client-user', clientId: 'c1', clientName: 'Tremo Management', status: 'active', lastActive: '3 hours ago', createdAt: '2025-11-16' },
  { id: 'u4', name: 'Dr. Emma Walsh', email: 'emma@apexdental.ca', role: 'client-admin', clientId: 'c2', clientName: 'Apex Dental Clinic', status: 'active', lastActive: '30 mins ago', createdAt: '2025-10-03' },
  { id: 'u5', name: 'Carlos Mendez', email: 'carlos@novafitness.com', role: 'client-user', clientId: 'c3', clientName: 'Nova Fitness Co.', status: 'active', lastActive: '2 days ago', createdAt: '2025-12-01' },
  { id: 'u6', name: 'Jennifer Park', email: 'jen@harborlegal.com', role: 'client-admin', clientId: 'c5', clientName: 'Harbor Legal LLP', status: 'active', lastActive: '5 hours ago', createdAt: '2025-09-10' },
  { id: 'u7', name: 'Tom Sunrise', email: 'info@sunriseauto.com', role: 'client-admin', clientId: 'c4', clientName: 'Sunrise Auto Group', status: 'inactive', lastActive: '1 week ago', createdAt: '2026-01-20' },
];

const PLATFORM_STATS = {
  totalClients: 6, activeClients: 4, totalUsers: 31, totalCallsToday: 47,
  totalCallsMonth: 1884, totalMinutesMonth: 3834, newClientsThisMonth: 2,
  avgCallDuration: 2.04,
};

const MONTHLY_GROWTH = [3, 3, 4, 4, 5, 5, 6];
const MONTHLY_CALLS  = [210, 180, 320, 290, 410, 380, 1884];
const MONTHS         = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

// ── Nav ───────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',  icon: LayoutDashboard, label: 'Overview' },
  { id: 'clients',   icon: Building2,       label: 'Clients' },
  { id: 'users',     icon: Users,           label: 'All Users' },
  { id: 'analytics', icon: BarChart3,       label: 'Analytics' },
  { id: 'health',    icon: Activity,        label: 'System Health' },
];

// ── Helpers ───────────────────────────────────────────────────────────────
const planColors = {
  Free:       'bg-gray-500/15 text-gray-400',
  Pro:        'bg-blue-500/15 text-blue-400',
  Enterprise: 'bg-purple-500/15 text-purple-400',
};
const statusColors = {
  active:   'bg-emerald-500/15 text-emerald-400',
  inactive: 'bg-red-500/15 text-red-400',
  pending:  'bg-amber-500/15 text-amber-400',
};
const roleColors = {
  'super-admin':  'bg-purple-500/15 text-purple-400',
  'client-admin': 'bg-blue-500/15 text-blue-400',
  'client-user':  'bg-gray-500/15 text-gray-400',
};

function MiniBar({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const colors: Record<string, string> = {
    blue: 'bg-blue-500', purple: 'bg-purple-500', emerald: 'bg-emerald-500', amber: 'bg-amber-500'
  };
  return (
    <div className="flex items-end gap-1 h-20">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end">
          <div className={`${colors[color]} rounded-t-sm opacity-80`}
            style={{ height: `${(v / max) * 100}%`, minHeight: v > 0 ? '4px' : '0' }} />
        </div>
      ))}
    </div>
  );
}

function PlatformStatCard({ title, value, sub, icon: Icon, trend, change, color }: {
  title: string; value: string; sub?: string; icon: any;
  trend?: 'up' | 'down'; change?: string; color: string;
}) {
  const colors: Record<string, string> = {
    blue:   'border-blue-500/25 text-blue-400 bg-blue-500/10',
    purple: 'border-purple-500/25 text-purple-400 bg-purple-500/10',
    emerald:'border-emerald-500/25 text-emerald-400 bg-emerald-500/10',
    amber:  'border-amber-500/25 text-amber-400 bg-amber-500/10',
  };
  return (
    <div className={`border ${colors[color].split(' ')[0]} bg-white/[0.03] rounded-2xl p-5`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${colors[color].split(' ')[2]} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${colors[color].split(' ')[1]}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-white mb-0.5">{value}</p>
      <p className="text-gray-400 text-sm">{title}</p>
      {sub && <p className="text-gray-600 text-xs mt-1">{sub}</p>}
    </div>
  );
}

// ── Edit Client Modal ─────────────────────────────────────────────────────
interface EditClientForm {
  clientName: string;
  industry: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  status: 'active' | 'inactive' | 'pending';
  adminEmail: string;
  sheetId: string;
}

function EditClientModal({ client, onClose, onSaved }: {
  client: Client;
  onClose: () => void;
  onSaved: (updated: Partial<Client>) => void;
}) {
  const { getAccessToken } = useAuth();
  const [form, setForm] = useState<EditClientForm>({
    clientName: client.name,
    industry: client.industry,
    plan: client.plan,
    status: client.status,
    adminEmail: client.adminEmail,
    sheetId: client.sheetId || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const token = getAccessToken();
      const res = await fetch(`${API_BASE_URL}/admin/clients/${client.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: form.clientName,
          industry: form.industry,
          plan: form.plan,
          status: form.status,
          adminEmail: form.adminEmail,
          dataSource: { sheetId: form.sheetId },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server returned ${res.status}`);
      }

      setSuccess(true);
      onSaved({
        name: form.clientName,
        industry: form.industry,
        plan: form.plan,
        status: form.status,
        adminEmail: form.adminEmail,
        sheetId: form.sheetId,
      });
      setTimeout(onClose, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const field = (
    label: string,
    key: keyof EditClientForm,
    type: 'text' | 'email' = 'text',
    hint?: string
  ) => (
    <div>
      <label className="text-gray-400 text-sm mb-1.5 block">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"
      />
      {hint && <p className="text-gray-600 text-xs mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#080d1e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              {client.name[0]}
            </div>
            <div>
              <h3 className="text-white font-semibold">Edit Configuration</h3>
              <p className="text-gray-500 text-xs">{client.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-xl hover:bg-white/[0.05] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {field('Company Name', 'clientName')}
          {field('Industry', 'industry')}
          {field('Admin Email', 'adminEmail', 'email')}

          {/* Google Sheet ID — highlighted */}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Google Sheet ID</label>
            <div className="relative">
              <input
                type="text"
                value={form.sheetId}
                onChange={e => setForm(f => ({ ...f, sheetId: e.target.value }))}
                placeholder="1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M"
                className="w-full bg-blue-500/[0.08] border border-blue-500/30 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/70 placeholder-gray-600 transition-colors font-mono"
              />
            </div>
            <p className="text-gray-600 text-xs mt-1">
              Found in the Google Sheets URL: /spreadsheets/d/<span className="text-blue-500">SHEET_ID</span>/edit
            </p>
          </div>

          {/* Plan */}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Plan</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Free', 'Pro', 'Enterprise'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setForm(f => ({ ...f, plan: p }))}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                    form.plan === p
                      ? p === 'Free' ? 'bg-gray-600 text-white'
                        : p === 'Pro' ? 'bg-blue-600 text-white'
                        : 'bg-purple-600 text-white'
                      : 'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Status</label>
            <div className="grid grid-cols-3 gap-2">
              {(['active', 'inactive', 'pending'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setForm(f => ({ ...f, status: s }))}
                  className={`py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                    form.status === s
                      ? s === 'active' ? 'bg-emerald-600 text-white'
                        : s === 'inactive' ? 'bg-red-600 text-white'
                        : 'bg-amber-600 text-white'
                      : 'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
              <AlertCircle size={15} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-3">
              <CheckCircle size={15} className="text-emerald-400 shrink-0" />
              <p className="text-emerald-400 text-sm">Saved successfully!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-white/[0.08]">
          <button
            onClick={handleSave}
            disabled={saving || success}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-medium transition-colors"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'Saving…' : success ? 'Saved!' : 'Save Changes'}
          </button>
          <button
            onClick={onClose}
            className="px-5 bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 rounded-xl text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Client Detail Side Panel ─────────────────────────────────────────────
function ClientDetailPanel({ client, onClose, onEdit, onToggleStatus, toggling }: {
  client: Client;
  onClose: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
  toggling: boolean;
}) {
  const users = MOCK_USERS.filter(u => u.clientId === client.id);
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="w-[520px] bg-[#080d1e] border-l border-white/[0.08] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
              {client.name[0]}
            </div>
            <div>
              <h3 className="text-white font-semibold">{client.name}</h3>
              <p className="text-gray-500 text-xs">{client.industry}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-xl hover:bg-white/[0.05] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total Calls', value: client.totalCalls },
              { label: 'Minutes', value: client.totalMinutes },
              { label: 'Users', value: client.userCount },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/[0.04] rounded-xl p-3 text-center">
                <p className="text-white text-xl font-bold">{value}</p>
                <p className="text-gray-500 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Details</h4>
            {[
              { label: 'Admin Email', value: client.adminEmail },
              { label: 'Plan', value: client.plan },
              { label: 'Status', value: client.status },
              { label: 'Created', value: client.createdAt },
              { label: 'Sheet ID', value: client.sheetId || 'Not configured' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                <span className="text-gray-500 text-sm">{label}</span>
                <span className="text-gray-200 text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* Users */}
          <div>
            <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">Users ({users.length})</h4>
            <div className="space-y-2">
              {users.length === 0 ? (
                <p className="text-gray-600 text-sm">No users found for this client.</p>
              ) : users.map(u => (
                <div key={u.id} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600/60 to-purple-600/60 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {u.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{u.name}</p>
                    <p className="text-gray-500 text-xs truncate">{u.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[u.role]}`}>
                    {u.role === 'client-admin' ? 'Admin' : 'User'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">Actions</h4>
            <button onClick={onEdit}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600/15 border border-blue-500/25 rounded-xl text-blue-400 text-sm hover:bg-blue-600/25 transition-colors">
              <Edit2 size={15} /> Edit Configuration
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-gray-300 text-sm hover:bg-white/[0.06] transition-colors">
              <Plus size={15} /> Add User to Client
            </button>
            <button
              onClick={onToggleStatus}
              disabled={toggling}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors disabled:opacity-60 ${
                client.status === 'active'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15'
                  : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15'
              }`}
            >
              {toggling
                ? <Loader2 size={15} className="animate-spin" />
                : client.status === 'active' ? <XCircle size={15} /> : <CheckCircle size={15} />
              }
              {toggling ? 'Updating…' : client.status === 'active' ? 'Deactivate Client' : 'Activate Client'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Overview Tab ─────────────────────────────────────────────────────────
function OverviewTab({ userName }: { userName: string }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const recentActivity = [
    { action: 'New client signed up', subject: 'Sunrise Auto Group', time: '2 hours ago', icon: Building2, color: 'text-blue-400' },
    { action: 'User invited', subject: 'nova_user@novafitness.com', time: '4 hours ago', icon: Users, color: 'text-purple-400' },
    { action: 'Config updated', subject: 'Tremo Management', time: '6 hours ago', icon: Settings, color: 'text-amber-400' },
    { action: 'New client signed up', subject: 'Bloom Florist', time: '1 day ago', icon: Building2, color: 'text-blue-400' },
    { action: 'Plan upgraded', subject: 'Harbor Legal LLP → Enterprise', time: '3 days ago', icon: Award, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">
          {greeting}, <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">{userName.split(' ')[0]}</span>
        </h1>
        <p className="text-gray-400">Here's your platform overview for today.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <PlatformStatCard title="Total Clients" value={PLATFORM_STATS.totalClients.toString()} sub={`${PLATFORM_STATS.activeClients} active`} icon={Building2} trend="up" change="+2 this month" color="blue" />
        <PlatformStatCard title="Total Users" value={PLATFORM_STATS.totalUsers.toString()} sub="across all clients" icon={Users} trend="up" change="+5 this month" color="purple" />
        <PlatformStatCard title="Calls Today" value={PLATFORM_STATS.totalCallsToday.toString()} sub="across all agents" icon={Phone} trend="up" change="+18%" color="emerald" />
        <PlatformStatCard title="Calls This Month" value={PLATFORM_STATS.totalCallsMonth.toLocaleString()} sub={`${PLATFORM_STATS.totalMinutesMonth.toLocaleString()} minutes`} icon={TrendingUp} trend="up" change="+24%" color="amber" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client growth */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Platform Client Growth</h3>
              <p className="text-gray-500 text-sm mt-0.5">Total clients over time</p>
            </div>
            <span className="text-emerald-400 text-sm bg-emerald-500/10 px-2.5 py-1 rounded-full">+{MOCK_CLIENTS.length} total</span>
          </div>
          <MiniBar data={MONTHLY_GROWTH} color="blue" />
          <div className="flex justify-between mt-2">
            {MONTHS.map(m => <span key={m} className="text-gray-600 text-xs flex-1 text-center">{m}</span>)}
          </div>
        </div>

        {/* Call volume */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Platform Call Volume</h3>
              <p className="text-gray-500 text-sm mt-0.5">Total calls per month</p>
            </div>
            <span className="text-blue-400 text-sm bg-blue-500/10 px-2.5 py-1 rounded-full">All agents</span>
          </div>
          <MiniBar data={MONTHLY_CALLS} color="purple" />
          <div className="flex justify-between mt-2">
            {MONTHS.map(m => <span key={m} className="text-gray-600 text-xs flex-1 text-center">{m}</span>)}
          </div>
        </div>
      </div>

      {/* Recent activity + top clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Recent Platform Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className={`w-8 h-8 bg-white/[0.05] rounded-lg flex items-center justify-center ${a.color}`}>
                  <a.icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{a.action}</p>
                  <p className="text-gray-500 text-xs truncate">{a.subject}</p>
                </div>
                <span className="text-gray-600 text-xs shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top clients by usage */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Top Clients by Usage</h3>
          <div className="space-y-3">
            {[...MOCK_CLIENTS]
              .sort((a, b) => b.totalCalls - a.totalCalls)
              .slice(0, 5)
              .map((c, i) => {
                const max = MOCK_CLIENTS.reduce((m, cl) => Math.max(m, cl.totalCalls), 1);
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="text-gray-600 text-xs w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1.5">
                        <span className="text-gray-300 text-sm truncate">{c.name}</span>
                        <span className="text-white text-sm font-medium ml-2 shrink-0">{c.totalCalls}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${(c.totalCalls / max) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Add Client Modal ──────────────────────────────────────────────────────
function AddClientModal({ onClose, onCreated }: {
  onClose: () => void;
  onCreated: (client: Client) => void;
}) {
  const { getAccessToken } = useAuth();
  const [form, setForm] = useState({
    clientName: '',
    industry: '',
    adminEmail: '',
    plan: 'Pro' as 'Free' | 'Pro' | 'Enterprise',
    sheetId: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!form.clientName || !form.industry || !form.adminEmail) {
      setError('Company name, industry and admin email are required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const token = getAccessToken();
      const res = await fetch(`${API_BASE_URL}/admin/clients`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: form.clientName,
          industry: form.industry,
          adminEmail: form.adminEmail,
          plan: form.plan,
          status: 'active',
          dataSource: { sheetId: form.sheetId },
          userCount: 0,
          totalCalls: 0,
          totalMinutes: 0,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server returned ${res.status}`);
      }
      const created = await res.json();
      // Map DynamoDB response to Client shape
      onCreated({
        id: created.clientId,
        name: created.clientName || form.clientName,
        industry: created.industry || form.industry,
        plan: created.plan || form.plan,
        status: created.status || 'active',
        adminEmail: created.adminEmail || form.adminEmail,
        sheetId: created.dataSource?.sheetId || form.sheetId,
        userCount: 0,
        totalCalls: 0,
        totalMinutes: 0,
        createdAt: created.createdAt || new Date().toISOString().split('T')[0],
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create client. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#080d1e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Plus size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Add New Client</h3>
              <p className="text-gray-500 text-xs">Creates a new client account on the platform</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-xl hover:bg-white/[0.05] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Company Name */}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Company Name <span className="text-red-400">*</span></label>
            <input
              type="text"
              placeholder="e.g. Apex Dental Clinic"
              value={form.clientName}
              onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Industry <span className="text-red-400">*</span></label>
            <input
              type="text"
              placeholder="e.g. Healthcare, Beauty & Wellness, Legal Services"
              value={form.industry}
              onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"
            />
          </div>

          {/* Admin Email */}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Admin Email <span className="text-red-400">*</span></label>
            <input
              type="email"
              placeholder="admin@theirclinic.com"
              value={form.adminEmail}
              onChange={e => setForm(f => ({ ...f, adminEmail: e.target.value }))}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"
            />
          </div>

          {/* Google Sheet ID */}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Google Sheet ID <span className="text-gray-600">(optional — can be added later)</span></label>
            <input
              type="text"
              placeholder="1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M"
              value={form.sheetId}
              onChange={e => setForm(f => ({ ...f, sheetId: e.target.value }))}
              className="w-full bg-blue-500/[0.06] border border-blue-500/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors font-mono"
            />
            <p className="text-gray-600 text-xs mt-1">Found in the Sheets URL: /spreadsheets/d/<span className="text-blue-500">SHEET_ID</span>/edit</p>
          </div>

          {/* Plan */}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Plan</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Free', 'Pro', 'Enterprise'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setForm(f => ({ ...f, plan: p }))}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                    form.plan === p
                      ? p === 'Free' ? 'bg-gray-600 text-white'
                        : p === 'Pro' ? 'bg-blue-600 text-white'
                        : 'bg-purple-600 text-white'
                      : 'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3">
              <AlertCircle size={15} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-white/[0.08]">
          <button
            onClick={handleCreate}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-medium transition-colors"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
            {saving ? 'Creating…' : 'Create Client'}
          </button>
          <button onClick={onClose} className="px-5 bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 rounded-xl text-sm transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Clients Tab ───────────────────────────────────────────────────────────
function ClientsTab() {
  const { getAccessToken } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // ── Load real clients from API on mount ──────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoadingClients(true);
      try {
        const token = getAccessToken();
        const res = await fetch(`${API_BASE_URL}/admin/clients`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const items = await res.json();
        // Map DynamoDB fields to Client shape
        const mapped: Client[] = (items || []).map((item: any) => ({
          id: item.clientId,
          name: item.clientName || item.name || '—',
          industry: item.industry || '—',
          plan: item.plan || 'Free',
          status: item.status || 'active',
          adminEmail: item.adminEmail || '—',
          sheetId: item.dataSource?.sheetId || '',
          userCount: item.userCount || 0,
          totalCalls: item.totalCalls || 0,
          totalMinutes: item.totalMinutes || 0,
          createdAt: item.createdAt?.split('T')[0] || '—',
        }));
        setClients(mapped);
      } catch (err) {
        console.error('Failed to load clients:', err);
        // Fall back to empty — no mock data
        setClients([]);
      } finally {
        setLoadingClients(false);
      }
    };
    load();
  }, [getAccessToken]);

  // ── Update client in state + close panels ────────────────────────────────
  const handleSaved = (clientId: string, updated: Partial<Client>) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, ...updated } : c));
    setSelectedClient(prev => prev?.id === clientId ? { ...prev, ...updated } : prev);
  };

  // ── Toggle active/inactive ────────────────────────────────────────────────
  const handleToggleStatus = async (client: Client) => {
    const newStatus = client.status === 'active' ? 'inactive' : 'active';
    setTogglingId(client.id);
    try {
      const token = getAccessToken();
      const res = await fetch(`${API_BASE_URL}/admin/clients/${client.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      handleSaved(client.id, { status: newStatus });
    } catch (err) {
      console.error('Failed to toggle status:', err);
    } finally {
      setTogglingId(null);
    }
  };

  const filtered = useMemo(() =>
    clients.filter(c => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || c.status === filter;
      return matchSearch && matchFilter;
    }),
    [clients, search, filter]
  );

  return (
    <div className="space-y-6">
      {/* Modals */}
      {selectedClient && (
        <ClientDetailPanel
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onEdit={() => setEditingClient(selectedClient)}
          onToggleStatus={() => handleToggleStatus(selectedClient)}
          toggling={togglingId === selectedClient.id}
        />
      )}
      {editingClient && (
        <EditClientModal
          client={editingClient}
          onClose={() => setEditingClient(null)}
          onSaved={(updated) => handleSaved(editingClient.id, updated)}
        />
      )}
      {showAddModal && (
        <AddClientModal
          onClose={() => setShowAddModal(false)}
          onCreated={(newClient) => setClients(prev => [newClient, ...prev])}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Clients</h2>
          <p className="text-gray-400 mt-1">All companies using the Sentria platform</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={15} /> Add Client
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', count: clients.length, color: 'text-white' },
          { label: 'Active', count: clients.filter(c => c.status === 'active').length, color: 'text-emerald-400' },
          { label: 'Pending', count: clients.filter(c => c.status === 'pending').length, color: 'text-amber-400' },
          { label: 'Inactive', count: clients.filter(c => c.status === 'inactive').length, color: 'text-red-400' },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{count}</p>
            <p className="text-gray-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 flex-1 min-w-56">
          <Search size={14} className="text-gray-500" />
          <input type="text" placeholder="Search clients…" value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-600" />
        </div>
        {(['all', 'active', 'pending', 'inactive'] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              filter === s ? 'bg-blue-600 text-white' : 'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'
            }`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3.5 border-b border-white/[0.06]">
          {['Company', 'Industry', 'Plan', 'Status', 'Created', ''].map(h => (
            <span key={h} className="text-gray-500 text-xs font-medium uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {loadingClients ? (
          <div className="flex items-center justify-center gap-3 py-16 text-gray-500">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Loading clients from database…</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Building2 size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No clients found</p>
            <p className="text-gray-600 text-xs mt-1">
              {clients.length === 0 ? 'Add your first client using the button above.' : 'Try adjusting your search or filter.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map(c => (
              <div key={c.id} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600/60 to-purple-600/60 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {c.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{c.name}</p>
                    <p className="text-gray-500 text-xs truncate">{c.adminEmail}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm truncate">{c.industry}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${planColors[c.plan]}`}>{c.plan}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${statusColors[c.status]}`}>{c.status}</span>
                <span className="text-gray-500 text-xs">{c.createdAt}</span>
                <button onClick={() => setSelectedClient(c)}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/15 px-3 py-1.5 rounded-lg transition-colors">
                  <Eye size={12} /> View
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="px-5 py-3.5 border-t border-white/[0.06] text-gray-500 text-sm">
          {loadingClients ? 'Loading…' : `Showing ${filtered.length} of ${clients.length} clients`}
        </div>
      </div>
    </div>
  );
}

// ── All Users Tab ─────────────────────────────────────────────────────────
function AllUsersTab() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users, setUsers] = useState(MOCK_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'client-admin' | 'client-user'>('client-user');
  const [newClient, setNewClient] = useState('c1');

  const filtered = useMemo(() =>
    users.filter(u => {
      const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      return matchSearch && matchRole;
    }),
    [users, search, roleFilter]
  );

  const handleCreate = () => {
    if (!newName || !newEmail) return;
    const client = MOCK_CLIENTS.find(c => c.id === newClient);
    const u: PlatformUser = {
      id: Date.now().toString(), name: newName, email: newEmail, role: newRole,
      clientId: newClient, clientName: client?.name || '—', status: 'active',
      lastActive: 'Just added', createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, u]);
    setNewName(''); setNewEmail(''); setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">All Users</h2>
          <p className="text-gray-400 mt-1">Every user across the entire Sentria platform</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={15} /> Create User
        </button>
      </div>

      {/* Add user form */}
      {showAdd && (
        <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Create New User</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Full Name</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Jane Smith"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Email</label>
              <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="jane@company.com"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Role</label>
              <select value={newRole} onChange={e => setNewRole(e.target.value as any)}
                className="w-full bg-[#0d1428] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60">
                <option value="client-user">Client User</option>
                <option value="client-admin">Client Admin</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Assign to Client</label>
              <select value={newClient} onChange={e => setNewClient(e.target.value)}
                className="w-full bg-[#0d1428] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60">
                {MOCK_CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">Create User</button>
            <button onClick={() => setShowAdd(false)} className="bg-white/[0.05] text-gray-300 px-5 py-2.5 rounded-xl text-sm transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', count: users.length, color: 'text-white' },
          { label: 'Super Admins', count: users.filter(u => u.role === 'super-admin').length, color: 'text-purple-400' },
          { label: 'Client Admins', count: users.filter(u => u.role === 'client-admin').length, color: 'text-blue-400' },
          { label: 'Client Users', count: users.filter(u => u.role === 'client-user').length, color: 'text-gray-300' },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${color}`}>{count}</p>
            <p className="text-gray-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 flex-1">
          <Search size={14} className="text-gray-500" />
          <input type="text" placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-600" />
        </div>
        {['all', 'super-admin', 'client-admin', 'client-user'].map(r => (
          <button key={r} onClick={() => setRoleFilter(r)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              roleFilter === r ? 'bg-blue-600 text-white' : 'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'
            }`}>
            {r === 'all' ? 'All' : r.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_auto] gap-4 px-5 py-3.5 border-b border-white/[0.06]">
          {['User', 'Client', 'Role', 'Last Active', 'Status', ''].map(h => (
            <span key={h} className="text-gray-500 text-xs font-medium uppercase tracking-wide">{h}</span>
          ))}
        </div>
        <div className="divide-y divide-white/[0.04]">
          {filtered.map(u => (
            <div key={u.id} className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600/60 to-purple-600/60 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {u.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{u.name}</p>
                  <p className="text-gray-500 text-xs truncate">{u.email}</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm truncate">{u.clientName}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${roleColors[u.role]}`}>
                {u.role.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
              </span>
              <span className="text-gray-500 text-sm">{u.lastActive}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${statusColors[u.status]}`}>{u.status}</span>
              <button onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))}
                className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="px-5 py-3.5 border-t border-white/[0.06] text-gray-500 text-sm">
          Showing {filtered.length} of {users.length} users
        </div>
      </div>
    </div>
  );
}

// ── Analytics Tab ─────────────────────────────────────────────────────────
function AnalyticsTab() {
  const totalCalls = MOCK_CLIENTS.reduce((s, c) => s + c.totalCalls, 0);
  const totalMinutes = MOCK_CLIENTS.reduce((s, c) => s + c.totalMinutes, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Analytics</h2>
        <p className="text-gray-400 mt-1">Platform-wide performance overview — live data connections coming soon</p>
      </div>

      {/* Platform totals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <PlatformStatCard title="Total Calls (All Time)" value={totalCalls.toLocaleString()} icon={Phone} color="blue" />
        <PlatformStatCard title="Total Minutes" value={totalMinutes.toLocaleString()} icon={Clock} color="purple" />
        <PlatformStatCard title="Active Clients" value={MOCK_CLIENTS.filter(c => c.status === 'active').length.toString()} icon={Building2} color="emerald" />
        <PlatformStatCard title="Avg Calls / Client" value={(totalCalls / Math.max(MOCK_CLIENTS.length, 1)).toFixed(0)} icon={BarChart3} color="amber" />
      </div>

      {/* Monthly trend */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold">Monthly Call Volume Trend</h3>
            <p className="text-gray-500 text-sm mt-0.5">Across all clients — placeholder data, real connections coming soon</p>
          </div>
          <span className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">Placeholder data</span>
        </div>
        <MiniBar data={MONTHLY_CALLS} color="blue" />
        <div className="flex justify-between mt-2">
          {MONTHS.map(m => <span key={m} className="text-gray-600 text-xs flex-1 text-center">{m}</span>)}
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {MONTHLY_CALLS.map((v, i) => (
            <div key={i} className="text-center">
              <p className="text-white text-sm font-medium">{v}</p>
              <p className="text-gray-600 text-xs">{MONTHS[i]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Client breakdown table */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Per-Client Usage Breakdown</h3>
        <div className="space-y-3">
          {[...MOCK_CLIENTS].sort((a, b) => b.totalCalls - a.totalCalls).map(c => (
            <div key={c.id} className="flex items-center gap-4 py-2">
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1.5">
                  <span className="text-gray-300 text-sm">{c.name}</span>
                  <span className="text-white text-sm font-medium">{c.totalCalls} calls · {c.totalMinutes} min</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${(c.totalCalls / totalCalls) * 100}%` }} />
                </div>
              </div>
              <span className="text-gray-500 text-xs w-10 text-right">{totalCalls > 0 ? ((c.totalCalls / totalCalls) * 100).toFixed(0) : 0}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Industry breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Clients by Industry</h3>
          {(() => {
            const byIndustry: Record<string, number> = {};
            MOCK_CLIENTS.forEach(c => { byIndustry[c.industry] = (byIndustry[c.industry] || 0) + 1; });
            const colors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500'];
            return (
              <div className="space-y-3">
                {Object.entries(byIndustry).map(([ind, count], i) => (
                  <div key={ind} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${colors[i % colors.length]} shrink-0`} />
                    <span className="text-gray-400 text-sm flex-1">{ind}</span>
                    <span className="text-white text-sm font-medium">{count}</span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Plan Distribution</h3>
          {(['Free', 'Pro', 'Enterprise'] as const).map(plan => {
            const count = MOCK_CLIENTS.filter(c => c.plan === plan).length;
            return (
              <div key={plan} className="mb-4">
                <div className="flex justify-between mb-1.5 text-sm">
                  <span className={`${planColors[plan].split(' ')[1]}`}>{plan}</span>
                  <span className="text-white font-medium">{count} clients</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${plan === 'Free' ? 'bg-gray-500' : plan === 'Pro' ? 'bg-blue-500' : 'bg-purple-500'}`}
                    style={{ width: `${(count / MOCK_CLIENTS.length) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── System Health Tab ─────────────────────────────────────────────────────
function SystemHealthTab() {
  const services = [
    { name: 'AWS Cognito', status: 'operational', latency: '42ms', uptime: '99.98%', icon: Shield, color: 'emerald' },
    { name: 'API Gateway', status: 'operational', latency: '87ms', uptime: '99.95%', icon: Globe, color: 'emerald' },
    { name: 'DynamoDB', status: 'operational', latency: '12ms', uptime: '99.99%', icon: Database, color: 'emerald' },
    { name: 'Lambda Functions', status: 'operational', latency: '230ms', uptime: '99.91%', icon: Zap, color: 'emerald' },
    { name: 'Google Sheets API', status: 'degraded', latency: '1200ms', uptime: '97.4%', icon: Activity, color: 'amber' },
    { name: 'Vercel CDN', status: 'operational', latency: '18ms', uptime: '100%', icon: Server, color: 'emerald' },
  ];

  const allOperational = services.filter(s => s.status === 'operational').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">System Health</h2>
        <p className="text-gray-400 mt-1">Real-time status of all platform services — placeholder data for now</p>
      </div>

      {/* Overall status banner */}
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border ${
        allOperational === services.length
          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
          : 'bg-amber-500/10 border-amber-500/25 text-amber-400'
      }`}>
        {allOperational === services.length ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
        <div>
          <p className="font-semibold">{allOperational === services.length ? 'All Systems Operational' : 'Minor Degradation Detected'}</p>
          <p className="text-sm opacity-80 mt-0.5">{allOperational} of {services.length} services fully operational</p>
        </div>
        <div className="ml-auto text-sm opacity-70">Last checked: just now</div>
      </div>

      {/* Service cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {services.map(svc => (
          <div key={svc.name} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-11 h-11 ${svc.color === 'emerald' ? 'bg-emerald-500/10' : 'bg-amber-500/10'} rounded-xl flex items-center justify-center shrink-0`}>
              <svc.icon className={`w-5 h-5 ${svc.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-medium text-sm">{svc.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  svc.status === 'operational' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                }`}>
                  {svc.status}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Latency: <span className="text-gray-300">{svc.latency}</span></span>
                <span>Uptime: <span className="text-gray-300">{svc.uptime}</span></span>
              </div>
            </div>
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${svc.status === 'operational' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-amber-500 shadow-lg shadow-amber-500/50'}`} />
          </div>
        ))}
      </div>

      {/* Error rate chart placeholder */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold">Error Rate — Last 7 Days</h3>
            <p className="text-gray-500 text-sm mt-0.5">API errors across all Lambda functions</p>
          </div>
          <span className="text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">Placeholder data</span>
        </div>
        <MiniBar data={[2, 1, 0, 3, 1, 0, 1]} color="amber" />
        <div className="flex justify-between mt-2">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
            <span key={d} className="text-gray-600 text-xs flex-1 text-center">{d}</span>
          ))}
        </div>
        <p className="text-gray-600 text-xs mt-3">Real error data will be pulled from CloudWatch when connected.</p>
      </div>

      {/* Recent incidents */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Recent Incidents</h3>
        <div className="space-y-3">
          {[
            { title: 'Google Sheets API slow response', severity: 'minor', time: '2 hours ago', status: 'ongoing' },
            { title: 'DynamoDB cold start latency spike', severity: 'minor', time: '3 days ago', status: 'resolved' },
            { title: 'Cognito authorizer timeout (1 request)', severity: 'minor', time: '1 week ago', status: 'resolved' },
          ].map((inc, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white/[0.02] rounded-xl">
              <AlertCircle className={`w-4 h-4 shrink-0 ${inc.status === 'ongoing' ? 'text-amber-400' : 'text-gray-500'}`} />
              <div className="flex-1">
                <p className="text-white text-sm">{inc.title}</p>
                <p className="text-gray-500 text-xs">{inc.time}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                inc.status === 'ongoing' ? 'bg-amber-500/15 text-amber-400' : 'bg-gray-500/15 text-gray-400'
              }`}>
                {inc.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Super Admin Dashboard ─────────────────────────────────────────────
interface SuperAdminDashboardProps {
  userEmail: string;
  userName: string;
  onLogout: () => void;
}

export function SuperAdminDashboard({ userEmail, userName, onLogout }: SuperAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

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
                <linearGradient id="saGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4d5ed" />
                  <stop offset="50%" stopColor="#5b5fa8" />
                  <stop offset="100%" stopColor="#1a2570" />
                </linearGradient>
              </defs>
              <text x="240" y="75" fontFamily="Arial, sans-serif" fontSize="72" fontWeight="700"
                textAnchor="middle" letterSpacing="3" fill="url(#saGrad)">SENTRIA</text>
            </svg>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <Shield size={12} className="text-purple-400" />
            <span className="text-xs text-purple-400 font-medium">Super Admin</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/15 text-white border border-purple-500/25 shadow-lg shadow-purple-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}>
              <Icon className={`${activeTab === id ? 'text-purple-400' : ''}`} size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {getInitials(userName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-white text-xs font-medium truncate">{userName}</p>
                <Shield size={10} className="text-purple-400 shrink-0" />
              </div>
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
            <Shield size={14} className="text-purple-400" />
            <span className="text-purple-400 font-medium">Super Admin</span>
            <ChevronRight size={14} />
            <span className="text-white capitalize">{NAV.find(n => n.id === activeTab)?.label}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2">
              <Search size={14} className="text-gray-500" />
              <input placeholder="Search platform…" className="bg-transparent text-white text-sm outline-none placeholder-gray-600 w-44" />
            </div>
            <button className="relative p-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-gray-400 hover:text-white transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8">
          {activeTab === 'overview'  && <OverviewTab userName={userName} />}
          {activeTab === 'clients'   && <ClientsTab />}
          {activeTab === 'users'     && <AllUsersTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'health'    && <SystemHealthTab />}
        </div>
      </main>

      {/* Ambient glows */}
      <div className="fixed top-0 left-64 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  );
}
