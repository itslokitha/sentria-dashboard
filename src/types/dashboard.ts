// ============================================================
// SENTRIA — Dashboard Config Types
// Every client's dashboard is fully described by ClientConfig.
// These types drive routing, sidebar, widgets, and data sources.
// ============================================================

export type DataSourceType = 'googleSheets' | 'database' | 'api';
export type WidgetId =
  | 'stat-cards'
  | 'usage-chart'
  | 'performance-chart'
  | 'activity-feed'
  | 'notification-board'
  | 'bookings-table'
  | 'calendar'
  | 'world-clock';

export interface GoogleSheetsDataSource {
  type: 'googleSheets';
  sheetId: string;
  sheetRange?: string;
}

export interface DatabaseDataSource {
  type: 'database';
  endpoint: string; // Lambda endpoint to call
  tableName: string;
}

export interface ApiDataSource {
  type: 'api';
  endpoint: string;
  headers?: Record<string, string>;
}

export type DataSource =
  | GoogleSheetsDataSource
  | DatabaseDataSource
  | ApiDataSource;

export interface StatCardConfig {
  id: string;
  label: string;
  enabled: boolean;
  dataKey?: string; // maps to a field in the data source
}

export interface DashboardTab {
  id: string;
  label: string;
  icon: string; // lucide icon name
  enabled: boolean;
  order: number;
  widgets: WidgetId[];
}

export interface DashboardFeatures {
  globalSearch: boolean;
  worldClock: boolean;
  exportData: boolean;
  notifications: boolean;
  autoRefresh: boolean;
  refreshIntervalSeconds: number;
}

export interface DashboardBranding {
  companyName: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
}

export interface DashboardConfig {
  title: string;
  tabs: DashboardTab[];
  statCards: StatCardConfig[];
  features: DashboardFeatures;
  branding: DashboardBranding;
}

// The full config stored in DynamoDB per client
export interface ClientConfig {
  clientId: string;           // DynamoDB partition key
  clientName: string;
  dataSource: DataSource;
  dashboard: DashboardConfig;
  createdAt: string;
  updatedAt: string;
}

// What's stored per Cognito user in DynamoDB sentria-users table
export interface SentriaUser {
  userId: string;             // Cognito sub
  email: string;
  clientId: string;           // FK to ClientConfig
  role: 'super-admin' | 'client-admin' | 'client-user';
  firstName: string;
  lastName: string;
  jobTitle?: string;
  avatarUrl?: string;
}

// Combined user session — what the frontend holds after login
export interface UserSession {
  user: SentriaUser;
  config: ClientConfig;
}

// ============================================================
// DEFAULT CONFIG — used as fallback / for new clients
// ============================================================
export const DEFAULT_DASHBOARD_CONFIG: ClientConfig = {
  clientId: 'default',
  clientName: 'Sentria',
  dataSource: {
    type: 'googleSheets',
    sheetId: '',
    sheetRange: 'Sheet1!A:Z',
  },
  dashboard: {
    title: 'Sentria Dashboard',
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        icon: 'LayoutDashboard',
        enabled: true,
        order: 1,
        widgets: ['stat-cards', 'usage-chart', 'performance-chart', 'activity-feed', 'notification-board', 'calendar'],
      },
      {
        id: 'bookings',
        label: 'Bookings',
        icon: 'Calendar',
        enabled: true,
        order: 2,
        widgets: ['bookings-table'],
      },
      {
        id: 'users',
        label: 'Users',
        icon: 'Users',
        enabled: true,
        order: 3,
        widgets: ['activity-feed', 'notification-board'],
      },
      {
        id: 'performance',
        label: 'Performance',
        icon: 'Activity',
        enabled: true,
        order: 4,
        widgets: ['performance-chart', 'usage-chart'],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'Settings',
        enabled: true,
        order: 5,
        widgets: [],
      },
    ],
    statCards: [
      { id: 'total-calls', label: 'Total Bookings', enabled: true },
      { id: 'completed-calls', label: 'Completed Calls', enabled: true },
      { id: 'avg-duration', label: 'Avg Duration', enabled: true },
      { id: 'success-rate', label: 'Success Rate', enabled: true },
    ],
    features: {
      globalSearch: true,
      worldClock: true,
      exportData: true,
      notifications: true,
      autoRefresh: true,
      refreshIntervalSeconds: 120,
    },
    branding: {
      companyName: 'Sentria',
      primaryColor: '#3B82F6',
      accentColor: '#8B5CF6',
    },
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
