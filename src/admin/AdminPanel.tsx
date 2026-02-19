// ============================================================
// SENTRIA — Admin Panel
// Super-admin only. Manage clients (dashboard configs) and
// provision users. Accessible at /admin.
// ============================================================

import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { API_BASE_URL } from '../auth/cognitoConfig';
import type { ClientConfig, SentriaUser } from '../types/dashboard';
import { DEFAULT_DASHBOARD_CONFIG } from '../types/dashboard';
import { Plus, Users, Settings, LogOut, RefreshCw, ChevronRight, X, Save } from 'lucide-react';

type AdminTab = 'clients' | 'users';

// ── API helpers ───────────────────────────────────────────────────────────────
function useAdminApi() {
  const { getAccessToken } = useAuth();

  const call = async (method: string, path: string, body?: object) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  };

  return {
    getClients: () => call('GET', '/admin/clients'),
    createClient: (data: Partial<ClientConfig>) => call('POST', '/admin/clients', data),
    updateClient: (id: string, data: Partial<ClientConfig>) => call('PUT', `/admin/clients/${id}`, data),
    getUsers: () => call('GET', '/admin/users'),
    createUser: (data: Partial<SentriaUser> & { password?: string }) => call('POST', '/admin/users', data),
    updateUser: (id: string, data: Partial<SentriaUser>) => call('PUT', `/admin/users/${id}`, data),
  };
}

// ── Client Editor Modal ────────────────────────────────────────────────────────
function ClientEditor({
  client,
  onSave,
  onClose,
}: {
  client?: ClientConfig;
  onSave: (data: Partial<ClientConfig>) => Promise<void>;
  onClose: () => void;
}) {
  const isNew = !client;
  const [form, setForm] = useState<Partial<ClientConfig>>(
    client ?? {
      ...DEFAULT_DASHBOARD_CONFIG,
      clientId: undefined as any,
      clientName: '',
      dataSource: { type: 'googleSheets', sheetId: '', sheetRange: 'Sheet1!A:Z' },
    }
  );
  const [saving, setSaving] = useState(false);

  const handleTabToggle = (tabId: string) => {
    setForm((prev) => ({
      ...prev,
      dashboard: {
        ...prev.dashboard!,
        tabs: prev.dashboard!.tabs.map((t) =>
          t.id === tabId ? { ...t, enabled: !t.enabled } : t
        ),
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1128] border border-blue-500/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
          <h2 className="text-xl font-bold text-white">
            {isNew ? 'New Client' : `Edit: ${client?.clientName}`}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Client Info</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Company Name</label>
                <input
                  className="w-full bg-black/30 border border-blue-400/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400/60"
                  value={form.clientName ?? ''}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  placeholder="Acme Corp"
                />
              </div>
            </div>
          </div>

          {/* Data source */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Data Source</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Type</label>
                <select
                  className="w-full bg-black/30 border border-blue-400/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
                  value={form.dataSource?.type ?? 'googleSheets'}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      dataSource: { ...form.dataSource!, type: e.target.value as any },
                    })
                  }
                >
                  <option value="googleSheets">Google Sheets</option>
                  <option value="database">Database</option>
                  <option value="api">External API</option>
                </select>
              </div>
              {form.dataSource?.type === 'googleSheets' && (
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Google Sheet ID</label>
                  <input
                    className="w-full bg-black/30 border border-blue-400/20 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-blue-400/60"
                    value={(form.dataSource as any).sheetId ?? ''}
                    onChange={(e) =>
                      setForm({ ...form, dataSource: { ...form.dataSource!, sheetId: e.target.value } as any })
                    }
                    placeholder="1A9Zt_S1PhYcwRRy7jeZ4Kvj1dTSE6PCIOWjSNnwv61M"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Tab configuration */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
              Dashboard Tabs
            </h3>
            <p className="text-xs text-gray-500 mb-3">Toggle which tabs this client can see.</p>
            <div className="space-y-2">
              {(form.dashboard?.tabs ?? []).map((tab) => (
                <div
                  key={tab.id}
                  className="flex items-center justify-between px-4 py-3 bg-black/20 border border-blue-500/10 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white font-medium">{tab.label}</span>
                    <span className="text-xs text-gray-500">#{tab.id}</span>
                  </div>
                  <button
                    onClick={() => handleTabToggle(tab.id)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      tab.enabled ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${
                        tab.enabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Branding */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Branding</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Logo URL (optional)</label>
                <input
                  className="w-full bg-black/30 border border-blue-400/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400/60"
                  value={form.dashboard?.branding?.logoUrl ?? ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      dashboard: {
                        ...form.dashboard!,
                        branding: { ...form.dashboard!.branding, logoUrl: e.target.value },
                      },
                    })
                  }
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t border-blue-500/20">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-blue-400/20 text-gray-300 rounded-xl hover:bg-blue-500/10 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all text-sm disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── User Creator Modal ─────────────────────────────────────────────────────────
function UserCreator({
  clients,
  onSave,
  onClose,
}: {
  clients: ClientConfig[];
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    clientId: '',
    role: 'client-user' as 'super-admin' | 'client-admin' | 'client-user',
    jobTitle: '',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1128] border border-blue-500/20 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
          <h2 className="text-xl font-bold text-white">Add User</h2>
          <button onClick={onClose} className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: 'First Name', key: 'firstName', placeholder: 'Jane' },
            { label: 'Last Name', key: 'lastName', placeholder: 'Doe' },
            { label: 'Email', key: 'email', placeholder: 'jane@company.com' },
            { label: 'Job Title', key: 'jobTitle', placeholder: 'Account Manager' },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="text-xs text-gray-400 mb-1 block">{label}</label>
              <input
                className="w-full bg-black/30 border border-blue-400/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400/60"
                value={(form as any)[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
              />
            </div>
          ))}

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Assign to Client</label>
            <select
              className="w-full bg-black/30 border border-blue-400/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
              value={form.clientId}
              onChange={(e) => setForm({ ...form, clientId: e.target.value })}
            >
              <option value="">Select a client...</option>
              {clients.map((c) => (
                <option key={c.clientId} value={c.clientId}>{c.clientName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Role</label>
            <select
              className="w-full bg-black/30 border border-blue-400/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as any })}
            >
              <option value="client-user">Client User (read-only dashboard)</option>
              <option value="client-admin">Client Admin (manage own users)</option>
              <option value="super-admin">Super Admin (full access)</option>
            </select>
          </div>

          <p className="text-xs text-gray-500 bg-blue-500/5 border border-blue-500/10 rounded-lg p-3">
            An invite email with a temporary password will be sent automatically via Cognito.
          </p>
        </div>

        <div className="flex gap-3 p-6 border-t border-blue-500/20">
          <button onClick={onClose} className="flex-1 py-2.5 border border-blue-400/20 text-gray-300 rounded-xl hover:bg-blue-500/10 transition-colors text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.email || !form.clientId}
            className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {saving ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Panel ───────────────────────────────────────────────────────────
export function AdminPanel() {
  const { session, logout } = useAuth();
  const api = useAdminApi();
  const [activeTab, setActiveTab] = useState<AdminTab>('clients');
  const [clients, setClients] = useState<ClientConfig[]>([]);
  const [users, setUsers] = useState<SentriaUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<ClientConfig | null | 'new'>(null);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [c, u] = await Promise.all([api.getClients(), api.getUsers()]);
      setClients(c);
      setUsers(u);
    } catch (err) {
      setError('Failed to load data. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSaveClient = async (data: Partial<ClientConfig>) => {
    if (editingClient === 'new') {
      await api.createClient(data);
    } else if (editingClient) {
      await api.updateClient(editingClient.clientId, data);
    }
    await load();
  };

  const handleCreateUser = async (data: any) => {
    await api.createUser(data);
    await load();
  };

  return (
    <div className="min-h-screen bg-[#070b1f] text-white">
      {/* Header */}
      <div className="bg-[#0d1128] border-b border-blue-500/20 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Sentria Admin
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Signed in as {session?.user.email} · Super Admin
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar nav */}
        <div className="w-56 bg-[#0a0e20] border-r border-blue-500/20 min-h-[calc(100vh-73px)] p-4">
          {([['clients', Settings, 'Clients'], ['users', Users, 'Users']] as const).map(
            ([id, Icon, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm transition-all ${
                  activeTab === id
                    ? 'bg-blue-600/20 text-white border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-blue-500/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                <ChevronRight className={`w-3 h-3 ml-auto transition-transform ${activeTab === id ? 'rotate-90' : ''}`} />
              </button>
            )
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Clients tab */}
          {activeTab === 'clients' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Client Configurations</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Each client has their own dashboard config, tabs, and data source.
                  </p>
                </div>
                <button
                  onClick={() => setEditingClient('new')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all"
                >
                  <Plus className="w-4 h-4" />
                  New Client
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
              ) : clients.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  No clients yet. Create your first one.
                </div>
              ) : (
                <div className="grid gap-4">
                  {clients.map((client) => (
                    <div
                      key={client.clientId}
                      className="bg-[#0d1128]/60 border border-blue-500/10 rounded-2xl p-6 flex items-center justify-between hover:border-blue-500/30 transition-colors"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-white">{client.clientName}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">
                            {client.dataSource.type === 'googleSheets'
                              ? `Google Sheets · ${(client.dataSource as any).sheetId?.substring(0, 20)}...`
                              : client.dataSource.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {client.dashboard.tabs.filter((t) => t.enabled).length} active tabs
                          </span>
                          <span className="text-xs text-gray-500">
                            {users.filter((u) => u.clientId === client.clientId).length} users
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {client.dashboard.tabs
                            .filter((t) => t.enabled)
                            .map((t) => (
                              <span
                                key={t.id}
                                className="px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded-full text-xs border border-blue-500/20"
                              >
                                {t.label}
                              </span>
                            ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingClient(client)}
                        className="px-4 py-2 border border-blue-400/20 text-gray-300 hover:text-white hover:border-blue-400/50 rounded-lg text-sm transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Users tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Users</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Provision users and assign them to clients.
                  </p>
                </div>
                <button
                  onClick={() => setCreatingUser(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
              ) : (
                <div className="bg-[#0d1128]/60 border border-blue-500/10 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/10">
                        {['User', 'Email', 'Client', 'Role', ''].map((h) => (
                          <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => {
                        const client = clients.find((c) => c.clientId === user.clientId);
                        return (
                          <tr key={user.userId} className="border-b border-blue-500/5 hover:bg-blue-500/5 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold">
                                  {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <span className="text-sm text-white font-medium">
                                  {user.firstName} {user.lastName}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-400">{client?.clientName ?? '—'}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                user.role === 'super-admin'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : user.role === 'client-admin'
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="text-xs text-gray-500 hover:text-blue-300 transition-colors">
                                Edit
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {users.length === 0 && (
                    <div className="text-center py-16 text-gray-500">No users yet.</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {editingClient && (
        <ClientEditor
          client={editingClient === 'new' ? undefined : editingClient}
          onSave={handleSaveClient}
          onClose={() => setEditingClient(null)}
        />
      )}
      {creatingUser && (
        <UserCreator
          clients={clients}
          onSave={handleCreateUser}
          onClose={() => setCreatingUser(false)}
        />
      )}
    </div>
  );
}
