import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'indigo' | 'violet';
  onClick?: () => void;
}

export function StatCard({ title, value, change, trend, icon: Icon, color, onClick }: StatCardProps) {
  const { t } = useTranslation();
  
  const colorClasses = {
    blue: {
      gradient: 'from-blue-600/20 via-blue-600/10 to-transparent',
      border: 'border-blue-500/30',
      icon: 'from-blue-600 to-blue-700',
      iconText: 'text-blue-100',
      glow: 'shadow-blue-500/20',
    },
    purple: {
      gradient: 'from-purple-600/20 via-purple-600/10 to-transparent',
      border: 'border-purple-500/30',
      icon: 'from-purple-600 to-purple-700',
      iconText: 'text-purple-100',
      glow: 'shadow-purple-500/20',
    },
    indigo: {
      gradient: 'from-blue-700/20 via-blue-700/10 to-transparent',
      border: 'border-blue-500/30',
      icon: 'from-blue-700 to-purple-600',
      iconText: 'text-blue-100',
      glow: 'shadow-blue-500/20',
    },
    violet: {
      gradient: 'from-purple-700/20 via-purple-700/10 to-transparent',
      border: 'border-purple-500/30',
      icon: 'from-purple-700 to-purple-600',
      iconText: 'text-purple-100',
      glow: 'shadow-purple-500/20',
    },
  };

  const colors = colorClasses[color];

  const cardContent = (
    <>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">{title}</p>
          <h3 className="text-4xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{value}</h3>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : <TrendingDown className="w-3 h-3 text-red-400" />}
              <span className={`text-sm font-semibold ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {change}
              </span>
            </div>
            <span className="text-xs text-gray-500">{t('stats.vsLastPeriod')}</span>
          </div>
        </div>
        <div className={`p-4 rounded-xl bg-gradient-to-br ${colors.icon} shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className={`w-6 h-6 ${colors.iconText}`} />
        </div>
      </div>
      {onClick && (
        <div className="mt-4 pt-4 border-t border-blue-500/10">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View Details</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`w-full text-left bg-gradient-to-br ${colors.gradient} backdrop-blur-sm border ${colors.border} rounded-2xl p-6 shadow-xl ${colors.glow} hover:scale-[1.02] hover:border-blue-400/50 transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
      >
        {cardContent}
      </button>
    );
  }

  return (
    <div className={`bg-gradient-to-br ${colors.gradient} backdrop-blur-sm border ${colors.border} rounded-2xl p-6 shadow-xl ${colors.glow} hover:scale-[1.02] transition-all group`}>
      {cardContent}
    </div>
  );
}