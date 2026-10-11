import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { BarChart2, PieChart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Visualizations({ columnsAnalysis }) {
  const missingnessLabels = columnsAnalysis.map((c) => c.name);
  const missingnessValues = columnsAnalysis.map((c) => c.missingPercentage);

  const missingChartData = {
    labels: missingnessLabels,
    datasets: [
      {
        label: 'Missing Values (%)',
        data: missingnessValues,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const missingChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}% missing`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const stringCol = columnsAnalysis.find(
    (c) => c.type === 'string' && c.categoricalStats && c.categoricalStats.length > 0
  );

  let categoryChartData = null;
  if (stringCol) {
    categoryChartData = {
      labels: stringCol.categoricalStats.map((s) => s.value),
      datasets: [
        {
          label: 'Count',
          data: stringCol.categoricalStats.map((s) => s.count),
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(139, 92, 246, 0.8)',
          ],
          borderWidth: 0,
        },
      ],
    };
  }

  const numericCols = columnsAnalysis.filter((c) => c.type === 'numeric' && c.numericStats);
  let numericChartData = null;
  if (numericCols.length > 0) {
    numericChartData = {
      labels: numericCols.map((c) => c.name),
      datasets: [
        {
          label: 'Average (Mean)',
          data: numericCols.map((c) => c.numericStats.mean),
          backgroundColor: 'rgba(99, 102, 241, 0.7)',
          borderRadius: 6,
        },
        {
          label: 'Median',
          data: numericCols.map((c) => c.numericStats.median),
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
          borderRadius: 6,
        },
      ],
    };
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart2 className="w-5 h-5 text-indigo-600" />
          <h4 className="font-bold text-slate-800 text-sm">Column Missingness (%)</h4>
        </div>
        <div className="h-64 relative">
          <Bar data={missingChartData} options={missingChartOptions} />
        </div>
      </div>

      {stringCol && categoryChartData ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-slate-800 text-sm">
              Top Categories in "{stringCol.name}"
            </h4>
          </div>
          <div className="h-64 relative flex items-center justify-center">
            <Doughnut
              data={categoryChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } },
              }}
            />
          </div>
        </div>
      ) : numericChartData ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-slate-800 text-sm">Numeric Metric Averages</h4>
          </div>
          <div className="h-64 relative">
            <Bar
              data={numericChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
