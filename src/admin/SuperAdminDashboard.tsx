// ============================================================
// SENTRIA — Super Admin Dashboard
// Full platform management: all clients, all users, analytics,
// system health.
// ============================================================

import { useState, useMemo, useEffect } from 'react';
import {
  LayoutDashboard, Building2, Users, BarChart3, Activity,
  LogOut, ChevronRight, Bell, Search, Plus, Edit2, Eye,
  Trash2, CheckCircle, XCircle, Clock, Phone, TrendingUp,
  ArrowUpRight, ArrowDownRight, Shield,
  Database, Server, Zap, Globe,
  AlertCircle, X,
  Save, Loader2
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { API_BASE_URL } from '../auth/cognitoConfig';

// ── Types ─────────────────────────────────────────────────────────────────
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

// ── Nav ───────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',  icon: LayoutDashboard, label: 'Overview' },
  { id: 'clients',   icon: Building2,       label: 'Clients' },
  { id: 'users',     icon: Users,           label: 'All Users' },
  { id: 'analytics', icon: BarChart3,       label: 'Analytics' },
  { id: 'health',    icon: Activity,        label: 'System Health' },
];

const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

// ── Colour maps ───────────────────────────────────────────────────────────
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

// ── Shared UI helpers ─────────────────────────────────────────────────────
function MiniBar({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  const c: Record<string, string> = { blue:'bg-blue-500', purple:'bg-purple-500', emerald:'bg-emerald-500', amber:'bg-amber-500' };
  return (
    <div className="flex items-end gap-1 h-20">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end">
          <div className={`${c[color]} rounded-t-sm opacity-80`} style={{ height:`${(v/max)*100}%`, minHeight: v>0?'4px':'0' }} />
        </div>
      ))}
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon, trend, change, color }: {
  title: string; value: string; sub?: string; icon: any;
  trend?: 'up'|'down'; change?: string; color: string;
}) {
  const map: Record<string, string> = {
    blue:    'border-blue-500/25 text-blue-400 bg-blue-500/10',
    purple:  'border-purple-500/25 text-purple-400 bg-purple-500/10',
    emerald: 'border-emerald-500/25 text-emerald-400 bg-emerald-500/10',
    amber:   'border-amber-500/25 text-amber-400 bg-amber-500/10',
  };
  const [border, text, bg] = map[color].split(' ');
  return (
    <div className={`border ${border} bg-white/[0.03] rounded-2xl p-5`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${text}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${trend==='up'?'text-emerald-400':'text-red-400'}`}>
            {trend==='up' ? <ArrowUpRight className="w-3 h-3"/> : <ArrowDownRight className="w-3 h-3"/>}
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
function EditClientModal({ client, onClose, onSaved }: {
  client: Client; onClose: () => void; onSaved: (u: Partial<Client>) => void;
}) {
  const { getIdToken } = useAuth();
  const [form, setForm] = useState({
    clientName: client.name, industry: client.industry, plan: client.plan,
    status: client.status, adminEmail: client.adminEmail, sheetId: client.sheetId||'',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState(false);

  const save = async () => {
    setSaving(true); setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/clients/${client.id}`, {
        method:'PUT',
        headers:{'Authorization':`Bearer ${getIdToken()}`,'Content-Type':'application/json'},
        body: JSON.stringify({ clientName:form.clientName, industry:form.industry, plan:form.plan,
          status:form.status, adminEmail:form.adminEmail, dataSource:{sheetId:form.sheetId} }),
      });
      if (!res.ok) { const e=await res.json().catch(()=>({})); throw new Error(e.error||`Error ${res.status}`); }
      setSuccess(true);
      onSaved({ name:form.clientName, industry:form.industry, plan:form.plan as any,
        status:form.status as any, adminEmail:form.adminEmail, sheetId:form.sheetId });
      setTimeout(onClose, 1200);
    } catch (e:any) { setError(e.message||'Failed to save.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full max-w-lg bg-[#080d1e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">{client.name[0]}</div>
            <div><p className="text-white font-semibold">Edit Configuration</p><p className="text-gray-500 text-xs">{client.name}</p></div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-xl hover:bg-white/[0.05] transition-colors"><X size={18}/></button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {([['Company Name','clientName','text'],['Industry','industry','text'],['Admin Email','adminEmail','email']] as [string,string,string][]).map(([label,key,type])=>(
            <div key={key}>
              <label className="text-gray-400 text-sm mb-1.5 block">{label}</label>
              <input type={type} value={(form as any)[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"/>
            </div>
          ))}
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Google Sheet ID</label>
            <input type="text" value={form.sheetId} onChange={e=>setForm(f=>({...f,sheetId:e.target.value}))}
              placeholder="1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M"
              className="w-full bg-blue-500/[0.08] border border-blue-500/30 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/70 placeholder-gray-600 transition-colors font-mono"/>
            <p className="text-gray-600 text-xs mt-1">Found in Sheets URL: /spreadsheets/d/<span className="text-blue-500">SHEET_ID</span>/edit</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Plan</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Free','Pro','Enterprise'] as const).map(p=>(
                <button key={p} onClick={()=>setForm(f=>({...f,plan:p}))}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${form.plan===p ? p==='Free'?'bg-gray-600 text-white':p==='Pro'?'bg-blue-600 text-white':'bg-purple-600 text-white' : 'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'}`}>{p}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Status</label>
            <div className="grid grid-cols-3 gap-2">
              {(['active','inactive','pending'] as const).map(s=>(
                <button key={s} onClick={()=>setForm(f=>({...f,status:s}))}
                  className={`py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${form.status===s ? s==='active'?'bg-emerald-600 text-white':s==='inactive'?'bg-red-600 text-white':'bg-amber-600 text-white' : 'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'}`}>{s}</button>
              ))}
            </div>
          </div>
          {error && <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3"><AlertCircle size={15} className="text-red-400 shrink-0"/><p className="text-red-400 text-sm">{error}</p></div>}
          {success && <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-3"><CheckCircle size={15} className="text-emerald-400 shrink-0"/><p className="text-emerald-400 text-sm">Saved successfully!</p></div>}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-white/[0.08]">
          <button onClick={save} disabled={saving||success}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-medium transition-colors">
            {saving ? <Loader2 size={15} className="animate-spin"/> : <Save size={15}/>}
            {saving ? 'Saving…' : success ? 'Saved!' : 'Save Changes'}
          </button>
          <button onClick={onClose} className="px-5 bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 rounded-xl text-sm transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Add Client Modal ───────────────────────────────────────────────────────
// Step 1: POST /admin/clients  → creates client config in DynamoDB
// Step 2: POST /admin/users    → creates client-admin in Cognito + DynamoDB (sends invite email)
function AddClientModal({ onClose, onCreated }: {
  onClose: () => void; onCreated: (c: Client) => void;
}) {
  const { getIdToken } = useAuth();
  const [form, setForm] = useState({
    clientName:'', industry:'', sheetId:'',
    adminFirstName:'', adminLastName:'', adminEmail:'',
    plan:'Pro' as 'Free'|'Pro'|'Enterprise',
  });
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState<'idle'|'client'|'user'|'done'>('idle');
  const [error, setError] = useState<string|null>(null);

  const create = async () => {
    if (!form.clientName||!form.industry||!form.adminEmail||!form.adminFirstName||!form.adminLastName) {
      setError('All fields except Sheet ID are required.'); return;
    }
    setSaving(true); setError(null);
    try {
      const token = getIdToken();

      // ── 1. Create client config ──────────────────────────────────────────
      setStep('client');
      const cRes = await fetch(`${API_BASE_URL}/admin/clients`, {
        method:'POST',
        headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
        body: JSON.stringify({ clientName:form.clientName, industry:form.industry,
          adminEmail:form.adminEmail, plan:form.plan, status:'active',
          dataSource:{sheetId:form.sheetId}, userCount:0, totalCalls:0, totalMinutes:0 }),
      });
      if (!cRes.ok) { const e=await cRes.json().catch(()=>({})); throw new Error(e.error||`Failed to create client (${cRes.status})`); }
      const created = await cRes.json();
      const newClientId = created.clientId;

      // ── 2. Create client-admin user ──────────────────────────────────────
      setStep('user');
      const uRes = await fetch(`${API_BASE_URL}/admin/users`, {
        method:'POST',
        headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
        body: JSON.stringify({ email:form.adminEmail, firstName:form.adminFirstName,
          lastName:form.adminLastName, clientId:newClientId, role:'client-admin', jobTitle:'Administrator' }),
      });
      if (!uRes.ok) {
        const e=await uRes.json().catch(()=>({}));
        setError(`Client created but admin account failed: ${e.error||uRes.status}. Add them manually from the Users tab.`);
      }

      setStep('done');
      onCreated({ id:newClientId, name:form.clientName, industry:form.industry, plan:form.plan,
        status:'active', adminEmail:form.adminEmail, sheetId:form.sheetId,
        userCount:1, totalCalls:0, totalMinutes:0, createdAt:new Date().toISOString().split('T')[0] });
      if (!error) setTimeout(onClose, 800);
    } catch (e:any) { setError(e.message||'Something went wrong.'); setStep('idle'); }
    finally { setSaving(false); }
  };

  const steps = [
    { key:'client', label:'Creating client config in DynamoDB…' },
    { key:'user',   label:'Creating admin account in Cognito…' },
    { key:'done',   label:'All done!' },
  ];
  const stepIdx = steps.findIndex(s=>s.key===step);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full max-w-lg bg-[#080d1e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"><Plus size={16} className="text-white"/></div>
            <div><p className="text-white font-semibold">Add New Client</p><p className="text-gray-500 text-xs">Creates client config + admin account in Cognito</p></div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-xl hover:bg-white/[0.05] transition-colors"><X size={18}/></button>
        </div>
        <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Company */}
          <div>
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-3">Company Details</p>
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Company Name <span className="text-red-400">*</span></label>
                <input type="text" placeholder="e.g. Apex Dental Clinic" value={form.clientName}
                  onChange={e=>setForm(f=>({...f,clientName:e.target.value}))}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"/>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Industry <span className="text-red-400">*</span></label>
                <input type="text" placeholder="e.g. Healthcare, Beauty & Wellness" value={form.industry}
                  onChange={e=>setForm(f=>({...f,industry:e.target.value}))}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"/>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Google Sheet ID <span className="text-gray-600">(optional)</span></label>
                <input type="text" placeholder="1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M" value={form.sheetId}
                  onChange={e=>setForm(f=>({...f,sheetId:e.target.value}))}
                  className="w-full bg-blue-500/[0.06] border border-blue-500/20 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors font-mono"/>
                <p className="text-gray-600 text-xs mt-1">Found in Sheets URL: /spreadsheets/d/<span className="text-blue-500">SHEET_ID</span>/edit</p>
              </div>
            </div>
          </div>
          {/* Admin account */}
          <div className="border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={13} className="text-purple-400"/>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Admin Account</p>
              <span className="text-gray-600 text-xs">— receives a Cognito invite email</span>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">First Name <span className="text-red-400">*</span></label>
                  <input type="text" placeholder="Jane" value={form.adminFirstName}
                    onChange={e=>setForm(f=>({...f,adminFirstName:e.target.value}))}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"/>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Last Name <span className="text-red-400">*</span></label>
                  <input type="text" placeholder="Smith" value={form.adminLastName}
                    onChange={e=>setForm(f=>({...f,adminLastName:e.target.value}))}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"/>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Admin Email <span className="text-red-400">*</span></label>
                <input type="email" placeholder="admin@theirclinic.com" value={form.adminEmail}
                  onChange={e=>setForm(f=>({...f,adminEmail:e.target.value}))}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"/>
              </div>
            </div>
          </div>
          {/* Plan */}
          <div className="border-t border-white/[0.06] pt-4">
            <label className="text-gray-400 text-sm mb-2 block">Plan</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Free','Pro','Enterprise'] as const).map(p=>(
                <button key={p} onClick={()=>setForm(f=>({...f,plan:p}))}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${form.plan===p ? p==='Free'?'bg-gray-600 text-white':p==='Pro'?'bg-blue-600 text-white':'bg-purple-600 text-white' : 'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'}`}>{p}</button>
              ))}
            </div>
          </div>
          {/* Progress */}
          {saving && (
            <div className="bg-blue-500/10 border border-blue-500/25 rounded-xl px-4 py-3 space-y-2.5">
              {steps.map((s,i)=>{
                const done = i<stepIdx||step==='done';
                const active = s.key===step;
                return (
                  <div key={s.key} className="flex items-center gap-2.5">
                    {done ? <CheckCircle size={14} className="text-emerald-400 shrink-0"/> :
                     active ? <Loader2 size={14} className="text-blue-400 animate-spin shrink-0"/> :
                     <div className="w-3.5 h-3.5 rounded-full border border-gray-600 shrink-0"/>}
                    <span className={`text-sm ${done?'text-emerald-400':active?'text-white':'text-gray-600'}`}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          )}
          {error && <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3"><AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5"/><p className="text-red-400 text-sm">{error}</p></div>}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-white/[0.08]">
          <button onClick={create} disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-medium transition-colors">
            {saving ? <Loader2 size={15} className="animate-spin"/> : <Plus size={15}/>}
            {saving ? (step==='client'?'Creating client…':step==='user'?'Setting up admin…':'Done!') : 'Create Client'}
          </button>
          <button onClick={onClose} className="px-5 bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 rounded-xl text-sm transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Add User Modal ─────────────────────────────────────────────────────────
// POST /admin/users → creates in Cognito + DynamoDB, sends invite email
function AddUserModal({ clients, onClose, onCreated }: {
  clients: Client[]; onClose: () => void; onCreated: (u: PlatformUser) => void;
}) {
  const { getIdToken } = useAuth();
  const [form, setForm] = useState({
    firstName:'', lastName:'', email:'',
    role:'client-user' as 'client-admin'|'client-user',
    clientId: clients[0]?.id || '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const create = async () => {
    if (!form.firstName||!form.lastName||!form.email||!form.clientId) {
      setError('All fields are required.'); return;
    }
    setSaving(true); setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users`, {
        method:'POST',
        headers:{'Authorization':`Bearer ${getIdToken()}`,'Content-Type':'application/json'},
        body: JSON.stringify({ email:form.email, firstName:form.firstName,
          lastName:form.lastName, clientId:form.clientId, role:form.role, jobTitle:'' }),
      });
      if (!res.ok) { const e=await res.json().catch(()=>({})); throw new Error(e.error||`Server ${res.status}`); }
      const created = await res.json();
      const clientName = clients.find(c=>c.id===form.clientId)?.name||'—';
      onCreated({ id:created.userId, name:`${form.firstName} ${form.lastName}`.trim(),
        email:form.email, role:form.role, clientId:form.clientId, clientName,
        status:'active', lastActive:'Just added', createdAt:new Date().toISOString().split('T')[0] });
      onClose();
    } catch(e:any) { setError(e.message||'Failed to create user.'); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative w-full max-w-lg bg-[#080d1e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"><Users size={16} className="text-white"/></div>
            <div><p className="text-white font-semibold">Create New User</p><p className="text-gray-500 text-xs">Creates in Cognito + DynamoDB, sends invite email</p></div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-xl hover:bg-white/[0.05] transition-colors"><X size={18}/></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">First Name <span className="text-red-400">*</span></label>
              <input type="text" placeholder="Jane" value={form.firstName} onChange={e=>setForm(f=>({...f,firstName:e.target.value}))}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"/>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Last Name <span className="text-red-400">*</span></label>
              <input type="text" placeholder="Smith" value={form.lastName} onChange={e=>setForm(f=>({...f,lastName:e.target.value}))}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"/>
            </div>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Email <span className="text-red-400">*</span></label>
            <input type="email" placeholder="jane@company.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60 placeholder-gray-600 transition-colors"/>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1.5 block">Assign to Client <span className="text-red-400">*</span></label>
            <select value={form.clientId} onChange={e=>setForm(f=>({...f,clientId:e.target.value}))}
              className="w-full bg-[#0d1428] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/60">
              {clients.length===0
                ? <option value="">No clients yet — create a client first</option>
                : clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)
              }
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Role</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                {value:'client-user',  label:'Client User',  desc:'Personal dashboard only'},
                {value:'client-admin', label:'Client Admin', desc:'Manages their whole team'},
              ] as const).map(r=>(
                <button key={r.value} onClick={()=>setForm(f=>({...f,role:r.value}))}
                  className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${form.role===r.value?'bg-blue-600/20 border-blue-500/50 text-white':'bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-white'}`}>
                  <p className="font-medium">{r.label}</p>
                  <p className="text-xs opacity-70 mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 flex items-start gap-2">
            <AlertCircle size={14} className="text-blue-400 shrink-0 mt-0.5"/>
            <p className="text-blue-300 text-xs">Cognito will send this user an invite email with a temporary password. They set a new password on first login.</p>
          </div>
          {error && <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3"><AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5"/><p className="text-red-400 text-sm">{error}</p></div>}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-white/[0.08]">
          <button onClick={create} disabled={saving||clients.length===0}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-medium transition-colors">
            {saving ? <Loader2 size={15} className="animate-spin"/> : <Plus size={15}/>}
            {saving ? 'Creating user…' : 'Create User'}
          </button>
          <button onClick={onClose} className="px-5 bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 rounded-xl text-sm transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Client Detail Side Panel ──────────────────────────────────────────────
function ClientDetailPanel({ client, onClose, onEdit, onToggleStatus, toggling, onDeleted }: {
  client: Client; onClose: () => void; onEdit: () => void;
  onToggleStatus: () => void; toggling: boolean;
  onDeleted: (id: string) => void;
}) {
  const { getIdToken } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string|null>(null);

  const handleDelete = async () => {
    setDeleting(true); setDeleteError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/clients/${client.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getIdToken()}` },
      });
      if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.error||`Error ${res.status}`); }
      onDeleted(client.id);
      onClose();
    } catch(e:any) { setDeleteError(e.message||'Failed to delete.'); setDeleting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
      <div className="w-[480px] bg-[#080d1e] border-l border-white/[0.08] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">{client.name[0]}</div>
            <div><p className="text-white font-semibold">{client.name}</p><p className="text-gray-500 text-xs">{client.industry}</p></div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-xl hover:bg-white/[0.05] transition-colors"><X size={18}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {[{l:'Total Calls',v:client.totalCalls},{l:'Minutes',v:client.totalMinutes},{l:'Users',v:client.userCount}].map(({l,v})=>(
              <div key={l} className="bg-white/[0.04] rounded-xl p-3 text-center">
                <p className="text-white text-xl font-bold">{v}</p>
                <p className="text-gray-500 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Details</h4>
            {[
              {l:'Admin Email',v:client.adminEmail},{l:'Plan',v:client.plan},
              {l:'Status',v:client.status},{l:'Created',v:client.createdAt},
              {l:'Sheet ID',v:client.sheetId||'Not configured'},
            ].map(({l,v})=>(
              <div key={l} className="flex items-center justify-between py-2.5 border-b border-white/[0.04]">
                <span className="text-gray-500 text-sm">{l}</span>
                <span className="text-gray-200 text-sm font-medium truncate ml-4 max-w-[260px] text-right">{v}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">Actions</h4>
            <button onClick={onEdit}
              className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600/15 border border-blue-500/25 rounded-xl text-blue-400 text-sm hover:bg-blue-600/25 transition-colors">
              <Edit2 size={15}/> Edit Configuration
            </button>
            <button onClick={onToggleStatus} disabled={toggling}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors disabled:opacity-60 ${
                client.status==='active'
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15'
                  : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15'
              }`}>
              {toggling ? <Loader2 size={15} className="animate-spin"/> : client.status==='active' ? <XCircle size={15}/> : <CheckCircle size={15}/>}
              {toggling ? 'Updating…' : client.status==='active' ? 'Deactivate Client' : 'Activate Client'}
            </button>

            {/* Delete — shows confirmation before executing */}
            {!confirmDelete ? (
              <button onClick={()=>setConfirmDelete(true)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-gray-500 text-sm hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-colors mt-2">
                <Trash2 size={15}/> Delete Client Permanently
              </button>
            ) : (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-2 space-y-3">
                <div className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5"/>
                  <div>
                    <p className="text-red-300 text-sm font-semibold">Delete "{client.name}"?</p>
                    <p className="text-red-400/70 text-xs mt-0.5">This permanently removes the client config from DynamoDB. This cannot be undone.</p>
                  </div>
                </div>
                {deleteError && <p className="text-red-400 text-xs">{deleteError}</p>}
                <div className="flex gap-2">
                  <button onClick={handleDelete} disabled={deleting}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                    {deleting ? <Loader2 size={14} className="animate-spin"/> : <Trash2 size={14}/>}
                    {deleting ? 'Deleting…' : 'Yes, Delete'}
                  </button>
                  <button onClick={()=>{ setConfirmDelete(false); setDeleteError(null); }}
                    className="px-4 bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 rounded-xl text-sm transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────
function OverviewTab({ userName }: { userName: string }) {
  const hour = new Date().getHours();
  const greeting = hour<12?'Good morning':hour<17?'Good afternoon':'Good evening';
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">
          {greeting}, <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">{userName.split(' ')[0]}</span>
        </h1>
        <p className="text-gray-400">Here's your platform overview.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Clients" value="—" sub="See Clients tab" icon={Building2} color="blue"/>
        <StatCard title="Total Users" value="—" sub="See Users tab" icon={Users} color="purple"/>
        <StatCard title="Calls Today" value="—" sub="Coming soon" icon={Phone} color="emerald"/>
        <StatCard title="Calls This Month" value="—" sub="Coming soon" icon={TrendingUp} color="amber"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-1">Client Growth</h3>
          <p className="text-gray-500 text-sm mb-4">Real data connections coming soon</p>
          <MiniBar data={[0,0,0,0,0,0,0]} color="blue"/>
          <div className="flex justify-between mt-2">{MONTHS.map(m=><span key={m} className="text-gray-600 text-xs flex-1 text-center">{m}</span>)}</div>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-1">Call Volume</h3>
          <p className="text-gray-500 text-sm mb-4">Real data connections coming soon</p>
          <MiniBar data={[0,0,0,0,0,0,0]} color="purple"/>
          <div className="flex justify-between mt-2">{MONTHS.map(m=><span key={m} className="text-gray-600 text-xs flex-1 text-center">{m}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

// ── Clients Tab ────────────────────────────────────────────────────────────
function ClientsTab() {
  const { getIdToken } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all'|'active'|'inactive'|'pending'>('all');
  const [selectedClient, setSelectedClient] = useState<Client|null>(null);
  const [editingClient, setEditingClient] = useState<Client|null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string|null>(null);

  const loadClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/clients`, { headers:{'Authorization':`Bearer ${getIdToken()}`} });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const items = await res.json();
      setClients((items||[]).map((i:any)=>({
        id:i.clientId, name:i.clientName||'—', industry:i.industry||'—',
        plan:i.plan||'Free', status:i.status||'active', adminEmail:i.adminEmail||'—',
        sheetId:i.dataSource?.sheetId||'', userCount:i.userCount||0,
        totalCalls:i.totalCalls||0, totalMinutes:i.totalMinutes||0,
        createdAt:i.createdAt?.split('T')[0]||'—',
      })));
    } catch(e) { console.error('Failed to load clients',e); setClients([]); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ loadClients(); },[]);

  const handleSaved = (id:string, u:Partial<Client>) => {
    setClients(p=>p.map(c=>c.id===id?{...c,...u}:c));
    setSelectedClient(p=>p?.id===id?{...p,...u}:p);
  };

  const handleToggle = async (client:Client) => {
    const ns = client.status==='active'?'inactive':'active';
    setTogglingId(client.id);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/clients/${client.id}`, {
        method:'PUT', headers:{'Authorization':`Bearer ${getIdToken()}`,'Content-Type':'application/json'},
        body:JSON.stringify({status:ns}),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      handleSaved(client.id, {status:ns});
    } catch(e) { console.error(e); }
    finally { setTogglingId(null); }
  };

  const filtered = useMemo(()=>clients.filter(c=>{
    const ms = !search||c.name.toLowerCase().includes(search.toLowerCase())||c.industry.toLowerCase().includes(search.toLowerCase());
    return ms&&(filter==='all'||c.status===filter);
  }),[clients,search,filter]);

  return (
    <div className="space-y-6">
      {selectedClient && <ClientDetailPanel client={selectedClient} onClose={()=>setSelectedClient(null)}
        onEdit={()=>setEditingClient(selectedClient)}
        onToggleStatus={()=>handleToggle(selectedClient)} toggling={togglingId===selectedClient.id}
        onDeleted={id=>{ setClients(p=>p.filter(c=>c.id!==id)); setSelectedClient(null); }}/>}
      {editingClient && <EditClientModal client={editingClient} onClose={()=>setEditingClient(null)}
        onSaved={u=>handleSaved(editingClient.id,u)}/>}
      {showAdd && <AddClientModal onClose={()=>setShowAdd(false)} onCreated={c=>setClients(p=>[c,...p])}/>}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Clients</h2>
          <p className="text-gray-400 mt-1">All companies using the Sentria platform</p>
        </div>
        <button onClick={()=>setShowAdd(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={15}/> Add Client
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[{l:'Total',n:clients.length,c:'text-white'},{l:'Active',n:clients.filter(c=>c.status==='active').length,c:'text-emerald-400'},
          {l:'Pending',n:clients.filter(c=>c.status==='pending').length,c:'text-amber-400'},{l:'Inactive',n:clients.filter(c=>c.status==='inactive').length,c:'text-red-400'}
        ].map(({l,n,c})=>(
          <div key={l} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${c}`}>{n}</p>
            <p className="text-gray-500 text-xs mt-1">{l}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 flex-1 min-w-56">
          <Search size={14} className="text-gray-500"/>
          <input type="text" placeholder="Search clients…" value={search} onChange={e=>setSearch(e.target.value)}
            className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-600"/>
        </div>
        {(['all','active','pending','inactive'] as const).map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filter===s?'bg-blue-600 text-white':'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'}`}>
            {s[0].toUpperCase()+s.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3.5 border-b border-white/[0.06]">
          {['Company','Industry','Plan','Status','Created',''].map(h=>(
            <span key={h} className="text-gray-500 text-xs font-medium uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-gray-500"><Loader2 size={18} className="animate-spin"/><span className="text-sm">Loading clients from database…</span></div>
        ) : filtered.length===0 ? (
          <div className="text-center py-16"><Building2 size={32} className="text-gray-700 mx-auto mb-3"/><p className="text-gray-500 text-sm">{clients.length===0?'No clients yet — add your first one above.':'No clients match your search.'}</p></div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map(c=>(
              <div key={c.id} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-600/60 to-purple-600/60 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">{c.name[0]}</div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{c.name}</p>
                    <p className="text-gray-500 text-xs truncate">{c.adminEmail}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm truncate">{c.industry}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${planColors[c.plan]}`}>{c.plan}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${statusColors[c.status]}`}>{c.status}</span>
                <span className="text-gray-500 text-xs">{c.createdAt}</span>
                <button onClick={()=>setSelectedClient(c)}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/15 px-3 py-1.5 rounded-lg transition-colors">
                  <Eye size={12}/> View
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="px-5 py-3.5 border-t border-white/[0.06] text-gray-500 text-sm">
          {loading?'Loading…':`Showing ${filtered.length} of ${clients.length} clients`}
        </div>
      </div>
    </div>
  );
}

// ── All Users Tab ──────────────────────────────────────────────────────────
function AllUsersTab() {
  const { getIdToken } = useAuth();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(()=>{
    (async()=>{
      setLoading(true);
      try {
        const token = getIdToken();
        const [uRes,cRes] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/users`,   {headers:{'Authorization':`Bearer ${token}`}}),
          fetch(`${API_BASE_URL}/admin/clients`, {headers:{'Authorization':`Bearer ${token}`}}),
        ]);
        if (uRes.ok) {
          const items = await uRes.json();
          setUsers((items||[]).map((u:any)=>({
            id:u.userId, name:`${u.firstName||''} ${u.lastName||''}`.trim()||u.email,
            email:u.email, role:u.role||'client-user', clientId:u.clientId,
            clientName:u.clientName||u.clientId||'—', status:u.status||'active',
            lastActive:u.updatedAt?new Date(u.updatedAt).toLocaleDateString():'—',
            createdAt:u.createdAt?.split('T')[0]||'—',
          })));
        }
        if (cRes.ok) {
          const items = await cRes.json();
          setClients((items||[]).map((c:any)=>({
            id:c.clientId, name:c.clientName||'—', industry:c.industry||'—',
            plan:c.plan||'Free', status:c.status||'active', adminEmail:c.adminEmail||'—',
            sheetId:c.dataSource?.sheetId||'', userCount:c.userCount||0,
            totalCalls:c.totalCalls||0, totalMinutes:c.totalMinutes||0,
            createdAt:c.createdAt?.split('T')[0]||'—',
          })));
        }
      } catch(e) { console.error('Failed to load users',e); }
      finally { setLoading(false); }
    })();
  },[getIdToken]);

  const filtered = useMemo(()=>users.filter(u=>{
    const ms = !search||u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase());
    return ms&&(roleFilter==='all'||u.role===roleFilter);
  }),[users,search,roleFilter]);

  return (
    <div className="space-y-6">
      {showAdd && <AddUserModal clients={clients} onClose={()=>setShowAdd(false)} onCreated={u=>setUsers(p=>[u,...p])}/>}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">All Users</h2>
          <p className="text-gray-400 mt-1">Every user across the entire Sentria platform</p>
        </div>
        <button onClick={()=>setShowAdd(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <Plus size={15}/> Create User
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[{l:'Total',n:users.length,c:'text-white'},{l:'Super Admins',n:users.filter(u=>u.role==='super-admin').length,c:'text-purple-400'},
          {l:'Client Admins',n:users.filter(u=>u.role==='client-admin').length,c:'text-blue-400'},{l:'Client Users',n:users.filter(u=>u.role==='client-user').length,c:'text-gray-300'}
        ].map(({l,n,c})=>(
          <div key={l} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${c}`}>{n}</p>
            <p className="text-gray-500 text-xs mt-1">{l}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 flex-1">
          <Search size={14} className="text-gray-500"/>
          <input type="text" placeholder="Search users…" value={search} onChange={e=>setSearch(e.target.value)}
            className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-600"/>
        </div>
        {['all','super-admin','client-admin','client-user'].map(r=>(
          <button key={r} onClick={()=>setRoleFilter(r)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${roleFilter===r?'bg-blue-600 text-white':'bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white'}`}>
            {r==='all'?'All':r.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_auto] gap-4 px-5 py-3.5 border-b border-white/[0.06]">
          {['User','Client','Role','Last Active','Status',''].map(h=>(
            <span key={h} className="text-gray-500 text-xs font-medium uppercase tracking-wide">{h}</span>
          ))}
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-gray-500"><Loader2 size={18} className="animate-spin"/><span className="text-sm">Loading users from database…</span></div>
        ) : filtered.length===0 ? (
          <div className="text-center py-16"><Users size={32} className="text-gray-700 mx-auto mb-3"/><p className="text-gray-500 text-sm">{users.length===0?'No users yet.':'No users match your search.'}</p></div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filtered.map(u=>(
              <div key={u.id} className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr_auto] gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600/60 to-purple-600/60 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">{u.name[0]}</div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{u.name}</p>
                    <p className="text-gray-500 text-xs truncate">{u.email}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-sm truncate">{u.clientName}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${roleColors[u.role]}`}>
                  {u.role.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}
                </span>
                <span className="text-gray-500 text-sm">{u.lastActive}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${statusColors[u.status]}`}>{u.status}</span>
                <button onClick={()=>setUsers(p=>p.filter(x=>x.id!==u.id))}
                  className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={14}/>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="px-5 py-3.5 border-t border-white/[0.06] text-gray-500 text-sm">
          {loading?'Loading…':`Showing ${filtered.length} of ${users.length} users`}
        </div>
      </div>
    </div>
  );
}

// ── Analytics Tab ──────────────────────────────────────────────────────────
function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Analytics</h2>
        <p className="text-gray-400 mt-1">Platform-wide performance — real data connections coming soon</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Calls (All Time)" value="—" icon={Phone} color="blue"/>
        <StatCard title="Total Minutes" value="—" icon={Clock} color="purple"/>
        <StatCard title="Active Clients" value="—" icon={Building2} color="emerald"/>
        <StatCard title="Avg Calls / Client" value="—" icon={BarChart3} color="amber"/>
      </div>
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 text-center">
        <BarChart3 size={40} className="text-gray-700 mx-auto mb-3"/>
        <p className="text-gray-400 font-medium">Real analytics coming soon</p>
        <p className="text-gray-600 text-sm mt-1">Will connect to CloudWatch metrics and DynamoDB aggregations once clients are actively using the platform.</p>
      </div>
    </div>
  );
}

// ── System Health Tab ──────────────────────────────────────────────────────
function SystemHealthTab() {
  const services = [
    {name:'AWS Cognito',status:'operational',latency:'42ms',uptime:'99.98%',icon:Shield,color:'emerald'},
    {name:'API Gateway',status:'operational',latency:'87ms',uptime:'99.95%',icon:Globe,color:'emerald'},
    {name:'DynamoDB',status:'operational',latency:'12ms',uptime:'99.99%',icon:Database,color:'emerald'},
    {name:'Lambda Functions',status:'operational',latency:'230ms',uptime:'99.91%',icon:Zap,color:'emerald'},
    {name:'Google Sheets API',status:'operational',latency:'380ms',uptime:'99.2%',icon:Activity,color:'emerald'},
    {name:'Vercel CDN',status:'operational',latency:'18ms',uptime:'100%',icon:Server,color:'emerald'},
  ];
  const allOk = services.every(s=>s.status==='operational');
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">System Health</h2>
        <p className="text-gray-400 mt-1">Status of all platform services — placeholder data for now</p>
      </div>
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border ${allOk?'bg-emerald-500/10 border-emerald-500/25 text-emerald-400':'bg-amber-500/10 border-amber-500/25 text-amber-400'}`}>
        {allOk?<CheckCircle size={20}/>:<AlertCircle size={20}/>}
        <div>
          <p className="font-semibold">{allOk?'All Systems Operational':'Minor Degradation Detected'}</p>
          <p className="text-sm opacity-80 mt-0.5">{services.filter(s=>s.status==='operational').length} of {services.length} services fully operational</p>
        </div>
        <div className="ml-auto text-sm opacity-70">Placeholder data</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {services.map(svc=>(
          <div key={svc.name} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-11 h-11 ${svc.color==='emerald'?'bg-emerald-500/10':'bg-amber-500/10'} rounded-xl flex items-center justify-center shrink-0`}>
              <svc.icon className={`w-5 h-5 ${svc.color==='emerald'?'text-emerald-400':'text-amber-400'}`}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-medium text-sm">{svc.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${svc.status==='operational'?'bg-emerald-500/15 text-emerald-400':'bg-amber-500/15 text-amber-400'}`}>{svc.status}</span>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Latency: <span className="text-gray-300">{svc.latency}</span></span>
                <span>Uptime: <span className="text-gray-300">{svc.uptime}</span></span>
              </div>
            </div>
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${svc.status==='operational'?'bg-emerald-500 shadow-lg shadow-emerald-500/50':'bg-amber-500 shadow-lg shadow-amber-500/50'}`}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
interface SuperAdminDashboardProps {
  userEmail: string; userName: string; onLogout: () => void;
}

export function SuperAdminDashboard({ userEmail, userName, onLogout }: SuperAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const initials = userName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

  return (
    <div className="flex h-screen bg-[#070A12] overflow-hidden">
      <aside className="w-64 shrink-0 bg-[#060a1a] border-r border-white/[0.06] flex flex-col z-30 fixed left-0 top-0 h-screen">
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 480 120" className="w-40 h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="saGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4d5ed"/><stop offset="50%" stopColor="#5b5fa8"/><stop offset="100%" stopColor="#1a2570"/>
              </linearGradient></defs>
              <text x="240" y="75" fontFamily="Arial, sans-serif" fontSize="72" fontWeight="700" textAnchor="middle" letterSpacing="3" fill="url(#saGrad)">SENTRIA</text>
            </svg>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <Shield size={12} className="text-purple-400"/>
            <span className="text-xs text-purple-400 font-medium">Super Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({id,icon:Icon,label})=>(
            <button key={id} onClick={()=>setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab===id?'bg-gradient-to-r from-purple-600/20 to-blue-600/15 text-white border border-purple-500/25 shadow-lg shadow-purple-500/10':'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}>
              <Icon className={activeTab===id?'text-purple-400':''} size={18}/>{label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{initials}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-white text-xs font-medium truncate">{userName}</p>
                <Shield size={10} className="text-purple-400 shrink-0"/>
              </div>
              <p className="text-gray-500 text-xs truncate">{userEmail}</p>
            </div>
            <button onClick={onLogout} className="text-gray-600 hover:text-red-400 transition-colors"><LogOut size={15}/></button>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 overflow-y-auto">
        <header className="sticky top-0 z-20 bg-[#070A12]/90 backdrop-blur-sm border-b border-white/[0.06] px-8 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Shield size={14} className="text-purple-400"/>
            <span className="text-purple-400 font-medium">Super Admin</span>
            <ChevronRight size={14}/>
            <span className="text-white capitalize">{NAV.find(n=>n.id===activeTab)?.label}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2">
              <Search size={14} className="text-gray-500"/>
              <input placeholder="Search platform…" className="bg-transparent text-white text-sm outline-none placeholder-gray-600 w-44"/>
            </div>
            <button className="relative p-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-gray-400 hover:text-white transition-colors">
              <Bell size={16}/>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full"/>
            </button>
          </div>
        </header>
        <div className="p-8">
          {activeTab==='overview'  && <OverviewTab userName={userName}/>}
          {activeTab==='clients'   && <ClientsTab/>}
          {activeTab==='users'     && <AllUsersTab/>}
          {activeTab==='analytics' && <AnalyticsTab/>}
          {activeTab==='health'    && <SystemHealthTab/>}
        </div>
      </main>

      <div className="fixed top-0 left-64 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px] pointer-events-none -z-10"/>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none -z-10"/>
    </div>
  );
}
