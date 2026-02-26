// ============================================================
// SENTRIA — Page Route Mapping
// Maps old state-based page names (e.g. "contact", "healthcare")
// to React Router URL paths (e.g. "/contact", "/industries/healthcare").
// Used by Navigation, Footer, and page components during the
// migration from state-based to URL-based routing.
// ============================================================

import { useNavigate } from 'react-router';
import { useCallback } from 'react';

const PAGE_ROUTES: Record<string, string> = {
  'home': '/',
  'platform': '/platform',
  'products': '/platform',
  'platform-overview': '/platform/overview',
  'voice-technology': '/platform/voice-technology',
  'solutions': '/solutions',
  'pricing': '/pricing',
  'resources': '/resources',
  'company': '/company',
  'about': '/about',
  'careers': '/careers',
  'contact': '/contact',
  'emily': '/emily',
  'integrations': '/integrations',
  'partners': '/partners',
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
  'login': '/login',
};

export function pageToPath(page: string): string {
  if (PAGE_ROUTES[page]) return PAGE_ROUTES[page];
  // Handle composite paths like "industries/healthcare"
  if (page.startsWith('industries/')) return `/${page}`;
  return '/';
}

/** Hook that returns an onNavigate(page) function backed by React Router */
export function usePageNavigate(): (page: string) => void {
  const navigate = useNavigate();
  return useCallback(
    (page: string) => {
      navigate(pageToPath(page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [navigate],
  );
}
