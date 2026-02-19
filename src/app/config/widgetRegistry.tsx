// ============================================================
// SENTRIA — Widget Registry
// Maps widget IDs (stored in DynamoDB config) to React components.
// To add a new widget: build the component, add it here.
// No other file needs to change.
// ============================================================

import type { ComponentType } from 'react';
import type { WidgetId } from '../../types/dashboard';
import type { BookingData } from '../hooks/useGoogleSheets';

// Import all available widgets
import { StatCard } from '../components/StatCard';
import { UsageChart } from '../components/UsageChart';
import { PerformanceChart } from '../components/PerformanceChart';
import { ActivityFeed } from '../components/ActivityFeed';
import { NotificationBoard } from '../components/NotificationBoard';
import { BookingsTable } from '../components/BookingsTable';
import { Calendar } from '../components/Calendar';
import { Phone, Clock, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';

// ── Widget props that all widgets receive ────────────────────────────────────
export interface WidgetProps {
  bookingsData?: BookingData[];
  searchQuery?: string;
  onNavigate?: (tab: string) => void;
  onViewAll?: () => void;
  stats?: {
    totalCalls: number;
    confirmedCalls: number;
    avgDuration: number;
    successRate: number;
  };
}

// ── Registry type ─────────────────────────────────────────────────────────────
type WidgetComponent = ComponentType<WidgetProps>;

// ── THE REGISTRY ──────────────────────────────────────────────────────────────
// Add new widgets here. The key must match a WidgetId in types/dashboard.ts
export const WIDGET_REGISTRY: Record<WidgetId, WidgetComponent> = {
  'stat-cards': ({ stats, onNavigate }: WidgetProps) => {
  if (!stats) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Bookings" value={stats.totalCalls.toLocaleString()} change="18.4%" trend="up" icon={CalendarIcon} color="indigo" onClick={() => onNavigate?.('bookings')} />
      <StatCard title="Completed Calls" value={stats.confirmedCalls.toLocaleString()} change="12.8%" trend="up" icon={Phone} color="purple" onClick={() => onNavigate?.('bookings')} />
      <StatCard title="Avg Call Duration" value={`${stats.avgDuration.toFixed(1)}m`} change="15%" trend="up" icon={Clock} color="blue" onClick={() => onNavigate?.('performance')} />
      <StatCard title="Success Rate" value={`${stats.successRate.toFixed(1)}%`} change="4.2%" trend="up" icon={TrendingUp} color="violet" onClick={() => onNavigate?.('performance')} />
    </div>
  );
},

  'usage-chart': () => <UsageChart />,
  'performance-chart': () => <PerformanceChart />,
  'activity-feed': ({ searchQuery, onViewAll }: WidgetProps) => (
    <ActivityFeed searchQuery={searchQuery ?? ''} onViewAll={onViewAll ?? (() => {})} />
  ),
  'notification-board': ({ searchQuery, onViewAll }: WidgetProps) => (
    <NotificationBoard searchQuery={searchQuery ?? ''} onViewAll={onViewAll ?? (() => {})} />
  ),
  'bookings-table': ({ searchQuery }: WidgetProps) => (
    <BookingsTable searchQuery={searchQuery ?? ''} />
  ),
  'calendar': ({ bookingsData }: WidgetProps) => (
    <Calendar bookingsData={bookingsData ?? []} />
  ),
  'world-clock': () => null, // Rendered as modal in header, not inline
};

// ── Helper to render a widget by ID ─────────────────────────────────────────
export function renderWidget(id: WidgetId, props: WidgetProps) {
  const Widget = WIDGET_REGISTRY[id];
  if (!Widget) {
    console.warn(`Widget "${id}" not found in registry`);
    return null;
  }
  return <Widget key={id} {...props} />;
}
