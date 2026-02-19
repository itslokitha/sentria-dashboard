// ============================================================
// SENTRIA — App Router
// Unifies the dev2 marketing website and dev1 dashboard
// under React Router v7. Public routes serve the website.
// /dashboard/* routes are protected and require auth.
// /admin/* routes are super-admin only.
// ============================================================

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router';
import { AuthProvider } from '../auth/AuthContext';
import { ProtectedRoute, AdminRoute } from '../auth/ProtectedRoute';

// ── Page-name → URL-path mapping ────────────────────────────────────────────
const PAGE_ROUTES: Record<string, string> = {
  'home': '/',
  'platform': '/platform',
  'platform-overview': '/platform/overview',
  'voice-technology': '/platform/voice-technology',
  'solutions': '/solutions',
  'pricing': '/pricing',
  'resources': '/resources',
  'company': '/company',
  'about': '/about',
  'careers': '/careers',
  'contact': '/contact',
  'sales': '/contact',
  'emily': '/emily',
  'industries': '/industries',
  'healthcare': '/industries/healthcare',
  'finance': '/industries/finance',
  'retail': '/industries/retail',
  'realestate': '/industries/real-estate',
  'real-estate': '/industries/real-estate',
  'hospitality': '/industries/hospitality',
  'professional': '/industries/professional',
  'insurance': '/industries/insurance',
  'automotive': '/industries/automotive',
  'education': '/industries/education',
  'logistics': '/industries/logistics',
  'telecom': '/industries/telecom',
  'telecommunications': '/industries/telecom',
  'construction': '/industries/construction',
  'privacy': '/privacy',
  'terms': '/terms',
  'security': '/security',
  'compliance': '/compliance',
  'integrations': '/integrations',
  'partners': '/partners',
  'login': '/login',
};

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
import { useState } from 'react';

// ── dev1: Dashboard ───────────────────────────────────────────────────────────
import { DashboardApp } from '../app/DashboardApp';

// ── Admin Panel ───────────────────────────────────────────────────────────────
import { AdminPanel } from '../admin/AdminPanel';

// ── Wrapper that injects a working onNavigate into page components ────────────
function NavigablePage({ Component, ...rest }: { Component: React.ComponentType<any> }) {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = PAGE_ROUTES[page] || `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <Component onNavigate={handleNavigate} {...rest} />;
}

// ── Website layout wrapper (Navigation + Footer) ──────────────────────────────
function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const path = PAGE_ROUTES[page] || `/${page}`;
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <Navigation currentPage="" onNavigate={handleNavigate} />
      <main>{children}</main>
      <Footer onNavigate={handleNavigate} />
      <ScrollToTop />
    </div>
  );
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
          <Route path="/" element={<WebsiteLayout><NavigablePage Component={HomePage} /></WebsiteLayout>} />
          <Route path="/platform" element={<WebsiteLayout><ProductsPage /></WebsiteLayout>} />
          <Route path="/platform/overview" element={<WebsiteLayout><NavigablePage Component={PlatformOverviewPage} /></WebsiteLayout>} />
          <Route path="/platform/voice-technology" element={<WebsiteLayout><NavigablePage Component={VoiceTechnologyPage} /></WebsiteLayout>} />
          <Route path="/solutions" element={<WebsiteLayout><NavigablePage Component={SolutionsPage} /></WebsiteLayout>} />
          <Route path="/pricing" element={<WebsiteLayout><NavigablePage Component={PricingPage} /></WebsiteLayout>} />
          <Route path="/resources" element={<WebsiteLayout><ResourcesPage /></WebsiteLayout>} />
          <Route path="/company" element={<WebsiteLayout><CompanyPage /></WebsiteLayout>} />
          <Route path="/about" element={<WebsiteLayout><NavigablePage Component={AboutPage} /></WebsiteLayout>} />
          <Route path="/careers" element={<WebsiteLayout><NavigablePage Component={CareersPage} /></WebsiteLayout>} />
          <Route path="/contact" element={<WebsiteLayout><NavigablePage Component={ContactPage} /></WebsiteLayout>} />
          <Route path="/emily" element={<WebsiteLayout><NavigablePage Component={ProjectEmilyPage} /></WebsiteLayout>} />
          <Route path="/integrations" element={<WebsiteLayout><NavigablePage Component={IntegrationsPage} /></WebsiteLayout>} />
          <Route path="/partners" element={<WebsiteLayout><PartnersPage /></WebsiteLayout>} />

          {/* Industries */}
          <Route path="/industries" element={<WebsiteLayout><NavigablePage Component={IndustriesPage} /></WebsiteLayout>} />
          <Route path="/industries/healthcare" element={<WebsiteLayout><NavigablePage Component={HealthcarePage} /></WebsiteLayout>} />
          <Route path="/industries/finance" element={<WebsiteLayout><NavigablePage Component={FinancePage} /></WebsiteLayout>} />
          <Route path="/industries/retail" element={<WebsiteLayout><NavigablePage Component={RetailPage} /></WebsiteLayout>} />
          <Route path="/industries/real-estate" element={<WebsiteLayout><NavigablePage Component={RealEstatePage} /></WebsiteLayout>} />
          <Route path="/industries/hospitality" element={<WebsiteLayout><NavigablePage Component={HospitalityPage} /></WebsiteLayout>} />
          <Route path="/industries/professional" element={<WebsiteLayout><NavigablePage Component={ProfessionalPage} /></WebsiteLayout>} />
          <Route path="/industries/insurance" element={<WebsiteLayout><NavigablePage Component={InsurancePage} /></WebsiteLayout>} />
          <Route path="/industries/automotive" element={<WebsiteLayout><NavigablePage Component={AutomotivePage} /></WebsiteLayout>} />
          <Route path="/industries/education" element={<WebsiteLayout><NavigablePage Component={EducationPage} /></WebsiteLayout>} />
          <Route path="/industries/logistics" element={<WebsiteLayout><NavigablePage Component={LogisticsPage} /></WebsiteLayout>} />
          <Route path="/industries/telecom" element={<WebsiteLayout><NavigablePage Component={TelecomPage} /></WebsiteLayout>} />
          <Route path="/industries/construction" element={<WebsiteLayout><NavigablePage Component={ConstructionPage} /></WebsiteLayout>} />

          {/* Legal */}
          <Route path="/privacy" element={<WebsiteLayout><PrivacyPage /></WebsiteLayout>} />
          <Route path="/terms" element={<WebsiteLayout><TermsPage /></WebsiteLayout>} />
          <Route path="/security" element={<WebsiteLayout><SecurityPage /></WebsiteLayout>} />
          <Route path="/compliance" element={<WebsiteLayout><CompliancePage /></WebsiteLayout>} />

          {/* ── Auth Route ──────────────────────────────────────────────── */}
          <Route path="/login" element={<NavigablePage Component={LoginPage} />} />

          {/* ── Protected Dashboard Routes ──────────────────────────────── */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardApp />
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
