import React from 'react';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function DataAudit({ auditReport }) {
  const { issues } = auditReport;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800">Data Quality Audit</h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
          {issues.length} {issues.length === 1 ? 'Issue' : 'Issues'} Detected
        </span>
      </div>

      {issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center bg-emerald-50/50 rounded-xl border border-emerald-100">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
          <h4 className="font-semibold text-emerald-900">No Critical Data-Quality Issues Detected</h4>
          <p className="text-xs text-emerald-700 max-w-md mt-1">
            Your dataset has zero missing cells, no duplicate rows, and clean column formatting.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {issues.map((issue) => {
            let bgStyle = 'bg-slate-50 border-slate-200 text-slate-800';
            let icon = <Info className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />;
            let badgeText = 'INFO';
            let badgeBg = 'bg-indigo-100 text-indigo-800';

            if (issue.severity === 'critical') {
              bgStyle = 'bg-red-50/60 border-red-200 text-red-900';
              icon = <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />;
              badgeText = 'CRITICAL';
              badgeBg = 'bg-red-100 text-red-800';
            } else if (issue.severity === 'warning') {
              bgStyle = 'bg-amber-50/60 border-amber-200 text-amber-900';
              icon = <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />;
              badgeText = 'WARNING';
              badgeBg = 'bg-amber-100 text-amber-800';
            }

            return (
              <div
                key={issue.id}
                className={`p-4 rounded-xl border ${bgStyle} flex items-start space-x-3 transition hover:shadow-xs`}
              >
                {icon}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm">{issue.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeBg}`}>
                      {badgeText}
                    </span>
                  </div>
                  <p className="text-xs mt-1 text-slate-700 leading-relaxed">{issue.message}</p>
                  {issue.recommendation && (
                    <div className="mt-2 text-xs font-medium text-slate-600 bg-white/80 p-2 rounded-lg border border-slate-200/60 inline-block">
                      💡 <span className="font-semibold text-slate-800">Recommendation:</span> {issue.recommendation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
