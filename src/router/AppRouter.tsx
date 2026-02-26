// ============================================================
// SENTRIA — App Router
// Unifies the dev2 marketing website and dev1 dashboard
// under React Router v7. Public routes serve the website.
// /dashboard/* routes are protected and require auth.
// /admin/* routes are super-admin only.
// ============================================================

import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router';
import { AuthProvider } from '../auth/AuthContext';
import { ProtectedRoute, AdminRoute } from '../auth/ProtectedRoute';
import { pageToPath } from '../utils/pageRoutes';

// ── dev2: Marketing Website Pages ────────────────────────────────────────────
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { LoadingScreen } from '../components/LoadingScreen';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { SolutionsPage } from '../pages/SolutionsPage';
import { PlatformOverviewPage } from '../pages/PlatformOverviewPage';
import { VoiceTechnologyPage } from '../pages/VoiceTechnologyPage';
import { PricingPage } from '../pages/PricingPage';
import { ResourcesPage } from '../pages/ResourcesPage';
import { CompanyPage } from '../pages/CompanyPage';
import { AboutPage } from '../pages/AboutPage';
import { CareersPage } from '../pages/CareersPage';
import { ContactPage } from '../pages/ContactPage';
import { ProjectEmilyPage } from '../pages/ProjectEmilyPage';
import { IndustriesPage } from '../pages/IndustriesPage';
import { HealthcarePage } from '../pages/HealthcarePage';
import { FinancePage } from '../pages/FinancePage';
import { RetailPage } from '../pages/RetailPage';
import { RealEstatePage } from '../pages/RealEstatePage';
import { HospitalityPage } from '../pages/HospitalityPage';
import { ProfessionalPage } from '../pages/ProfessionalPage';
import { InsurancePage } from '../pages/InsurancePage';
import { AutomotivePage } from '../pages/AutomotivePage';
import { EducationPage } from '../pages/EducationPage';
import { LogisticsPage } from '../pages/LogisticsPage';
import { TelecomPage } from '../pages/TelecomPage';
import { ConstructionPage } from '../pages/ConstructionPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { TermsPage } from '../pages/TermsPage';
import { SecurityPage } from '../pages/SecurityPage';
import { CompliancePage } from '../pages/CompliancePage';
import { IntegrationsPage } from '../pages/IntegrationsPage';
import { PartnersPage } from '../pages/PartnersPage';
import { LoginPage } from '../pages/LoginPage';

// ── dev1: Dashboard ───────────────────────────────────────────────────────────
import { DashboardApp } from '../app/DashboardApp';
import { ClientAdminDashboard } from '../app/ClientAdminDashboard';
import { SuperAdminDashboard } from '../admin/SuperAdminDashboard';
import { useAuth } from '../auth/AuthContext';

// ── Admin Panel ───────────────────────────────────────────────────────────────
import { AdminPanel } from '../admin/AdminPanel';

// ── Website page wrapper ────────────────────────────────────────────────────
// Provides Navigation + Footer and injects a working onNavigate prop
// into the child page component via cloneElement.
function WebsitePage({ children }: { children: React.ReactElement }) {
  const navigate = useNavigate();
  const onNavigate = useCallback(
    (page: string) => {
      navigate(pageToPath(page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate],
  );

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <Navigation />
      <main>{React.cloneElement(children, { onNavigate })}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

// ── Role-based dashboard switcher ────────────────────────────────────────────
function RoleBasedDashboard() {
  const { session, logout } = useAuth();
  if (!session) return null;

  const role = session.user?.role || 'client-user';
  const userName = `${session.user?.firstName || ''} ${session.user?.lastName || ''}`.trim() || 'User';
  const userEmail = session.user?.email || '';
  const clientName = session.config?.clientName || session.config?.dashboard?.branding?.companyName || 'Your Company';
  const sheetId = session.config?.dataSource?.sheetId || '';

  if (role === 'super-admin') {
    return <SuperAdminDashboard userEmail={userEmail} userName={userName} onLogout={logout} />;
  }

  if (role === 'client-admin' || role === 'client-user') {
    return (
      <ClientAdminDashboard
        userEmail={userEmail}
        userName={userName}
        clientName={clientName}
        sheetId={sheetId}
        onLogout={logout}
        readOnly={role === 'client-user'}
      />
    );
  }

  // Fallback to legacy DashboardApp
  return <DashboardApp />;
}

// ── Root App ──────────────────────────────────────────────────────────────────
export function AppRouter() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
        <Routes>

          {/* ── Public Website Routes ───────────────────────────────────── */}
          <Route path="/" element={<WebsitePage><HomePage /></WebsitePage>} />
          <Route path="/platform" element={<WebsitePage><ProductsPage /></WebsitePage>} />
          <Route path="/platform/overview" element={<WebsitePage><PlatformOverviewPage /></WebsitePage>} />
          <Route path="/platform/voice-technology" element={<WebsitePage><VoiceTechnologyPage /></WebsitePage>} />
          <Route path="/solutions" element={<WebsitePage><SolutionsPage /></WebsitePage>} />
          <Route path="/pricing" element={<WebsitePage><PricingPage /></WebsitePage>} />
          <Route path="/resources" element={<WebsitePage><ResourcesPage /></WebsitePage>} />
          <Route path="/company" element={<WebsitePage><CompanyPage /></WebsitePage>} />
          <Route path="/about" element={<WebsitePage><AboutPage /></WebsitePage>} />
          <Route path="/careers" element={<WebsitePage><CareersPage /></WebsitePage>} />
          <Route path="/contact" element={<WebsitePage><ContactPage /></WebsitePage>} />
          <Route path="/emily" element={<WebsitePage><ProjectEmilyPage /></WebsitePage>} />
          <Route path="/integrations" element={<WebsitePage><IntegrationsPage /></WebsitePage>} />
          <Route path="/partners" element={<WebsitePage><PartnersPage /></WebsitePage>} />

          {/* Industries */}
          <Route path="/industries" element={<WebsitePage><IndustriesPage /></WebsitePage>} />
          <Route path="/industries/healthcare" element={<WebsitePage><HealthcarePage /></WebsitePage>} />
          <Route path="/industries/finance" element={<WebsitePage><FinancePage /></WebsitePage>} />
          <Route path="/industries/retail" element={<WebsitePage><RetailPage /></WebsitePage>} />
          <Route path="/industries/real-estate" element={<WebsitePage><RealEstatePage /></WebsitePage>} />
          <Route path="/industries/hospitality" element={<WebsitePage><HospitalityPage /></WebsitePage>} />
          <Route path="/industries/professional" element={<WebsitePage><ProfessionalPage /></WebsitePage>} />
          <Route path="/industries/insurance" element={<WebsitePage><InsurancePage /></WebsitePage>} />
          <Route path="/industries/automotive" element={<WebsitePage><AutomotivePage /></WebsitePage>} />
          <Route path="/industries/education" element={<WebsitePage><EducationPage /></WebsitePage>} />
          <Route path="/industries/logistics" element={<WebsitePage><LogisticsPage /></WebsitePage>} />
          <Route path="/industries/telecom" element={<WebsitePage><TelecomPage /></WebsitePage>} />
          <Route path="/industries/construction" element={<WebsitePage><ConstructionPage /></WebsitePage>} />

          {/* Legal */}
          <Route path="/privacy" element={<WebsitePage><PrivacyPage /></WebsitePage>} />
          <Route path="/terms" element={<WebsitePage><TermsPage /></WebsitePage>} />
          <Route path="/security" element={<WebsitePage><SecurityPage /></WebsitePage>} />
          <Route path="/compliance" element={<WebsitePage><CompliancePage /></WebsitePage>} />

          {/* ── Auth Route ──────────────────────────────────────────────── */}
          <Route path="/login" element={<LoginPage />} />

          {/* ── Protected Dashboard Routes ──────────────────────────────── */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <RoleBasedDashboard />
              </ProtectedRoute>
            }
          />

          {/* ── Protected Admin Routes ──────────────────────────────────── */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

          {/* ── Fallback ────────────────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
