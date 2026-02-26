// ============================================================
// SENTRIA — App Router
// Role-based routing:
//   super-admin    → /admin     → SuperAdminDashboard
//   client-admin   → /dashboard → ClientAdminDashboard
//   client-user    → /dashboard → DashboardApp (existing)
//   unauthenticated→ /login
// ============================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { SuperAdminDashboard } from '../admin/SuperAdminDashboard';
import { ClientAdminDashboard } from '../app/ClientAdminDashboard';

// ── Lazy-import the original client-user dashboard ────────────────────────
// This keeps bundle size down. It's the existing DashboardApp from dev1.
import { lazy, Suspense, Component, type ReactNode, type ErrorInfo } from 'react';
const DashboardApp = lazy(() => import('../app/DashboardApp'));

// ── Error Boundary ──────────────────────────────────────────────────────────
// Catches render-time crashes so the user sees an error message instead of
// a pitch-black screen (the #070A12 body background).
interface EBProps { children: ReactNode }
interface EBState { hasError: boolean; error: Error | null }

class DashboardErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Dashboard crashed:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[#070A12] flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/15 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" className="text-red-400">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" x2="12" y1="8" y2="12"/>
                <line x1="12" x2="12.01" y1="16" y2="16"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400 text-sm mb-4">
              The dashboard encountered an unexpected error. Please try refreshing the page.
            </p>
            <p className="text-gray-600 text-xs bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 mb-6 font-mono break-all">
              {this.state.error?.message || 'Unknown error'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors">
                Refresh Page
              </button>
              <button
                onClick={() => {
                  sessionStorage.removeItem('sentria_tokens');
                  window.location.href = '/login';
                }}
                className="px-5 py-2.5 bg-white/[0.05] border border-white/[0.08] text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Full-screen loading state ─────────────────────────────────────────────
function SentriaLoader() {
  return (
    <div className="fixed inset-0 bg-[#070A12] flex flex-col items-center justify-center gap-4">
      <svg viewBox="0 0 480 120" className="w-48 h-auto animate-pulse" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4d5ed" />
            <stop offset="50%" stopColor="#5b5fa8" />
            <stop offset="100%" stopColor="#1a2570" />
          </linearGradient>
        </defs>
        <text x="240" y="75" fontFamily="Arial, sans-serif" fontSize="72" fontWeight="700"
          textAnchor="middle" letterSpacing="3" fill="url(#loaderGrad)">SENTRIA</text>
      </svg>
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

// ── Route guard: redirects to login if not authenticated ─────────────────
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <SentriaLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// ── Normalize role string (case-insensitive, trimmed) ────────────────────
function normalizeRole(role: string | undefined): string {
  return (role || 'client-user').toLowerCase().trim();
}

// ── Smart /dashboard redirect based on role ───────────────────────────────
function RoleBasedDashboard() {
  const { session, logout } = useAuth();

  if (!session) return <Navigate to="/login" replace />;

  const role = normalizeRole(session.user?.role);
  const userName = `${session.user?.firstName || ''} ${session.user?.lastName || ''}`.trim() || 'User';
  const userEmail = session.user?.email || '';

  if (role === 'super-admin') {
    return (
      <SuperAdminDashboard
        userEmail={userEmail}
        userName={userName}
        onLogout={logout}
      />
    );
  }

  if (role === 'client-admin') {
    return (
      <ClientAdminDashboard
        userEmail={userEmail}
        userName={userName}
        onLogout={logout}
      />
    );
  }

  // Default: client-user gets the original DashboardApp
  return (
    <Suspense fallback={<SentriaLoader />}>
      <DashboardApp />
    </Suspense>
  );
}

// ── Login page ────────────────────────────────────────────────────────────
import { LoginPage } from '../pages/LoginPage';

// ── Marketing site (public homepage + all public pages) ──────────────────
import App from '../App';

// ── Root router ────────────────────────────────────────────────────────────
export function AppRouter() {
  return (
    <BrowserRouter>
      <DashboardErrorBoundary>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<PublicLoginRoute />} />

          {/* Protected — role-based rendering */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <RoleBasedDashboard />
              </RequireAuth>
            }
          />

          {/* /admin alias — super-admin only, redirects others to /dashboard */}
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminOnlyRoute />
              </RequireAuth>
            }
          />

          {/* Public homepage (marketing site) */}
          <Route path="/" element={<HomepageRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardErrorBoundary>
    </BrowserRouter>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function HomepageRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <SentriaLoader />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <App />;
}

function PublicLoginRoute() {
  const { isAuthenticated, isLoading, session } = useAuth();
  if (isLoading) return <SentriaLoader />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <LoginPage />;
}

function AdminOnlyRoute() {
  const { session, logout } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  if (normalizeRole(session.user?.role) !== 'super-admin') return <Navigate to="/dashboard" replace />;
  const userName = `${session.user?.firstName || ''} ${session.user?.lastName || ''}`.trim() || 'Admin';
  return (
    <SuperAdminDashboard
      userEmail={session.user?.email || ''}
      userName={userName}
      onLogout={logout}
    />
  );
}
