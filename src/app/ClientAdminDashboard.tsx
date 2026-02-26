// ============================================================
// SENTRIA — Client Admin Dashboard
// Fetches real data from Google Sheets via sentria-getSheetData Lambda
// Shows: stats, appointments table, patients table
// ============================================================

import { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard, Users, Calendar, LogOut, ChevronRight,
  Search, RefreshCw, AlertCircle, Flag, Stethoscope,
  Activity, ClipboardList
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { API_BASE_URL } from '../auth/cognitoConfig';

// ── Types ─────────────────────────────────────────────────────────────────
interface Appointment {
  id?: string; date?: string; time?: string; duration?: string;
  doctor?: string; type?: string; status?: string;
  patientId?: string; patientName?: string;
  _raw?: Record<string, string>;
}

interface Patient {
  id?: string; firstName?: string; lastName?: string;
  dob?: string; phone?: string; email?: string;
  lastVisit?: string; flag?: string;
  _raw?: Record<string, string>;
}

interface SheetStats {
  // Lambda returns these names
  totalPrimary: number; totalSecondary: number;
  primaryToday: number; primaryThisWeek: number;
  primaryThisMonth: number; upcomingCount: number;
  flaggedSecondary: number;
  byStatus: Record<string, number>;
  byDoctor: Record<string, number>;
  byType: Record<string, number>;
  // Legacy fallback names
  totalPatients?: number; totalAppointments?: number;
  appointmentsToday?: number; appointmentsThisWeek?: number;
  flaggedPatients?: number;
}

interface SheetData {
  clientId: string; clientName: string;
  stats: SheetStats;
  primary: Appointment[];
  secondary: Patient[];
  tabLabels: { primary: string; secondary: string | null };
  // Legacy fallbacks
  appointments?: Appointment[];
  patients?: Patient[];
}

// ── Nav (dynamic labels from sheet config) ───────────────────────────────
function buildNav(tabLabels?: { primary: string; secondary: string | null }) {
  return [
    { id: 'overview',   icon: LayoutDashboard, label: 'Overview' },
    { id: 'primary',    icon: Calendar,         label: tabLabels?.primary   || 'Records' },
    { id: 'secondary',  icon: Users,            label: tabLabels?.secondary || 'Contacts' },
  ];
}

// ── Helpers ───────────────────────────────────────────────────────────────
function statusColor(s: string) {
  const v = (s||'').toLowerCase();
  if (['confirmed','complete','completed'].includes(v)) return 'bg-emerald-500/15 text-emerald-400';
  if (['cancelled','canceled','no-show','no show'].includes(v)) return 'bg-red-500/15 text-red-400';
  if (['pending','scheduled'].includes(v)) return 'bg-amber-500/15 text-amber-400';
  return 'bg-gray-500/15 text-gray-400';
}

function StatCard({ title, value, sub, icon: Icon, color }: {
  title: string; value: string|number; sub?: string; icon: any; color: string;
}) {
  const map: Record<string,string> = {
    blue:    'border-blue-500/25 text-blue-400 bg-blue-500/10',
    purple:  'border-purple-500/25 text-purple-400 bg-purple-500/10',
    emerald: 'border-emerald-500/25 text-emerald-400 bg-emerald-500/10',
    amber:   'border-amber-500/25 text-amber-400 bg-amber-500/10',
    red:     'border-red-500/25 text-red-400 bg-red-500/10',
  };
  const [border, text, bg] = map[color].split(' ');
  return (
    <div className={`border ${border} bg-white/[0.03] rounded-2xl p-5`}>
      <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${text}`}/>
      </div>
      <p className="text-3xl font-bold text-white mb-0.5">{value}</p>
      <p className="text-gray-400 text-sm">{title}</p>
      {sub && <p className="text-gray-600 text-xs mt-1">{sub}</p>}
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────
function OverviewTab({ data, userName }: { data: SheetData; userName: string }) {
  const { stats } = data;
  const primary = data.primary || data.appointments || [];
  const today = new Date().toISOString().split('T')[0];
  const upcoming = primary.filter(a => (a.date||'') >= today).slice(0, 8);
  const topDoctors = Object.entries(stats.byDoctor).sort((a,b)=>b[1]-a[1]).slice(0, 5);
  const topTypes   = Object.entries(stats.byType).sort((a,b)=>b[1]-a[1]).slice(0, 5);
  const hour = new Date().getHours();
  const greeting = hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">
          {greeting}, <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">{userName.split(' ')[0]}</span>
        </h1>
        <p className="text-gray-400">{new Date().toLocaleDateString('en-CA', {weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title={`${data.tabLabels?.primary||'Records'} Today`}  value={stats.primaryToday ?? stats.appointmentsToday ?? 0}    icon={Calendar}    color="blue"/>
        <StatCard title="This Week"           value={stats.primaryThisWeek ?? stats.appointmentsThisWeek ?? 0} icon={Activity}    color="purple"/>
        <StatCard title={`Total ${data.tabLabels?.secondary||'Contacts'}`}  value={stats.totalSecondary ?? stats.totalPatients ?? 0}        icon={Users}       color="emerald"/>
        <StatCard title="Flagged"    value={stats.flaggedSecondary ?? stats.flaggedPatients ?? 0}      icon={Flag}        color={(stats.flaggedSecondary ?? stats.flaggedPatients ?? 0)>0?'red':'amber'}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming appointments */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h3 className="text-white font-semibold">Upcoming {data.tabLabels?.primary||'Records'}</h3>
            <span className="text-gray-500 text-xs">{stats.upcomingCount} total</span>
          </div>
          {upcoming.length === 0 ? (
            <div className="text-center py-10 text-gray-600 text-sm">No upcoming {data.tabLabels?.primary||'records'}</div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {upcoming.map((apt, i) => (
                <div key={apt.id||i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 px-5 py-3.5 items-center hover:bg-white/[0.02]">
                  <div>
                    <p className="text-white text-sm font-medium truncate">{apt.patientName||'—'}</p>
                    <p className="text-gray-500 text-xs">{apt.type||'—'}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">{apt.date||'—'}</p>
                    <p className="text-gray-500 text-xs">{apt.time||''}{apt.duration?` · ${apt.duration} min`:''}</p>
                  </div>
                  <p className="text-gray-400 text-sm truncate">{apt.doctor||'—'}</p>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${statusColor(apt.status||'')}`}>{apt.status||'—'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Breakdowns */}
        <div className="space-y-4">
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">By Status</h3>
            {Object.entries(stats.byStatus).length === 0 ? (
              <p className="text-gray-600 text-sm">No data</p>
            ) : (
              <div className="space-y-2.5">
                {Object.entries(stats.byStatus).sort((a,b)=>b[1]-a[1]).map(([s,n])=>(
                  <div key={s} className="flex items-center justify-between">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor(s)}`}>{s}</span>
                    <span className="text-white text-sm font-medium">{n}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">By Type</h3>
            {topTypes.length === 0 ? <p className="text-gray-600 text-sm">No data</p> : (
              <div className="space-y-2.5">
                {topTypes.map(([type,n])=>{
                  const pct = Math.round((n/(stats.totalPrimary||stats.totalAppointments||1))*100);
                  return (
                    <div key={type}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400 truncate pr-2">{type}</span>
                        <span className="text-white font-medium shrink-0">{n}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width:`${pct}%`}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Doctor breakdown */}
      {topDoctors.length > 0 && (
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4">Appointments by Doctor</h3>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {topDoctors.map(([doc,n])=>(
              <div key={doc} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                <div className="w-9 h-9 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Stethoscope size={16} className="text-blue-400"/>
                </div>
                <p className="text-white text-lg font-bold">{n}</p>
                <p className="text-gray-500 text-xs truncate mt-0.5">{doc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Appointments Tab ───────────────────────────────────────────────────────
function AppointmentsTab({ appointments, label = 'Records' }: { appointments: Appointment[]; label?: string }) {
  const [search, setSearch]   = useState('');
  const [statusF, setStatusF] = useState('all');
  const [doctorF, setDoctorF] = useState('all');
  const [view, setView]       = useState<'upcoming'|'all'>('upcoming');
  const today = new Date().toISOString().split('T')[0];

  const doctors  = useMemo(()=>['all',...Array.from(new Set(appointments.map(a=>a.doctor||'').filter(Boolean)))],[appointments]);
  const statuses = useMemo(()=>['all',...Array.from(new Set(appointments.map(a=>a.status||'').filter(Boolean)))],[appointments]);

  const filtered = useMemo(()=>{
    let list = view==='upcoming'
      ? appointments.filter(a=>(a.date||'')>=today).sort((a,b)=>`${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
      : [...appointments].sort((a,b)=>`${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(a=>(a.patientName||'').toLowerCase().includes(q)||(a.doctor||'').toLowerCase().includes(q)||(a.type||'').toLowerCase().includes(q)||(a.date||'').includes(q));
    }
    if (statusF!=='all') list = list.filter(a=>(a.status||'').toLowerCase()===statusF.toLowerCase());
    if (doctorF!=='all') list = list.filter(a=>a.doctor===doctorF);
    return list;
  },[appointments,search,statusF,doctorF,view,today]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">{label}</h2>
          <p className="text-gray-400 mt-1">{appointments.length} total records from Google Sheet</p>
        </div>
        <div className="flex gap-2">
          {(['upcoming','all'] as const).map(v=>(
            <button key={v} onClick={()=>setView(v)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${view===v?'bg-blue-600 text-white':'bg-white/[0.05] text-gray-400 hover:text-white'}`}>
              {v==='upcoming'?'Upcoming':'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 flex-1 min-w-48">
          <Search size={14} className="text-gray-500"/>
          <input placeholder="Search patient, doctor, type…" value={search} onChange={e=>setSearch(e.target.value)}
            className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-600"/>
        </div>
        <select value={statusF} onChange={e=>setStatusF(e.target.value)}
          className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm outline-none">
          {statuses.map(s=><option key={s} value={s} className="bg-[#0d1428]">{s==='all'?'All Statuses':s}</option>)}
        </select>
        <select value={doctorF} onChange={e=>setDoctorF(e.target.value)}
          className="bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm outline-none">
          {doctors.map(d=><option key={d} value={d} className="bg-[#0d1428]">{d==='all'?'All Doctors':d}</option>)}
        </select>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3.5 border-b border-white/[0.06]">
          {['Patient','Date','Doctor','Type','Status','Duration'].map(h=>(
            <span key={h} className="text-gray-500 text-xs font-medium uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {filtered.length===0 ? (
          <div className="text-center py-16"><Calendar size={32} className="text-gray-700 mx-auto mb-3"/><p className="text-gray-500 text-sm">No appointments match your filters</p></div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((apt,i)=>(
              <div key={apt.id||i} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 text-xs font-bold shrink-0">{(apt.patientName||'?')[0]}</div>
                  <span className="text-white text-sm truncate">{apt.patientName||'—'}</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">{apt.date||'—'}</p>
                  {apt.time && <p className="text-gray-500 text-xs">{apt.time}</p>}
                </div>
                <span className="text-gray-400 text-sm truncate">{apt.doctor||'—'}</span>
                <span className="text-gray-400 text-sm truncate">{apt.type||'—'}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${statusColor(apt.status||'')}`}>{apt.status||'—'}</span>
                <span className="text-gray-500 text-xs">{apt.duration?`${apt.duration} min`:'—'}</span>
              </div>
            ))}
          </div>
        )}
        <div className="px-5 py-3.5 border-t border-white/[0.06] text-gray-500 text-sm">
          Showing {filtered.length} of {appointments.length} appointments
        </div>
      </div>
    </div>
  );
}

// ── Patients Tab ───────────────────────────────────────────────────────────
function PatientsTab({ patients, label = 'Contacts' }: { patients: Patient[]; label?: string }) {
  const [search, setSearch]   = useState('');
  const [flagOnly, setFlagOnly] = useState(false);

  const filtered = useMemo(()=>{
    let list = patients;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p=>`${p.firstName||''} ${p.lastName||''}`.toLowerCase().includes(q)||(p.email||'').toLowerCase().includes(q)||(p.phone||'').includes(q)||(p.id||'').includes(q));
    }
    if (flagOnly) list = list.filter(p=>p.flag&&p.flag.trim()!=='');
    return list;
  },[patients,search,flagOnly]);

  const flaggedCount = patients.filter(p=>p.flag&&p.flag.trim()!=='').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">{label}</h2>
          <p className="text-gray-400 mt-1">{patients.length} {label.toLowerCase()} · {flaggedCount} flagged</p>
        </div>
        {flaggedCount > 0 && (
          <button onClick={()=>setFlagOnly(f=>!f)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${flagOnly?'bg-red-600 text-white':'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15'}`}>
            <Flag size={14}/> {flagOnly?'Show All':`Flagged (${flaggedCount})`}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5">
        <Search size={14} className="text-gray-500"/>
        <input placeholder="Search by name, email, phone, or ID…" value={search} onChange={e=>setSearch(e.target.value)}
          className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-600"/>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_auto] gap-4 px-5 py-3.5 border-b border-white/[0.06]">
          {['Patient','Phone','Email','Last Visit','DOB','Flag'].map(h=>(
            <span key={h} className="text-gray-500 text-xs font-medium uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {filtered.length===0 ? (
          <div className="text-center py-16"><Users size={32} className="text-gray-700 mx-auto mb-3"/><p className="text-gray-500 text-sm">No patients match your search</p></div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map((p,i)=>(
              <div key={p.id||i} className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600/50 to-purple-600/50 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">{(p.firstName||'?')[0]}</div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{p.firstName||''} {p.lastName||''}</p>
                    <p className="text-gray-500 text-xs">ID: {p.id||'—'}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm">{p.phone||'—'}</span>
                <span className="text-gray-400 text-sm truncate">{p.email||'—'}</span>
                <span className="text-gray-500 text-sm">{p.lastVisit||'—'}</span>
                <span className="text-gray-500 text-sm">{p.dob||'—'}</span>
                {p.flag&&p.flag.trim() ? (
                  <span className="flex items-center gap-1 text-xs bg-red-500/15 text-red-400 px-2.5 py-1 rounded-full font-medium w-fit"><Flag size={11}/>{p.flag}</span>
                ) : <span className="text-gray-700 text-xs">—</span>}
              </div>
            ))}
          </div>
        )}
        <div className="px-5 py-3.5 border-t border-white/[0.06] text-gray-500 text-sm">
          Showing {filtered.length} of {patients.length} patients
        </div>
      </div>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  const isSetup = message.includes('mapping')||message.includes('Sheet')||message.includes('configured');
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center max-w-md">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isSetup?'bg-amber-500/15':'bg-red-500/15'}`}>
          <AlertCircle size={28} className={isSetup?'text-amber-400':'text-red-400'}/>
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">{isSetup?'Setup Required':'Failed to Load Data'}</h3>
        <p className="text-gray-400 text-sm mb-4">{message}</p>
        {isSetup ? (
          <p className="text-gray-600 text-xs bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
            Contact your Sentria administrator to complete the Google Sheet configuration.
          </p>
        ) : (
          <button onClick={onRetry}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors mx-auto">
            <RefreshCw size={14}/> Try Again
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
interface ClientAdminDashboardProps {
  userEmail: string; userName: string; onLogout: () => void;
}

export function ClientAdminDashboard({ userEmail, userName, onLogout }: ClientAdminDashboardProps) {
  const { getIdToken } = useAuth();
  const [activeTab, setActiveTab]     = useState('overview');
  const [data, setData]               = useState<SheetData|null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string|null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date|null>(null);

  const loadData = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/client/sheet-data`, {
        headers: { Authorization: `Bearer ${getIdToken()}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error||`API ${res.status}`);
      setData(json);
      setLastRefresh(new Date());
    } catch(e:any) { setError(e.message||'Failed to load data.'); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ loadData(); },[]);

  const initials = userName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

  return (
    <div className="flex h-screen bg-[#070A12] overflow-hidden">
      <aside className="w-64 shrink-0 bg-[#060a1a] border-r border-white/[0.06] flex flex-col z-30 fixed left-0 top-0 h-screen">
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 480 120" className="w-40 h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="caGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4d5ed"/>
                <stop offset="50%" stopColor="#5b5fa8"/>
                <stop offset="100%" stopColor="#1a2570"/>
              </linearGradient></defs>
              <text x="240" y="75" fontFamily="Arial, sans-serif" fontSize="72" fontWeight="700" textAnchor="middle" letterSpacing="3" fill="url(#caGrad)">SENTRIA</text>
            </svg>
          </div>
          {data?.clientName && <p className="text-center text-gray-500 text-xs mt-1 truncate">{data.clientName}</p>}
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {buildNav(data?.tabLabels).map(({id,icon:Icon,label})=>(
            <button key={id} onClick={()=>setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab===id?'bg-gradient-to-r from-blue-600/20 to-purple-600/15 text-white border border-blue-500/25':'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}>
              <Icon className={activeTab===id?'text-blue-400':''} size={18}/>{label}
            </button>
          ))}
        </nav>

        {lastRefresh && (
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"/>
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 text-xs">Last synced</p>
                <p className="text-gray-400 text-xs">{lastRefresh.toLocaleTimeString()}</p>
              </div>
              <button onClick={loadData} disabled={loading} className="text-gray-600 hover:text-blue-400 transition-colors disabled:opacity-40">
                <RefreshCw size={13} className={loading?'animate-spin':''}/>
              </button>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{initials}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{userName}</p>
              <p className="text-gray-500 text-xs truncate">{userEmail}</p>
            </div>
            <button onClick={onLogout} className="text-gray-600 hover:text-red-400 transition-colors"><LogOut size={15}/></button>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 overflow-y-auto">
        <header className="sticky top-0 z-20 bg-[#070A12]/90 backdrop-blur-sm border-b border-white/[0.06] px-8 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <ClipboardList size={14} className="text-blue-400"/>
            <span className="text-blue-400 font-medium">{data?.clientName||'Dashboard'}</span>
            <ChevronRight size={14}/>
            <span className="text-white capitalize">{buildNav(data?.tabLabels).find(n=>n.id===activeTab)?.label}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {data && <span className="text-gray-500 text-xs">{data.stats.totalPrimary ?? data.stats.totalAppointments ?? 0} records · {data.stats.totalSecondary ?? data.stats.totalPatients ?? 0} contacts</span>}
            <button onClick={loadData} disabled={loading}
              className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors disabled:opacity-50">
              <RefreshCw size={14} className={loading?'animate-spin':''}/> Refresh
            </button>
          </div>
        </header>

        <div className="p-8">
          {loading && !data ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"/>
                <p className="text-gray-400 text-sm">Loading your data from Google Sheets…</p>
              </div>
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={loadData}/>
          ) : data ? (<>
            {activeTab==='overview'  && <OverviewTab  data={data} userName={userName}/>}
            {activeTab==='primary'   && <AppointmentsTab
              appointments={data.primary || data.appointments || []}
              label={data.tabLabels?.primary || 'Records'}/>}
            {activeTab==='secondary' && <PatientsTab
              patients={data.secondary || data.patients || []}
              label={data.tabLabels?.secondary || 'Contacts'}/>}
          </>) : null}
        </div>
      </main>

      <div className="fixed top-0 left-64 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none -z-10"/>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px] pointer-events-none -z-10"/>
    </div>
  );
}
