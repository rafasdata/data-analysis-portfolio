/**
 * Infers the data type of values in a column.
 * Returned types: 'numeric', 'boolean', 'date', 'string'
 * @param {Array<any>} values - Array of raw row values for a given column
 * @returns {string} - Inferred data type
 */
export function inferColumnType(values) {
  const nonNullValues = values.filter(
    (v) => v !== null && v !== undefined && v !== '' && String(v).trim() !== ''
  );

  if (nonNullValues.length === 0) {
    return 'string';
  }

  let numericCount = 0;
  let booleanCount = 0;
  let dateCount = 0;

  for (const val of nonNullValues) {
    const strVal = String(val).trim();

    // Check boolean
    if (['true', 'false', '1', '0', 'yes', 'no'].includes(strVal.toLowerCase())) {
      booleanCount++;
    }

    // Check numeric
    const cleanNumStr = strVal.replace(/[\$,]/g, '');
    if (!isNaN(cleanNumStr) && cleanNumStr !== '' && !isNaN(parseFloat(cleanNumStr))) {
      numericCount++;
    }

    // Check date
    if (strVal.length >= 6 && !isNaN(Date.parse(strVal)) && isNaN(Number(strVal))) {
      dateCount++;
    }
  }

  const threshold = 0.7;
  const total = nonNullValues.length;

  if (numericCount / total >= threshold) return 'numeric';
  if (booleanCount / total >= threshold) return 'boolean';
  if (dateCount / total >= threshold) return 'date';

  return 'string';
}

/**
 * Calculates descriptive statistics for a numeric array of values.
 * @param {Array<number>} numbers
 * @returns {Object} { count, missingCount, mean, median, stdDev, min, max, q25, q75, sum }
 */
export function calculateNumericStats(numbers) {
  const validNums = numbers
    .map((v) => {
      if (v === null || v === undefined || v === '') return null;
      const clean = String(v).replace(/[\$,]/g, '');
      const num = parseFloat(clean);
      return isNaN(num) ? null : num;
    })
    .filter((v) => v !== null);

  const missingCount = numbers.length - validNums.length;

  if (validNums.length === 0) {
    return {
      count: 0,
      missingCount,
      mean: null,
      median: null,
      stdDev: null,
      min: null,
      max: null,
      q25: null,
      q75: null,
      sum: null,
    };
  }

  validNums.sort((a, b) => a - b);

  const count = validNums.length;
  const sum = validNums.reduce((acc, val) => acc + val, 0);
  const mean = sum / count;

  const getPercentile = (p) => {
    const idx = (count - 1) * p;
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    if (lower === upper) return validNums[lower];
    return validNums[lower] + (validNums[upper] - validNums[lower]) * (idx - lower);
  };

  const median = getPercentile(0.5);
  const q25 = getPercentile(0.25);
  const q75 = getPercentile(0.75);

  const variance =
    count > 1
      ? validNums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (count - 1)
      : 0;
  const stdDev = Math.sqrt(variance);

  return {
    count,
    missingCount,
    mean: Number(mean.toFixed(2)),
    median: Number(median.toFixed(2)),
    stdDev: Number(stdDev.toFixed(2)),
    min: Number(validNums[0].toFixed(2)),
    max: Number(validNums[count - 1].toFixed(2)),
    q25: Number(q25.toFixed(2)),
    q75: Number(q75.toFixed(2)),
    sum: Number(sum.toFixed(2)),
  };
}

/**
 * Calculates value frequencies for categorical/string columns.
 * @param {Array<any>} values
 * @param {number} topN
 * @returns {Array<{value: string, count: number, percentage: number}>}
 */
export function calculateCategoricalStats(values, topN = 5) {
  const counts = {};
  let totalValid = 0;

  values.forEach((v) => {
    if (v !== null && v !== undefined && String(v).trim() !== '') {
      const strVal = String(v).trim();
      counts[strVal] = (counts[strVal] || 0) + 1;
      totalValid++;
    }
  });

  const sorted = Object.entries(counts)
    .map(([value, count]) => ({
      value,
      count,
      percentage: totalValid > 0 ? Number(((count / totalValid) * 100).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return sorted.slice(0, topN);
}

/**
 * Calculates complete column metadata analysis for a dataset.
 * @param {Array<Object>} data
 * @param {Array<string>} headers
 */
export function analyzeColumns(data, headers) {
  const rowCount = data.length;

  return headers.map((header) => {
    const rawValues = data.map((row) => row[header]);
    const inferredType = inferColumnType(rawValues);

    const missingCount = rawValues.filter(
      (v) => v === null || v === undefined || v === '' || String(v).trim() === ''
    ).length;
    const missingPercentage =
      rowCount > 0 ? Number(((missingCount / rowCount) * 100).toFixed(1)) : 0;

    const uniqueValues = new Set(
      rawValues
        .filter((v) => v !== null && v !== undefined && String(v).trim() !== '')
        .map((v) => String(v).trim())
    );

    let numericStats = null;
    let categoricalStats = null;

    if (inferredType === 'numeric') {
      numericStats = calculateNumericStats(rawValues);
    }

    categoricalStats = calculateCategoricalStats(rawValues, 5);

    return {
      name: header,
      type: inferredType,
      missingCount,
      missingPercentage,
      uniqueCount: uniqueValues.size,
      numericStats,
      categoricalStats,
    };
  });
}
