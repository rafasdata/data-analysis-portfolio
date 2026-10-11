import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import OverviewCards from './components/OverviewCards';
import DataAudit from './components/DataAudit';
import ColumnStatsTable from './components/ColumnStatsTable';
import BusinessInsights from './components/BusinessInsights';
import Visualizations from './components/Visualizations';
import DataPreview from './components/DataPreview';

import { parseCSV } from './utils/csvParser';
import { analyzeColumns } from './utils/statsAnalyzer';
import { auditDataQuality } from './utils/auditEngine';
import { generateBusinessInsights } from './utils/insightsEngine';
import { AlertCircle, FileSpreadsheet, RefreshCw } from 'lucide-react';

export default function App() {
  const [dataset, setDataset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('audit');

  const processCSV = async (input, name = 'Uploaded File') => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const parsed = await parseCSV(input);
      const columnsAnalysis = analyzeColumns(parsed.data, parsed.headers);
      const auditReport = auditDataQuality(parsed.data, parsed.headers, columnsAnalysis);
      const insights = generateBusinessInsights(auditReport, columnsAnalysis, parsed.rowCount);

      setDataset({
        name,
        data: parsed.data,
        headers: parsed.headers,
        rowCount: parsed.rowCount,
        colCount: parsed.colCount,
        columnsAnalysis,
        auditReport,
        insights,
        errors: parsed.errors,
      });
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while processing the CSV file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    processCSV(file, file.name);
  };

  const handleSelectSample = (sample) => {
    processCSV(sample.content, `${sample.name} (${sample.filename})`);
  };

  const handleReset = () => {
    setDataset(null);
    setErrorMessage(null);
    setActiveTab('audit');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header onReset={handleReset} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 text-red-800 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-sm">Failed to process CSV file</h4>
              <p className="text-xs mt-1 text-red-700">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-semibold text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-600">Analyzing dataset structure & computing stats...</p>
          </div>
        )}

        {!dataset && !isLoading && (
          <FileUpload
            onFileUpload={handleFileUpload}
            onSelectSample={handleSelectSample}
            isLoading={isLoading}
          />
        )}

        {dataset && !isLoading && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-bold text-slate-900 text-lg">{dataset.name}</h1>
                  <p className="text-xs text-slate-500">
                    {dataset.rowCount.toLocaleString()} rows • {dataset.colCount} columns
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Upload Another Dataset</span>
              </button>
            </div>

            <OverviewCards
              rowCount={dataset.rowCount}
              colCount={dataset.colCount}
              auditReport={dataset.auditReport}
              datasetName={dataset.name}
            />

            <div className="border-b border-slate-200 flex space-x-8 text-sm font-semibold">
              <button
                onClick={() => setActiveTab('audit')}
                className={`pb-3 relative transition ${
                  activeTab === 'audit'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Data Quality Audit ({dataset.auditReport.issues.length})
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`pb-3 relative transition ${
                  activeTab === 'insights'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Business Insights
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`pb-3 relative transition ${
                  activeTab === 'stats'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Descriptive Stats
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`pb-3 relative transition ${
                  activeTab === 'preview'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Raw Data Preview
              </button>
            </div>

            <div className="space-y-8">
              {activeTab === 'audit' && (
                <>
                  <DataAudit auditReport={dataset.auditReport} />
                  <Visualizations
                    columnsAnalysis={dataset.columnsAnalysis}
                    auditReport={dataset.auditReport}
                  />
                </>
              )}

              {activeTab === 'insights' && (
                <BusinessInsights insights={dataset.insights} />
              )}

              {activeTab === 'stats' && (
                <ColumnStatsTable columnsAnalysis={dataset.columnsAnalysis} />
              )}

              {activeTab === 'preview' && (
                <DataPreview data={dataset.data} headers={dataset.headers} />
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>AI Data Analyst • Client-side data quality audit & exploratory analytics app</p>
      </footer>
    </div>
  );
}
