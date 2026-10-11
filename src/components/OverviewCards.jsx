import React from 'react';
import { Table, Columns, AlertTriangle, Copy, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function OverviewCards({ rowCount, colCount, auditReport, datasetName }) {
  const { qualityScore, duplicateRowCount, totalMissingCells, missingnessPercentage } = auditReport;

  let scoreColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (qualityScore < 60) {
    scoreColor = 'text-red-600 bg-red-50 border-red-200';
  } else if (qualityScore < 85) {
    scoreColor = 'text-amber-600 bg-amber-50 border-amber-200';
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Dataset Executive Summary</h2>
          <p className="text-xs text-slate-500">File: <span className="font-semibold text-slate-700">{datasetName}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Rows Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Rows</span>
            <Table className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900">{rowCount.toLocaleString()}</span>
            <p className="text-xs text-slate-400 mt-0.5">Records</p>
          </div>
        </div>

        {/* Total Columns Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Columns</span>
            <Columns className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900">{colCount}</span>
            <p className="text-xs text-slate-400 mt-0.5">Features</p>
          </div>
        </div>

        {/* Missing Values Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Missing Cells</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900">{totalMissingCells.toLocaleString()}</span>
            <p className="text-xs font-medium text-slate-500 mt-0.5">{missingnessPercentage}% overall</p>
          </div>
        </div>

        {/* Duplicate Rows Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Duplicates</span>
            <Copy className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl font-extrabold text-slate-900">{duplicateRowCount}</span>
            <p className="text-xs text-slate-400 mt-0.5">Duplicate rows</p>
          </div>
        </div>

        {/* Data Quality Score Card */}
        <div className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between ${scoreColor}`}>
          <div className="flex items-center justify-between opacity-80">
            <span className="text-xs font-semibold uppercase tracking-wider">Quality Score</span>
            {qualityScore >= 85 ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <ShieldAlert className="w-4 h-4" />
            )}
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black">{qualityScore}/100</span>
            <p className="text-xs font-semibold mt-0.5 opacity-90">Data Health Index</p>
          </div>
        </div>
      </div>
    </div>
  );
}
