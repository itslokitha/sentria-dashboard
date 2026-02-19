import { Settings, Bell, Shield, Key, Eye, Monitor, Globe, Save, RefreshCw, Check, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSettings, AppSettings } from '../hooks/useSettings.tsx';
import { useTranslation } from '../hooks/useTranslation';

interface SettingsPageProps {
  onSettingsChange?: (settings: AppSettings) => void;
}

export function SettingsPage({ onSettingsChange }: SettingsPageProps) {
  const { settings: savedSettings, saveSettings, updateSetting, resetSettings, regenerateApiKey } = useSettings();
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState(savedSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [lastChangedSetting, setLastChangedSetting] = useState<string>('');

  // Sync with saved settings when they change
  useEffect(() => {
    setSettings(savedSettings);
  }, [savedSettings]);

  const updateLocalSetting = (key: keyof AppSettings, value: any) => {
    // Log the change to console for debugging
    console.log(`🔧 Setting Changed: "${key}" = ${JSON.stringify(value)}`);
    
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
    setSaveStatus('idle');
    setLastChangedSetting(key);
    
    // Show brief visual confirmation
    setTimeout(() => {
      if (lastChangedSetting === key) {
        setLastChangedSetting('');
      }
    }, 2000);
  };

  const handleSave = async () => {
    console.log('💾 Saving all settings...', settings);
    setSaveStatus('saving');
    setHasChanges(false);
    
    const success = await saveSettings(settings);
    
    if (success) {
      console.log('✅ Settings saved successfully!');
      setSaveStatus('success');
      if (onSettingsChange) {
        onSettingsChange(settings);
      }
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      console.error('❌ Failed to save settings');
      setSaveStatus('error');
      setHasChanges(true);
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleReset = () => {
    if (confirm(t('settings.confirmReset'))) {
      console.log('🔄 Resetting all settings to defaults...');
      resetSettings();
      setSettings(savedSettings);
      setHasChanges(false);
      setSaveStatus('success');
      console.log('✅ Settings reset complete');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleRegenerateApiKey = () => {
    if (confirm(t('settings.api.regenerateConfirm'))) {
      const newKey = regenerateApiKey();
      console.log('🔑 New API key generated:', newKey.substring(0, 20) + '...');
      updateLocalSetting('apiKey', newKey);
    }
  };

  const sections = [
    { id: 'general', label: t('settings.general.title'), icon: Settings },
    { id: 'notifications', label: t('settings.notifications.title'), icon: Bell },
    { id: 'display', label: t('settings.display.title'), icon: Monitor },
    { id: 'privacy', label: t('settings.privacy.title'), icon: Shield },
    { id: 'api', label: t('settings.api.title'), icon: Key },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            {t('settings.title')}
          </h2>
          <p className="text-gray-400">{t('settings.subtitle')}</p>
        </div>

        {/* Action Buttons */}
        {hasChanges && (
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-600/10 hover:bg-gray-600/20 border border-gray-500/20 text-gray-300 text-sm font-medium transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              {t('settings.resetSettings')}
            </button>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saveStatus === 'saving' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {t('settings.saving')}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {t('settings.saveChanges')}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Save Success/Error Message */}
      {saveStatus === 'success' && (
        <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-300 font-medium">{t('settings.saved')}</span>
        </div>
      )}
      {saveStatus === 'error' && (
        <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-300 font-medium">{t('settings.error')}</span>
        </div>
      )}

      {/* Main Settings Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-4 shadow-xl">
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/20 text-white border border-blue-500/30 shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-blue-950/30'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-8 shadow-xl">
            
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    {t('settings.general.title')}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">{t('settings.general.subtitle')}</p>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">{t('settings.general.language')}</label>
                  <select
                    value={settings.language}
                    onChange={(e) => {
                      const newLanguage = e.target.value;
                      updateLocalSetting('language', newLanguage);
                      updateSetting('language', newLanguage); // Immediately update global language
                    }}
                    className="w-full px-4 py-3 bg-[#121633]/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  >
                    <option value="en">English</option>
                    <option value="fr">Français (French)</option>
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">{t('settings.general.timezone')}</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => {
                      const newTimezone = e.target.value;
                      updateLocalSetting('timezone', newTimezone);
                      updateSetting('timezone', newTimezone); // Immediately update global timezone
                    }}
                    className="w-full px-4 py-3 bg-[#121633]/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  >
                    <option value="America/Halifax">Atlantic Time - Halifax (AT)</option>
                    <option value="Atlantic/Bermuda">Atlantic Time - Bermuda (AT)</option>
                    <option value="America/Puerto_Rico">Atlantic Time - Puerto Rico (AST)</option>
                    <option value="America/Martinique">Atlantic Time - Martinique (AST)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="America/Anchorage">Alaska Time (AKT)</option>
                    <option value="Pacific/Honolulu">Hawaii Time (HST)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Europe/Berlin">Berlin (CET)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Asia/Kolkata">Mumbai (IST)</option>
                    <option value="Asia/Shanghai">Shanghai (CST)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Australia/Sydney">Sydney (AEDT)</option>
                  </select>
                </div>

                {/* Date & Time Format */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{t('settings.general.dateFormat')}</label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => updateLocalSetting('dateFormat', e.target.value)}
                      className="w-full px-4 py-3 bg-[#121633]/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">{t('settings.general.timeFormat')}</label>
                    <select
                      value={settings.timeFormat}
                      onChange={(e) => updateLocalSetting('timeFormat', e.target.value)}
                      className="w-full px-4 py-3 bg-[#121633]/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="12h">12 Hour</option>
                      <option value="24h">24 Hour</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-400" />
                    Notification Preferences
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">Manage how you receive notifications and alerts</p>
                </div>

                {/* Notification Channels */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Notification Channels</h4>
                  
                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">Email Notifications</div>
                      <div className="text-gray-400 text-sm">Receive updates via email</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => updateLocalSetting('emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">Push Notifications</div>
                      <div className="text-gray-400 text-sm">Browser push notifications</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) => updateLocalSetting('pushNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">SMS Notifications</div>
                      <div className="text-gray-400 text-sm">Text message alerts</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) => updateLocalSetting('smsNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Notification Types */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Notification Types</h4>
                  
                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">New Bookings</div>
                      <div className="text-gray-400 text-sm">Alert when new calls are booked</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifyOnBooking}
                        onChange={(e) => updateLocalSetting('notifyOnBooking', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">Cancellations</div>
                      <div className="text-gray-400 text-sm">Alert on booking cancellations</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifyOnCancellation}
                        onChange={(e) => updateLocalSetting('notifyOnCancellation', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">System Updates</div>
                      <div className="text-gray-400 text-sm">Platform maintenance & updates</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifyOnSystemUpdate}
                        onChange={(e) => updateLocalSetting('notifyOnSystemUpdate', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">Daily Digest</div>
                      <div className="text-gray-400 text-sm">Daily summary email at 9 AM</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.dailyDigest}
                        onChange={(e) => updateLocalSetting('dailyDigest', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Display Settings */}
            {activeSection === 'display' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-blue-400" />
                    Display Preferences
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">Customize your dashboard appearance and behavior</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">Auto Refresh</div>
                      <div className="text-gray-400 text-sm">Automatically refresh dashboard data</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoRefresh}
                        onChange={(e) => updateLocalSetting('autoRefresh', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {settings.autoRefresh && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Refresh Interval (seconds)</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="10"
                          max="120"
                          step="10"
                          value={settings.refreshInterval}
                          onChange={(e) => updateLocalSetting('refreshInterval', parseInt(e.target.value))}
                          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <span className="text-white font-medium w-16 text-right">{settings.refreshInterval}s</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">Show Animations</div>
                      <div className="text-gray-400 text-sm">Enable visual animations and transitions</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showAnimations}
                        onChange={(e) => updateLocalSetting('showAnimations', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">Compact Mode</div>
                      <div className="text-gray-400 text-sm">Reduce spacing for more content</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.compactMode}
                        onChange={(e) => updateLocalSetting('compactMode', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Security Settings */}
            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Privacy & Security
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">Manage your data privacy and security preferences</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">Share Analytics Data</div>
                      <div className="text-gray-400 text-sm">Help improve SENTRIA by sharing usage data</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.shareAnalytics}
                        onChange={(e) => updateLocalSetting('shareAnalytics', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">Cookie Consent</div>
                      <div className="text-gray-400 text-sm">Allow essential and analytics cookies</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.cookieConsent}
                        onChange={(e) => updateLocalSetting('cookieConsent', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Data Retention Period</label>
                    <select
                      value={settings.dataRetention}
                      onChange={(e) => updateLocalSetting('dataRetention', e.target.value)}
                      className="w-full px-4 py-3 bg-[#121633]/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                    >
                      <option value="30">30 Days</option>
                      <option value="60">60 Days</option>
                      <option value="90">90 Days</option>
                      <option value="180">180 Days</option>
                      <option value="365">1 Year</option>
                      <option value="forever">Forever</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2">How long to keep your activity logs and analytics data</p>
                  </div>

                  <div className="p-4 bg-amber-600/10 border border-amber-500/30 rounded-xl">
                    <div className="flex gap-3">
                      <Eye className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium mb-1">Privacy Notice</h4>
                        <p className="text-gray-400 text-sm">Your data is encrypted and stored securely. We never share your information with third parties without explicit consent.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* API & Integrations */}
            {activeSection === 'api' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Key className="w-5 h-5 text-blue-400" />
                    API & Integrations
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">Manage API keys and external integrations</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#121633]/30 rounded-xl border border-blue-500/10">
                    <div>
                      <div className="text-white font-medium">API Access Enabled</div>
                      <div className="text-gray-400 text-sm">Allow API requests to your account</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.apiEnabled}
                        onChange={(e) => updateLocalSetting('apiEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {settings.apiEnabled && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">API Key</label>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={settings.apiKey}
                            readOnly
                            className="flex-1 px-4 py-3 bg-[#121633]/50 border border-blue-500/20 rounded-xl text-gray-400 focus:outline-none font-mono text-sm"
                          />
                          <button 
                            onClick={handleRegenerateApiKey}
                            className="px-6 py-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-300 font-medium hover:bg-blue-600/30 transition-all"
                          >
                            Regenerate
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Keep your API key secure. Never share it publicly.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">Webhook URL</label>
                        <input
                          type="text"
                          value={settings.webhookUrl}
                          onChange={(e) => updateLocalSetting('webhookUrl', e.target.value)}
                          placeholder="https://your-domain.com/webhook"
                          className="w-full px-4 py-3 bg-[#121633]/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-2">Receive real-time updates via webhooks</p>
                      </div>

                    </>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Save Banner (Sticky) */}
      {hasChanges && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-2xl shadow-2xl shadow-blue-500/40 border border-blue-400/30 z-50">
          <div className="flex items-center gap-4">
            <p className="text-white font-medium">You have unsaved changes</p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="px-6 py-2 rounded-lg bg-white text-blue-600 text-sm font-bold hover:bg-gray-100 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}