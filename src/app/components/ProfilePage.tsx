import { User, Mail, Phone, MapPin, Briefcase, Calendar, Camera, Bell } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../App';

interface ProfilePageProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export function ProfilePage({ userProfile, onUpdateProfile }: ProfilePageProps) {
  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync formData when userProfile prop changes
  useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setHasChanges(false);
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-24 right-8 z-50 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl animate-slide-in-right';
    successDiv.innerHTML = '✓ Profile updated successfully!';
    document.body.appendChild(successDiv);
    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  };

  const handleCancel = () => {
    setFormData(userProfile);
    setHasChanges(false);
  };

  const handleAvatarChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        setFormData({ ...formData, avatarUrl: base64String });
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const getUserInitials = () => {
    return `${formData.firstName[0] || ''}${formData.lastName[0] || ''}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-400 bg-clip-text text-transparent">
          My Profile
        </h2>
        <p className="text-gray-400">Manage your personal information and preferences</p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <div className="flex items-start gap-8">
          {/* Avatar Section */}
          <div className="relative group">
            {formData.avatarUrl ? (
              <img 
                src={formData.avatarUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-2xl object-cover shadow-xl shadow-blue-500/40 ring-4 ring-blue-400/30"
              />
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-5xl shadow-xl shadow-blue-500/40 ring-4 ring-blue-400/30">
                {getUserInitials()}
              </div>
            )}
            <button className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" onClick={handleAvatarChange}>
              <Camera className="w-8 h-8 text-white" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileSelect} 
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-white">{formData.firstName} {formData.lastName}</h3>
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-300 text-xs font-semibold">
                Administrator
              </span>
            </div>
            <p className="text-gray-400 mb-4">Member since February 2026</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{formData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{formData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{formData.jobTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Form */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-400" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:border-blue-400/60 focus:bg-black/40 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30" onClick={handleSave} disabled={!hasChanges}>
            Save Changes
          </button>
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold rounded-xl transition-all border border-blue-400/20" onClick={handleCancel} disabled={!hasChanges}>
            Cancel
          </button>
        </div>
      </div>

      {/* Account Activity */}
      <div className="bg-gradient-to-br from-[#0d1128] to-[#1a1f3a] rounded-2xl p-8 border border-blue-500/20 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Recent Activity
        </h3>
        
        <div className="space-y-4">
          {[
            { action: 'Updated profile information', time: '2 hours ago', icon: User },
            { action: 'Changed password', time: '1 day ago', icon: User },
            { action: 'Logged in from new device', time: '3 days ago', icon: User },
            { action: 'Updated notification settings', time: '1 week ago', icon: Bell },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-black/20 rounded-xl border border-blue-400/10 hover:border-blue-400/30 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <activity.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-gray-400 text-sm">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}