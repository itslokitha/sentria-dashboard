import { usePageNavigate } from "../utils/pageRoutes";
import logoImage from "figma:asset/3ca298a21007a50a7e4273fbaceaee5a09caa649.png";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const footerLinks = {
  Product: [
    { label: "Solutions", page: "solutions" },
    { label: "Integrations", page: "integrations" },
    { label: "Voice AI Technology", page: "voice-technology" }
  ],
  Legal: [
    { label: "Privacy Policy", page: "privacy" },
    { label: "Terms of Service", page: "terms" },
    { label: "Compliance", page: "compliance" }
  ],
};

export function Footer({ onNavigate }: FooterProps) {
  const routerNavigate = usePageNavigate();

  const handleLinkClick = (page: string) => {
    routerNavigate(page);
  };

  return (
    <footer className="bg-black border-t border-white/8 py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16 mb-12">
          {/* Brand */}
          <div className="max-w-md">
            <p className="text-sm text-[#B7C0D6]/90 leading-relaxed">
              AI-powered multi-industry operations platform. Automate customer communications, optimize capacity, 
              and transform operational data into actionable intelligence across all sectors.
            </p>
            <div className="text-xs text-[#B7C0D6]/60 font-medium mt-4">
              Built for regulated environments.
            </div>
          </div>
          
          {/* Links - Product and Legal */}
          <div className="flex gap-16 md:gap-20">
            {Object.entries(footerLinks)
              .filter(([category]) => category === 'Product' || category === 'Legal')
              .map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs tracking-[0.12em] uppercase text-white/90 mb-4 font-semibold">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <button 
                        onClick={() => handleLinkClick(link.page)}
                        className="text-sm text-[#B7C0D6]/80 hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-white/8">
          <p className="text-sm text-[#B7C0D6]">
            © 2026 SENTRIA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}