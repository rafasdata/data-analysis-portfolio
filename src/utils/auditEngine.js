/**
 * Audits a dataset for data-quality issues.
 * @param {Array<Object>} data - Rows of data
 * @param {Array<string>} headers - Column headers
 * @param {Array<Object>} columnsAnalysis - Column metadata from statsAnalyzer
 * @returns {Object} Audit report containing issues list, metrics, duplicate count, and quality score (0-100)
 */
export function auditDataQuality(data, headers, columnsAnalysis) {
  const issues = [];
  const totalRows = data.length;
  const totalCols = headers.length;

  if (totalRows === 0 || totalCols === 0) {
    return {
      qualityScore: 0,
      duplicateRowCount: 0,
      totalMissingCells: 0,
      missingnessPercentage: 0,
      issues: [{ severity: 'critical', type: 'empty_dataset', message: 'Dataset is empty.' }],
    };
  }

  // 1. Check duplicate rows
  const rowStrings = data.map((row) => JSON.stringify(row));
  const uniqueRowStrings = new Set(rowStrings);
  const duplicateRowCount = totalRows - uniqueRowStrings.size;

  if (duplicateRowCount > 0) {
    const dupPercentage = ((duplicateRowCount / totalRows) * 100).toFixed(1);
    issues.push({
      id: 'duplicate_rows',
      severity: duplicateRowCount / totalRows > 0.1 ? 'warning' : 'info',
      type: 'duplicates',
      title: 'Duplicate Rows Detected',
      message: `Found ${duplicateRowCount} duplicate row(s) (${dupPercentage}% of dataset). Duplicate rows may distort aggregate calculations.`,
      recommendation: 'Consider removing duplicate records prior to reporting.',
    });
  }

  // 2. Check total cell missingness
  let totalMissingCells = 0;
  const totalCells = totalRows * totalCols;

  columnsAnalysis.forEach((col) => {
    totalMissingCells += col.missingCount;

    // Check individual column missingness
    if (col.missingPercentage > 50) {
      issues.push({
        id: `high_missing_${col.name}`,
        severity: 'warning',
        type: 'missing_values',
        title: `High Missingness in Column "${col.name}"`,
        message: `Column "${col.name}" has ${col.missingCount} missing value(s) (${col.missingPercentage}% missing).`,
        recommendation: 'Columns with >50% missing values should be considered for exclusion or imputation.',
      });
    } else if (col.missingPercentage > 10) {
      issues.push({
        id: `mod_missing_${col.name}`,
        severity: 'info',
        type: 'missing_values',
        title: `Moderate Missingness in Column "${col.name}"`,
        message: `Column "${col.name}" has ${col.missingCount} missing value(s) (${col.missingPercentage}% missing).`,
        recommendation: 'Fill missing entries with median/mode or review upstream data collection.',
      });
    }

    // Check constant / zero variance columns
    if (col.uniqueCount === 1 && totalRows > 1) {
      issues.push({
        id: `constant_col_${col.name}`,
        severity: 'info',
        type: 'constant_column',
        title: `Constant Column "${col.name}"`,
        message: `Column "${col.name}" contains only a single unique value across all rows.`,
        recommendation: 'Zero-variance columns provide no predictive power and can be dropped.',
      });
    }

    // Check potential numerical outliers using IQR method
    if (col.type === 'numeric' && col.numericStats && col.numericStats.count >= 5) {
      const { q25, q75, min, max } = col.numericStats;
      const iqr = q75 - q25;
      if (iqr > 0) {
        const lowerBound = q25 - 1.5 * iqr;
        const upperBound = q75 + 1.5 * iqr;

        if (min < lowerBound || max > upperBound) {
          issues.push({
            id: `outlier_${col.name}`,
            severity: 'info',
            type: 'outliers',
            title: `Potential Outliers in "${col.name}"`,
            message: `Range [${min}, ${max}] extends beyond expected IQR boundaries [${Number(lowerBound.toFixed(2))}, ${Number(upperBound.toFixed(2))}].`,
            recommendation: 'Verify if extreme values are legitimate measurements or recording errors.',
          });
        }
      }
    }
  });

  const missingnessPercentage = Number(((totalMissingCells / totalCells) * 100).toFixed(1));

  let penalty = 0;
  penalty += Math.min(40, (totalMissingCells / totalCells) * 100 * 1.5);
  penalty += Math.min(30, (duplicateRowCount / totalRows) * 100 * 2);
  const warningCount = issues.filter((i) => i.severity === 'warning').length;
  penalty += warningCount * 10;

  const qualityScore = Math.max(0, Math.min(100, Math.round(100 - penalty)));

  return {
    qualityScore,
    duplicateRowCount,
    totalMissingCells,
    missingnessPercentage,
    issues,
  };
}
