import { useEffect, useState, useRef } from 'react';
import { X, Globe as GlobeIcon } from 'lucide-react';
import Globe from 'react-globe.gl';
import { useSettings } from '../hooks/useSettings';

interface WorldClockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeZone {
  city: string;
  zone: string;
  offset: number;
  country: string;
  lat: number;
  lng: number;
}

const timeZones: TimeZone[] = [
  { city: 'Los Angeles', zone: 'America/Los_Angeles', offset: -8, country: 'USA', lat: 34.0522, lng: -118.2437 },
  { city: 'New York', zone: 'America/New_York', offset: -5, country: 'USA', lat: 40.7128, lng: -74.0060 },
  { city: 'London', zone: 'Europe/London', offset: 0, country: 'UK', lat: 51.5074, lng: -0.1278 },
  { city: 'Paris', zone: 'Europe/Paris', offset: 1, country: 'France', lat: 48.8566, lng: 2.3522 },
  { city: 'Dubai', zone: 'Asia/Dubai', offset: 4, country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { city: 'Mumbai', zone: 'Asia/Kolkata', offset: 5.5, country: 'India', lat: 19.0760, lng: 72.8777 },
  { city: 'Singapore', zone: 'Asia/Singapore', offset: 8, country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { city: 'Tokyo', zone: 'Asia/Tokyo', offset: 9, country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { city: 'Sydney', zone: 'Australia/Sydney', offset: 11, country: 'Australia', lat: -33.8688, lng: 151.2093 },
];

export function WorldClockModal({ isOpen, onClose }: WorldClockModalProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentZone, setCurrentZone] = useState('');
  const [userLocation, setUserLocation] = useState<TimeZone | null>(null);
  const globeEl = useRef<any>();
  const { settings } = useSettings();

  useEffect(() => {
    if (!isOpen) return;

    const updateTime = () => {
      const userTimeZone = settings.timezone;
      setCurrentZone(userTimeZone);

      // Find user's location
      const matchingZone = timeZones.find(tz => tz.zone === userTimeZone);
      if (matchingZone) {
        setUserLocation(matchingZone);
      }

      const time = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: settings.timeFormat === '12h',
        timeZone: settings.timezone,
      });
      setCurrentTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [isOpen, settings.timezone, settings.timeFormat]);

  useEffect(() => {
    if (globeEl.current && userLocation) {
      // Smooth auto-rotate to user's location with better altitude
      setTimeout(() => {
        globeEl.current.pointOfView(
          { lat: userLocation.lat, lng: userLocation.lng, altitude: 2.2 },
          2000
        );
      }, 100);
    } else if (globeEl.current) {
      // Default centered view
      setTimeout(() => {
        globeEl.current.pointOfView(
          { lat: 0, lng: 0, altitude: 2.2 },
          1000
        );
      }, 100);
    }
  }, [userLocation, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-gradient-to-br from-[#070b1f] via-[#0d1128] to-[#1a1435] rounded-3xl border border-purple-500/30 shadow-2xl overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Animated Stars */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/10 hover:border-white/20 backdrop-blur-sm group"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </button>

        {/* Main Content - Centered Layout */}
        <div className="relative z-10 px-8 py-10">
          <div className="max-w-5xl mx-auto">
            {/* Modern Header with Status Badge */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">World Clock</h2>
                <p className="text-sm text-gray-400">Real-time global timezone</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl backdrop-blur-xl">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Live</span>
              </div>
            </div>

            {/* Modern Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
              {/* LEFT: Hero Time Card - Takes 3 columns */}
              <div className="lg:col-span-3 relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl border border-white/10 backdrop-blur-2xl overflow-hidden p-8 min-h-[400px] flex items-center justify-center">
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50"></div>
                  
                  <div className="relative text-center">
                    {/* Massive Time Display */}
                    <div className="mb-4 flex flex-col items-center">
                      <div className="text-7xl md:text-8xl font-bold text-white tabular-nums tracking-tighter leading-none mb-2">
                        {currentTime}
                      </div>
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <span className="text-sm font-medium">
                          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                        <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
                        <span className="text-sm">
                          UTC {userLocation?.offset ? (userLocation.offset >= 0 ? '+' : '') + userLocation.offset : ''}
                        </span>
                      </div>
                    </div>

                    {/* Timezone Tag */}
                    <div className="flex justify-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-300">{currentZone.split('/').pop()?.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Info Cards Stack - Takes 2 columns */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {/* Date Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-xl p-5 hover:border-blue-500/30 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Date</div>
                        <div className="text-3xl font-bold text-white mb-0.5">
                          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date().getFullYear()}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day & Week Card */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-xl p-5 hover:border-purple-500/30 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Day</div>
                        <div className="text-2xl font-bold text-white mb-0.5">
                          {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                        </div>
                        <div className="text-xs text-gray-400">
                          Week {Math.ceil(new Date().getDate() / 7)} of {new Date().toLocaleDateString('en-US', { month: 'long' })}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coordinates Card */}
                {userLocation && (
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500"></div>
                    <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-xl p-5 hover:border-emerald-500/30 transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Coordinates</div>
                          <div className="text-sm font-bold text-white tabular-nums mb-0.5">
                            {userLocation.lat.toFixed(4)}° N
                          </div>
                          <div className="text-sm font-bold text-white tabular-nums">
                            {userLocation.lng.toFixed(4)}° E
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modern Footer Stats Bar */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-5"></div>
              <div className="relative bg-gradient-to-r from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-xl p-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Updates every second</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">Timezone: {settings.timezone}</span>
                    <div className="h-3 w-px bg-gray-700"></div>
                    <span className="text-gray-600 font-medium">SENTRIA © {new Date().getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}