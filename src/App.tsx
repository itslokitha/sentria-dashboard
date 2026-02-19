import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { LoadingScreen } from "./components/LoadingScreen";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { SolutionsPage } from "./pages/SolutionsPage";
import { PlatformOverviewPage } from "./pages/PlatformOverviewPage";
import { VoiceTechnologyPage } from "./pages/VoiceTechnologyPage";
import { PricingPage } from "./pages/PricingPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { CompanyPage } from "./pages/CompanyPage";
import { AboutPage } from "./pages/AboutPage";
import { CareersPage } from "./pages/CareersPage";
import { ContactPage } from "./pages/ContactPage";
import { ProjectEmilyPage } from "./pages/ProjectEmilyPage";
import { IndustriesPage } from "./pages/IndustriesPage";
import { HealthcarePage } from "./pages/HealthcarePage";
import { FinancePage } from "./pages/FinancePage";
import { RetailPage } from "./pages/RetailPage";
import { RealEstatePage } from "./pages/RealEstatePage";
import { HospitalityPage } from "./pages/HospitalityPage";
import { ProfessionalPage } from "./pages/ProfessionalPage";
import { InsurancePage } from "./pages/InsurancePage";
import { AutomotivePage } from "./pages/AutomotivePage";
import { EducationPage } from "./pages/EducationPage";
import { LogisticsPage } from "./pages/LogisticsPage";
import { TelecomPage } from "./pages/TelecomPage";
import { ConstructionPage } from "./pages/ConstructionPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { SecurityPage } from "./pages/SecurityPage";
import { CompliancePage } from "./pages/CompliancePage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { PartnersPage } from "./pages/PartnersPage";
import { LoginPage } from "./pages/LoginPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showLoading, setShowLoading] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case "platform-overview":
        return <PlatformOverviewPage onNavigate={setCurrentPage} />;
      case "voice-technology":
        return <VoiceTechnologyPage onNavigate={setCurrentPage} />;
      case "products":
      case "platform":
        return <ProductsPage />;
      case "solutions":
        return <SolutionsPage onNavigate={setCurrentPage} />;
      case "pricing":
        return <PricingPage onNavigate={setCurrentPage} />;
      case "resources":
        return <ResourcesPage />;
      case "company":
        return <CompanyPage />;
      case "about":
        return <AboutPage onNavigate={setCurrentPage} />;
      case "careers":
        return <CareersPage onNavigate={setCurrentPage} />;
      case "contact":
        return <ContactPage onNavigate={setCurrentPage} />;
      case "emily":
        return <ProjectEmilyPage onNavigate={setCurrentPage} />;
      case "industries":
        return <IndustriesPage onNavigate={setCurrentPage} />;
      case "healthcare":
        return <HealthcarePage onNavigate={setCurrentPage} />;
      case "finance":
        return <FinancePage onNavigate={setCurrentPage} />;
      case "retail":
        return <RetailPage onNavigate={setCurrentPage} />;
      case "realestate":
        return <RealEstatePage onNavigate={setCurrentPage} />;
      case "hospitality":
        return <HospitalityPage onNavigate={setCurrentPage} />;
      case "professional":
        return <ProfessionalPage onNavigate={setCurrentPage} />;
      case "insurance":
        return <InsurancePage onNavigate={setCurrentPage} />;
      case "automotive":
        return <AutomotivePage onNavigate={setCurrentPage} />;
      case "education":
        return <EducationPage onNavigate={setCurrentPage} />;
      case "logistics":
        return <LogisticsPage onNavigate={setCurrentPage} />;
      case "telecom":
      case "telecommunications":
        return <TelecomPage onNavigate={setCurrentPage} />;
      case "construction":
        return <ConstructionPage onNavigate={setCurrentPage} />;
      case "privacy":
        return <PrivacyPage />;
      case "terms":
        return <TermsPage />;
      case "security":
        return <SecurityPage />;
      case "compliance":
        return <CompliancePage />;
      case "integrations":
        return <IntegrationsPage onNavigate={setCurrentPage} />;
      case "partners":
        return <PartnersPage />;
      case "login":
        return <LoginPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <ScrollToTop />
    </div>
  );
}