import { describe, it, expect } from 'vitest';
import { auditDataQuality } from '../auditEngine';
import { generateBusinessInsights } from '../insightsEngine';

describe('auditEngine', () => {
  it('detects duplicate rows and high missingness', () => {
    const data = [
      { id: '1', name: 'Alice', score: '90' },
      { id: '1', name: 'Alice', score: '90' },
      { id: '2', name: 'Bob', score: '' },
      { id: '3', name: '', score: '' },
    ];
    const headers = ['id', 'name', 'score'];
    const columnsAnalysis = [
      { name: 'id', type: 'string', missingCount: 0, missingPercentage: 0, uniqueCount: 3 },
      { name: 'name', type: 'string', missingCount: 1, missingPercentage: 25, uniqueCount: 2 },
      { name: 'score', type: 'numeric', missingCount: 2, missingPercentage: 50, uniqueCount: 1, numericStats: { count: 2, min: 90, max: 90, mean: 90, median: 90, q25: 90, q75: 90 } },
    ];

    const report = auditDataQuality(data, headers, columnsAnalysis);
    expect(report.duplicateRowCount).toBe(1);
    expect(report.totalMissingCells).toBe(3);
    expect(report.issues.some((i) => i.id === 'duplicate_rows')).toBe(true);
    expect(report.qualityScore).toBeLessThan(100);
  });
});

describe('insightsEngine', () => {
  it('generates health summaries and metric insights', () => {
    const auditReport = {
      qualityScore: 90,
      duplicateRowCount: 0,
      totalMissingCells: 0,
      missingnessPercentage: 0,
      issues: [],
    };
    const columnsAnalysis = [
      {
        name: 'Revenue',
        type: 'numeric',
        numericStats: { mean: 150, median: 100, min: 20, max: 500, stdDev: 80, count: 10 },
      },
      {
        name: 'Region',
        type: 'string',
        categoricalStats: [{ value: 'North America', count: 7, percentage: 70 }],
      },
    ];

    const insights = generateBusinessInsights(auditReport, columnsAnalysis, 10);
    expect(insights.length).toBeGreaterThanOrEqual(3);
    expect(insights[0].title).toBe('Dataset Health Summary');
    expect(insights[1].title).toContain('Revenue');
    expect(insights[2].title).toContain('Region');
  });
});
