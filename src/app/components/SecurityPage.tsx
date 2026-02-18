import { Shield, Lock, Key, Eye, Smartphone, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export function SecurityPage() {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    allowAnalytics: true,
    shareUsageData: false,
    securityAlerts: true
  });

  const handleUpdatePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert('Please fill in all password fields');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match');
      return;
    }
    console.log('Updating password');
    alert('Password updated successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleRevokeSession = (device: string) => {
    console.log('Revoking session for:', device);
    alert(`Session revoked for ${device}`);
  };

  const handleRevokeAllSessions = () => {
    if (confirm('Are you sure you want to revoke all other sessions?')) {
      console.log('Revoking all sessions');
      alert('All other sessions have been revoked');
    }
  };

  const togglePrivacySetting = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
          Security & Privacy
        </h2>
        <p className="text-gray-400">Protect your account and manage privacy settings</p>
      </div>

      {/* Security Status */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-green-500/20 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Account Security: Strong</h3>
              <p className="text-gray-400">Your account is well protected</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-xl border border-green-400/30">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-semibold">Verified</span>
          </div>
        </div>
      </div>

      {/* Password Management */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-400" />
          Password & Authentication
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            />
          </div>

          {/* Password Requirements */}
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-400/20">
            <p className="text-sm font-medium text-gray-300 mb-3">Password must contain:</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                At least 8 characters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                One uppercase letter
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                One number
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                One special character
              </li>
            </ul>
          </div>

          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30"
            onClick={handleUpdatePassword}
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-400" />
            Two-Factor Authentication
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Status:</span>
            <span className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-lg text-green-300 text-sm font-semibold">
              Enabled
            </span>
          </div>
        </div>
        
        <p className="text-gray-400 mb-6">
          Two-factor authentication adds an extra layer of security to your account by requiring a code from your phone in addition to your password.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-black/20 rounded-xl border border-blue-400/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">SMS Authentication</p>
                <p className="text-gray-400 text-sm">+1 (555) ***-4567</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 font-medium rounded-lg transition-all border border-blue-400/20">
              Manage
            </button>
          </div>

          <div className="p-4 bg-black/20 rounded-xl border border-blue-400/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Key className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">Authenticator App</p>
                <p className="text-gray-400 text-sm">Google Authenticator</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-500/20">
              Setup
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-400" />
          Active Sessions
        </h3>
        
        <div className="space-y-4">
          {[
            { device: 'MacBook Pro', location: 'San Francisco, CA', status: 'Current', time: 'Active now', current: true },
            { device: 'iPhone 13', location: 'San Francisco, CA', status: 'Active', time: '2 hours ago', current: false },
            { device: 'Windows PC', location: 'New York, NY', status: 'Active', time: '1 day ago', current: false },
          ].map((session, index) => (
            <div key={index} className={`p-4 rounded-xl border flex items-center justify-between ${
              session.current 
                ? 'bg-blue-500/10 border-blue-400/30' 
                : 'bg-black/20 border-blue-400/10'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium">{session.device}</p>
                    {session.current && (
                      <span className="px-2 py-0.5 bg-green-500/20 border border-green-400/30 rounded text-green-300 text-xs font-semibold">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span>{session.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.time}
                    </span>
                  </p>
                </div>
              </div>
              {!session.current && (
                <button
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium rounded-lg transition-all border border-red-400/20"
                  onClick={() => handleRevokeSession(session.device)}
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          className="mt-4 w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-xl transition-all border border-red-400/20"
          onClick={handleRevokeAllSessions}
        >
          Revoke All Other Sessions
        </button>
      </div>

      {/* Privacy Settings */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-blue-400" />
          Privacy Settings
        </h3>
        
        <div className="space-y-4">
          {[
            { label: 'Show online status', enabled: privacySettings.showOnlineStatus },
            { label: 'Allow analytics tracking', enabled: privacySettings.allowAnalytics },
            { label: 'Share usage data', enabled: privacySettings.shareUsageData },
            { label: 'Email notifications for security alerts', enabled: privacySettings.securityAlerts },
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-blue-400/10">
              <span className="text-gray-300 font-medium">{setting.label}</span>
              <button
                className={`relative w-14 h-7 rounded-full transition-all ${
                  setting.enabled ? 'bg-blue-500' : 'bg-gray-600'
                }`}
                onClick={() => togglePrivacySetting(setting.label.toLowerCase().replace(/ /g, '') as keyof typeof privacySettings)}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  setting.enabled ? 'translate-x-8' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}