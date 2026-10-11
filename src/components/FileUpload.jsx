import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, AlertCircle, FileText, ArrowRight, Play } from 'lucide-react';
import { SAMPLE_DATASETS } from '../data/sampleDatasets';

export default function FileUpload({ onFileUpload, onSelectSample, isLoading }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setDragError(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (!file.name.toLowerCase().endsWith('.csv')) {
        setDragError('Only .csv files are supported. Please drop a valid CSV file.');
        return;
      }
      onFileUpload(file);
    }
  };

  const handleFileChange = (e) => {
    setDragError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* Hero Welcome Text */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-xs font-semibold mb-4">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Zero Server Uploads • 100% Private In-Browser Analytics</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Instant Data Quality Audit & Analysis
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Upload any CSV file to inspect schema types, detect duplicate rows and missing values, generate descriptive stats, and receive automated business insights.
        </p>
      </div>

      {/* Upload Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all bg-white ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-slate-400 shadow-sm'
        }`}
      >
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id="csv-file-input"
          disabled={isLoading}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <UploadCloud className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Drag & drop your CSV file here
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              or <span className="text-indigo-600 font-medium hover:underline">browse from your device</span>
            </p>
          </div>

          <p className="text-xs text-slate-400">
            Supports standard CSV files with header rows (.csv)
          </p>
        </div>
      </div>

      {dragError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{dragError}</span>
        </div>
      )}

      {/* Sample Data Preset Trigger */}
      <div className="mt-10 bg-slate-100/80 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-3 text-slate-800 font-semibold text-sm">
          <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
          <span>Don't have a CSV file handy? Test immediately with sample datasets:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAMPLE_DATASETS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className="flex flex-col text-left bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition group"
            >
              <div className="flex items-center justify-between font-semibold text-slate-800 group-hover:text-indigo-600">
                <span className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>{sample.name}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                {sample.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
