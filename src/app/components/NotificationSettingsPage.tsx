import { Bell, Mail, MessageSquare, Volume2, Smartphone, Monitor, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function NotificationSettingsPage() {
  const [channels, setChannels] = useState({
    push: true,
    email: true,
    sms: false
  });

  const [dndEnabled, setDndEnabled] = useState(false);
  const [dndTimes, setDndTimes] = useState({
    start: '22:00',
    end: '08:00'
  });

  const toggleChannel = (channel: keyof typeof channels) => {
    setChannels(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  const handleSave = () => {
    console.log('Saving notification preferences:', { channels, dndEnabled, dndTimes });
    alert('Notification preferences saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default settings?')) {
      setChannels({ push: true, email: true, sms: false });
      setDndEnabled(false);
      setDndTimes({ start: '22:00', end: '08:00' });
      alert('Settings reset to defaults');
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
          Notification Settings
        </h2>
        <p className="text-gray-400">Customize how and when you receive notifications</p>
      </div>

      {/* Notification Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Push</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">24</p>
          <p className="text-gray-400 text-sm">Active notifications</p>
        </div>

        <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Email</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">18</p>
          <p className="text-gray-400 text-sm">Enabled categories</p>
        </div>

        <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-6 border border-blue-500/20 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-white">SMS</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">6</p>
          <p className="text-gray-400 text-sm">Critical alerts only</p>
        </div>
      </div>

      {/* Notification Channels */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Monitor className="w-5 h-5 text-blue-400" />
          Notification Channels
        </h3>
        
        <div className="space-y-6">
          {/* Push Notifications */}
          <div className="p-6 bg-black/20 rounded-xl border border-blue-400/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Push Notifications</h4>
                  <p className="text-gray-400 text-sm">Receive notifications in your browser</p>
                </div>
              </div>
              <button
                className="relative w-14 h-7 rounded-full transition-all"
                style={{ backgroundColor: channels.push ? '#6366f1' : '#6b7280' }}
                onClick={() => toggleChannel('push')}
              >
                <div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full transition-transform"
                  style={{ transform: channels.push ? 'translateX(8px)' : 'translateX(1px)' }}
                />
              </button>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="p-6 bg-black/20 rounded-xl border border-blue-400/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email Notifications</h4>
                  <p className="text-gray-400 text-sm">admin@sentria.ai</p>
                </div>
              </div>
              <button
                className="relative w-14 h-7 rounded-full transition-all"
                style={{ backgroundColor: channels.email ? '#6366f1' : '#6b7280' }}
                onClick={() => toggleChannel('email')}
              >
                <div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full transition-transform"
                  style={{ transform: channels.email ? 'translateX(8px)' : 'translateX(1px)' }}
                />
              </button>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="p-6 bg-black/20 rounded-xl border border-blue-400/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">SMS Notifications</h4>
                  <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <button
                className="relative w-14 h-7 rounded-full transition-all"
                style={{ backgroundColor: channels.sms ? '#6366f1' : '#6b7280' }}
                onClick={() => toggleChannel('sms')}
              >
                <div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full transition-transform"
                  style={{ transform: channels.sms ? 'translateX(8px)' : 'translateX(1px)' }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Categories */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-400" />
          Notification Categories
        </h3>
        
        <div className="space-y-3">
          {[
            { category: 'System Alerts', description: 'Critical system notifications', push: true, email: true, sms: true },
            { category: 'AI Assistant Updates', description: 'Status changes and performance alerts', push: true, email: true, sms: false },
            { category: 'Call Bookings', description: 'New bookings and cancellations', push: true, email: true, sms: false },
            { category: 'User Activity', description: 'User login and activity updates', push: true, email: false, sms: false },
            { category: 'Performance Reports', description: 'Daily and weekly performance summaries', push: false, email: true, sms: false },
            { category: 'Security Alerts', description: 'Login attempts and security events', push: true, email: true, sms: true },
            { category: 'Billing & Payments', description: 'Invoice and payment notifications', push: true, email: true, sms: false },
            { category: 'Product Updates', description: 'New features and announcements', push: false, email: true, sms: false },
          ].map((item, index) => (
            <div key={index} className="p-5 bg-black/20 rounded-xl border border-blue-400/10 hover:border-blue-400/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-white font-semibold mb-1">{item.category}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={item.push}
                    className="w-4 h-4 rounded border-blue-400/30 bg-black/30 text-blue-500 focus:ring-blue-500/50"
                  />
                  <span className="text-sm text-gray-300">Push</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={item.email}
                    className="w-4 h-4 rounded border-blue-400/30 bg-black/30 text-purple-500 focus:ring-purple-500/50"
                  />
                  <span className="text-sm text-gray-300">Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={item.sms}
                    className="w-4 h-4 rounded border-blue-400/30 bg-black/30 text-green-500 focus:ring-green-500/50"
                  />
                  <span className="text-sm text-gray-300">SMS</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Do Not Disturb */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-blue-400" />
          Do Not Disturb
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-blue-400/10">
            <div>
              <h4 className="text-white font-semibold mb-1">Enable Do Not Disturb</h4>
              <p className="text-gray-400 text-sm">Mute all non-critical notifications</p>
            </div>
            <button
              className="relative w-14 h-7 rounded-full transition-all"
              style={{ backgroundColor: dndEnabled ? '#6366f1' : '#6b7280' }}
              onClick={() => setDndEnabled(!dndEnabled)}
            >
              <div
                className="absolute top-1 w-5 h-5 bg-white rounded-full transition-transform"
                style={{ transform: dndEnabled ? 'translateX(8px)' : 'translateX(1px)' }}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
              <input
                type="time"
                defaultValue={dndTimes.start}
                onChange={(e) => setDndTimes(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">End Time</label>
              <input
                type="time"
                defaultValue={dndTimes.end}
                onChange={(e) => setDndTimes(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-400/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-300">
                  Critical security alerts will still be delivered during Do Not Disturb hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30"
          onClick={handleSave}
        >
          Save Preferences
        </button>
        <button
          className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold rounded-xl transition-all border border-blue-400/20"
          onClick={handleReset}
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}