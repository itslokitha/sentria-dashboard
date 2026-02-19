// ============================================================
// SENTRIA — App Router
// Unifies the dev2 marketing website and dev1 dashboard
// under React Router v7. Public routes serve the website.
// /dashboard/* routes are protected and require auth.
// /admin/* routes are super-admin only.
// ============================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from '../auth/AuthContext';
import { ProtectedRoute, AdminRoute } from '../auth/ProtectedRoute';

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

// ── Website layout wrapper (Navigation + Footer) ──────────────────────────────
function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState('');
  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{children}</main>
      <Footer onNavigate={setCurrentPage} />
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
          <Route path="/" element={<WebsiteLayout><HomePage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/platform" element={<WebsiteLayout><ProductsPage /></WebsiteLayout>} />
          <Route path="/platform/overview" element={<WebsiteLayout><PlatformOverviewPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/platform/voice-technology" element={<WebsiteLayout><VoiceTechnologyPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/solutions" element={<WebsiteLayout><SolutionsPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/pricing" element={<WebsiteLayout><PricingPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/resources" element={<WebsiteLayout><ResourcesPage /></WebsiteLayout>} />
          <Route path="/company" element={<WebsiteLayout><CompanyPage /></WebsiteLayout>} />
          <Route path="/about" element={<WebsiteLayout><AboutPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/careers" element={<WebsiteLayout><CareersPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/contact" element={<WebsiteLayout><ContactPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/emily" element={<WebsiteLayout><ProjectEmilyPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/integrations" element={<WebsiteLayout><IntegrationsPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/partners" element={<WebsiteLayout><PartnersPage /></WebsiteLayout>} />

          {/* Industries */}
          <Route path="/industries" element={<WebsiteLayout><IndustriesPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/healthcare" element={<WebsiteLayout><HealthcarePage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/finance" element={<WebsiteLayout><FinancePage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/retail" element={<WebsiteLayout><RetailPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/real-estate" element={<WebsiteLayout><RealEstatePage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/hospitality" element={<WebsiteLayout><HospitalityPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/professional" element={<WebsiteLayout><ProfessionalPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/insurance" element={<WebsiteLayout><InsurancePage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/automotive" element={<WebsiteLayout><AutomotivePage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/education" element={<WebsiteLayout><EducationPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/logistics" element={<WebsiteLayout><LogisticsPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/telecom" element={<WebsiteLayout><TelecomPage onNavigate={() => {}} /></WebsiteLayout>} />
          <Route path="/industries/construction" element={<WebsiteLayout><ConstructionPage onNavigate={() => {}} /></WebsiteLayout>} />

          {/* Legal */}
          <Route path="/privacy" element={<WebsiteLayout><PrivacyPage /></WebsiteLayout>} />
          <Route path="/terms" element={<WebsiteLayout><TermsPage /></WebsiteLayout>} />
          <Route path="/security" element={<WebsiteLayout><SecurityPage /></WebsiteLayout>} />
          <Route path="/compliance" element={<WebsiteLayout><CompliancePage /></WebsiteLayout>} />

          {/* ── Auth Route ──────────────────────────────────────────────── */}
          <Route path="/login" element={<LoginPage onNavigate={() => {}} />} />

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
