import React from 'react';
import { BarChart3, Database } from 'lucide-react';

export default function Header({ onReset }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={onReset}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-100 group-hover:bg-indigo-700 transition">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">AI Data Analyst</span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                v1.0 Browser Edition
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Automated Data Quality Audit & Analysis</p>
          </div>
        </div>

        <nav className="flex items-center space-x-4">
          <button
            onClick={onReset}
            className="text-xs font-medium text-slate-600 hover:text-indigo-600 transition flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <Database className="w-4 h-4" />
            <span>New Audit</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
