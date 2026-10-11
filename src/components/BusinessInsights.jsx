import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

export default function BusinessInsights({ insights }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-indigo-800/60">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-white">Automated Business Insights</h3>
            <p className="text-xs text-indigo-200">Rule-based analytical summaries & executive recommendations</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((item, idx) => {
          let badgeColor = 'bg-indigo-500/20 text-indigo-200 border-indigo-500/30';
          if (item.type === 'health') {
            badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
          } else if (item.type === 'action') {
            badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
          }

          return (
            <div
              key={idx}
              className="bg-slate-800/70 border border-indigo-900/80 hover:border-indigo-700/80 p-4 rounded-xl transition backdrop-blur-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-100 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    <span>{item.title}</span>
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
