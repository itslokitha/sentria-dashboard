// ============================================================
// SENTRIA — App Router
// Role-based routing:
//   super-admin    → /admin     → SuperAdminDashboard
//   client-admin   → /dashboard → ClientAdminDashboard
//   client-user    → /dashboard → DashboardApp (existing)
//   unauthenticated→ /login
// ============================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { SuperAdminDashboard } from '../admin/SuperAdminDashboard';
import { ClientAdminDashboard } from '../app/ClientAdminDashboard';

// ── Lazy-import the original client-user dashboard ────────────────────────
// This keeps bundle size down. It's the existing DashboardApp from dev1.
import { lazy, Suspense } from 'react';
const DashboardApp = lazy(() => import('../app/DashboardApp'));

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

// ── Smart /dashboard redirect based on role ───────────────────────────────
function RoleBasedDashboard() {
  const { session, logout } = useAuth();

  if (!session) return <Navigate to="/login" replace />;

  const role = session.user?.role || 'client-user';
  const userName = `${session.user?.firstName || ''} ${session.user?.lastName || ''}`.trim() || 'User';
  const userEmail = session.user?.email || '';
  const clientName = session.config?.clientName || 'Your Company';
  const sheetId = session.config?.dataSource?.sheetId || '';

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
        clientName={clientName}
        sheetId={sheetId}
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
// Imported from wherever it lives in your project — adjust path if needed.
import { LoginPage } from '../auth/LoginPage';

// ── Root router ────────────────────────────────────────────────────────────
export function AppRouter() {
  return (
    <BrowserRouter>
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

        {/* Default redirect */}
        <Route path="/" element={<DefaultRedirect />} />
        <Route path="*" element={<DefaultRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function DefaultRedirect() {
  const { isAuthenticated, isLoading, session } = useAuth();
  if (isLoading) return <SentriaLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const role = session?.user?.role;
  return <Navigate to="/dashboard" replace />;
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
  if (session.user?.role !== 'super-admin') return <Navigate to="/dashboard" replace />;
  const userName = `${session.user?.firstName || ''} ${session.user?.lastName || ''}`.trim() || 'Admin';
  return (
    <SuperAdminDashboard
      userEmail={session.user?.email || ''}
      userName={userName}
      onLogout={logout}
    />
  );
}
