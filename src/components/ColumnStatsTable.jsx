import React from 'react';
import { Table } from 'lucide-react';

export default function ColumnStatsTable({ columnsAnalysis }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Table className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-800">Column Data Types & Descriptive Statistics</h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <th className="py-3 px-4">Column Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Missing</th>
              <th className="py-3 px-4">Unique Values</th>
              <th className="py-3 px-4">Mean / Avg</th>
              <th className="py-3 px-4">Median</th>
              <th className="py-3 px-4">Std Dev</th>
              <th className="py-3 px-4">Min - Max</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {columnsAnalysis.map((col) => {
              const typeBadges = {
                numeric: 'bg-blue-50 text-blue-700 border-blue-200',
                string: 'bg-slate-100 text-slate-700 border-slate-200',
                date: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                boolean: 'bg-purple-50 text-purple-700 border-purple-200',
              };

              return (
                <tr key={col.name} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{col.name}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        typeBadges[col.type] || typeBadges.string
                      }`}
                    >
                      {col.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {col.missingCount > 0 ? (
                      <span className="font-semibold text-amber-600">
                        {col.missingCount} ({col.missingPercentage}%)
                      </span>
                    ) : (
                      <span className="text-slate-400">0 (0%)</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-medium">{col.uniqueCount}</td>
                  <td className="py-3.5 px-4 font-mono">
                    {col.numericStats ? col.numericStats.mean : '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {col.numericStats ? col.numericStats.median : '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {col.numericStats ? col.numericStats.stdDev : '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {col.numericStats
                      ? `${col.numericStats.min} to ${col.numericStats.max}`
                      : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
