/**
 * Automatically generates business insights and executive observations from analyzed data.
 * @param {Object} auditReport - Result from auditDataQuality
 * @param {Array<Object>} columnsAnalysis - Metadata from analyzeColumns
 * @param {number} totalRows - Total row count
 * @returns {Array<{type: string, title: string, description: string, badge: string}>}
 */
export function generateBusinessInsights(auditReport, columnsAnalysis, totalRows) {
  const insights = [];

  // 1. Overall Dataset Health Insight
  const score = auditReport.qualityScore;
  let healthBadge = 'High Quality';
  let healthDesc = `Data quality score is high (${score}/100). The dataset is well-structured and ready for analytical modeling.`;

  if (score < 60) {
    healthBadge = 'Needs Cleaning';
    healthDesc = `Data quality score is low (${score}/100). Pre-processing is required due to missing values or duplicate rows.`;
  } else if (score < 85) {
    healthBadge = 'Fair Quality';
    healthDesc = `Data quality score is fair (${score}/100). Minor missingness or duplicates detected; review data quality warnings.`;
  }

  insights.push({
    type: 'health',
    title: 'Dataset Health Summary',
    description: healthDesc,
    badge: healthBadge,
  });

  // 2. Numeric Column Key Drivers & Distributions
  const numericCols = columnsAnalysis.filter((c) => c.type === 'numeric' && c.numericStats);
  if (numericCols.length > 0) {
    numericCols.forEach((col) => {
      const { mean, median, min, max, stdDev } = col.numericStats;
      let skewNote = '';
      if (mean > median * 1.15) {
        skewNote = `The distribution is right-skewed (mean ${mean} > median ${median}), indicating high-value outliers pulling up the average.`;
      } else if (mean < median * 0.85) {
        skewNote = `The distribution is left-skewed (mean ${mean} < median ${median}), indicating low-value outliers.`;
      } else {
        skewNote = `The distribution is relatively symmetrical around the average (${mean}).`;
      }

      insights.push({
        type: 'distribution',
        title: `Metric Trend: ${col.name}`,
        description: `Ranging from ${min} to ${max} with an average of ${mean} (median: ${median}, std dev: ${stdDev}). ${skewNote}`,
        badge: 'Numeric Insight',
      });
    });
  }

  // 3. Top Categorical Dominance
  const stringCols = columnsAnalysis.filter(
    (c) => c.type === 'string' && c.categoricalStats && c.categoricalStats.length > 0
  );

  stringCols.slice(0, 3).forEach((col) => {
    const topItem = col.categoricalStats[0];
    if (topItem && topItem.percentage >= 30) {
      insights.push({
        type: 'category',
        title: `Dominant Category in "${col.name}"`,
        description: `"${topItem.value}" represents ${topItem.percentage}% of entries in "${col.name}" (${topItem.count} out of ${totalRows} rows).`,
        badge: 'Categorical Insight',
      });
    }
  });

  // 4. Data Cleaning Action Item Recommendations
  if (auditReport.duplicateRowCount > 0) {
    insights.push({
      type: 'action',
      title: 'Action Item: Deduplication Recommended',
      description: `Found ${auditReport.duplicateRowCount} duplicate rows. Deduplicating will prevent double-counting in business reports.`,
      badge: 'Action Required',
    });
  }

  if (auditReport.totalMissingCells > 0) {
    insights.push({
      type: 'action',
      title: 'Action Item: Missing Value Imputation',
      description: `Overall missing value rate is ${auditReport.missingnessPercentage}%. Consider imputing missing numeric values with medians or categorizing missing text as "Unknown".`,
      badge: 'Action Recommended',
    });
  }

  return insights;
}
