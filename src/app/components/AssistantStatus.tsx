import { Mic, TrendingUp, Users, Zap, Brain, MessageSquare } from 'lucide-react';

const assistants = [
  {
    id: 1,
    name: 'Neural Voice Pro',
    status: 'online',
    category: 'Customer Service',
    interactions: 12847,
    accuracy: 97,
    avgResponseTime: '0.8s',
    color: 'indigo',
  },
  {
    id: 2,
    name: 'SentiBot Analytics',
    status: 'online',
    category: 'Data Analysis',
    interactions: 8563,
    accuracy: 95,
    avgResponseTime: '1.2s',
    color: 'purple',
  },
  {
    id: 3,
    name: 'SmartAssist Plus',
    status: 'online',
    category: 'Sales & Support',
    interactions: 6492,
    accuracy: 98,
    avgResponseTime: '0.6s',
    color: 'violet',
  },
  {
    id: 4,
    name: 'ConversaAI',
    status: 'training',
    category: 'Multi-Language',
    interactions: 3245,
    accuracy: 93,
    avgResponseTime: '1.5s',
    color: 'blue',
  },
];

export function AssistantStatus() {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      indigo: { bg: 'from-blue-600/20 to-blue-600/5', border: 'border-blue-500/30', text: 'text-blue-400' },
      purple: { bg: 'from-purple-600/20 to-purple-600/5', border: 'border-purple-500/30', text: 'text-purple-400' },
      violet: { bg: 'from-purple-700/20 to-purple-700/5', border: 'border-purple-500/30', text: 'text-purple-400' },
      blue: { bg: 'from-blue-700/20 to-blue-700/5', border: 'border-blue-500/30', text: 'text-blue-400' },
    };
    return colors[color] || colors.indigo;
  };

  return (
    <div className="bg-gradient-to-br from-[#0d1128] to-[#070b1f] border border-blue-500/20 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-400" />
          <h3 className="text-white text-lg font-semibold">AI Assistant Network</h3>
        </div>
        <button 
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          onClick={() => console.log('Deploy new AI clicked')}
          aria-label="Deploy new AI assistant"
        >
          Deploy New AI
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assistants.map((assistant) => {
          const colors = getColorClasses(assistant.color);
          return (
            <button 
              key={assistant.id} 
              className={`w-full text-left bg-gradient-to-br ${colors.bg} rounded-xl p-5 border ${colors.border} hover:scale-[1.02] transition-all group focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
              onClick={() => console.log('Assistant clicked:', assistant.id)}
              aria-label={`${assistant.name}. ${assistant.category}. Status: ${assistant.status}. ${assistant.interactions} sessions, ${assistant.accuracy}% accuracy, ${assistant.avgResponseTime} response time`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform`} aria-hidden="true">
                    <Mic className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{assistant.name}</h4>
                    <p className="text-xs text-gray-400">{assistant.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${assistant.status === 'online' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'} animate-pulse`} aria-hidden="true" />
                  <span className={`text-xs font-medium ${assistant.status === 'online' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {assistant.status === 'online' ? 'Active' : 'Training'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#121633]/50 rounded-lg p-2.5 border border-blue-500/10">
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                    <MessageSquare className="w-3 h-3" aria-hidden="true" />
                    <span>Sessions</span>
                  </div>
                  <p className="text-white font-semibold">{assistant.interactions.toLocaleString()}</p>
                </div>
                <div className="bg-[#121633]/50 rounded-lg p-2.5 border border-blue-500/10">
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    <span>Accuracy</span>
                  </div>
                  <p className="text-white font-semibold">{assistant.accuracy}%</p>
                </div>
                <div className="bg-[#121633]/50 rounded-lg p-2.5 border border-blue-500/10">
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                    <Zap className="w-3 h-3" aria-hidden="true" />
                    <span>Speed</span>
                  </div>
                  <p className="text-white font-semibold">{assistant.avgResponseTime}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}