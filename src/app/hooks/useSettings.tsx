import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface AppSettings {
  // General Settings
  theme: string;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  
  // Notification Settings
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  notifyOnBooking: boolean;
  notifyOnCancellation: boolean;
  notifyOnSystemUpdate: boolean;
  dailyDigest: boolean;
  
  // Display Settings
  autoRefresh: boolean;
  refreshInterval: number;
  showAnimations: boolean;
  compactMode: boolean;
  
  // Privacy Settings
  shareAnalytics: boolean;
  cookieConsent: boolean;
  dataRetention: string;
  
  // API Settings
  apiKey: string;
  webhookUrl: string;
  apiEnabled: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  language: 'en',
  timezone: 'America/Los_Angeles',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  notifyOnBooking: true,
  notifyOnCancellation: true,
  notifyOnSystemUpdate: false,
  dailyDigest: true,
  autoRefresh: true,
  refreshInterval: 30,
  showAnimations: true,
  compactMode: false,
  shareAnalytics: true,
  cookieConsent: true,
  dataRetention: '90',
  apiKey: 'sk_live_••••••••••••••••••••••••3x9K',
  webhookUrl: 'https://api.sentria.ai/webhooks/v1',
  apiEnabled: true,
};

const SETTINGS_STORAGE_KEY = 'sentria_app_settings';

interface SettingsContextType {
  settings: AppSettings;
  isLoading: boolean;
  saveSettings: (newSettings: AppSettings) => Promise<boolean>;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  resetSettings: () => void;
  regenerateApiKey: () => string;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Migrate invalid timezone values
        if (parsed.timezone === 'America/Bermuda') {
          parsed.timezone = 'Atlantic/Bermuda';
        }
        
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: AppSettings): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
        setSettings(newSettings);
        resolve(true);
      } catch (error) {
        console.error('Failed to save settings:', error);
        resolve(false);
      }
    });
  };

  // Update a single setting (also persist to localStorage immediately)
  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        [key]: value,
      };
      // Persist immediately to localStorage
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to persist setting:', error);
      }
      return updated;
    });
  };

  // Reset to defaults
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
  };

  // Generate new API key
  const regenerateApiKey = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'sk_live_';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        saveSettings,
        updateSetting,
        resetSettings,
        regenerateApiKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}