import Papa from 'papaparse';

/**
 * Parses a CSV string or File using PapaParse with error checking.
 * @param {File|string} input - File object or CSV raw string
 * @returns {Promise<{data: Array<Object>, headers: Array<string>, rowCount: number, colCount: number, errors: Array<string>}>}
 */
export function parseCSV(input) {
  return new Promise((resolve, reject) => {
    if (input === null || input === undefined) {
      return reject(new Error('No CSV file or data provided. Please upload a valid CSV file.'));
    }

    if (typeof input === 'string' && input.trim() === '') {
      return reject(new Error('The provided CSV string is empty.'));
    }

    // Check file extension / type if input is a File object
    if (typeof File !== 'undefined' && input instanceof File) {
      if (!input.name.toLowerCase().endsWith('.csv') && input.type && !input.type.includes('csv') && !input.type.includes('text')) {
        return reject(new Error('Invalid file type. Please upload a file with a .csv extension.'));
      }
      if (input.size === 0) {
        return reject(new Error('The uploaded CSV file is empty.'));
      }
    }

    Papa.parse(input, {
      header: true,
      skipEmptyLines: 'greedy',
      dynamicTyping: false,
      complete: (results) => {
        const errors = [];

        if (results.errors && results.errors.length > 0) {
          results.errors.forEach((err) => {
            if (err.type === 'Quotes' || err.type === 'FieldMismatch') {
              errors.push(`Row ${err.row !== undefined ? err.row + 1 : 'unknown'}: ${err.message}`);
            }
          });
        }

        const data = results.data || [];
        const headers = results.meta && results.meta.fields ? results.meta.fields.filter(h => h && h.trim() !== '') : [];

        if (headers.length === 0) {
          return reject(new Error('Could not detect column headers in the CSV file. Please check the file formatting.'));
        }

        if (data.length === 0) {
          return reject(new Error('The CSV file contains column headers but no data rows.'));
        }

        // Clean headers (trim whitespace)
        const cleanedHeaders = headers.map(h => h.trim());
        const cleanedData = data.map(row => {
          const cleanRow = {};
          cleanedHeaders.forEach((header, index) => {
            const rawKey = headers[index];
            let val = row[rawKey];
            if (val === undefined || val === null) {
              val = '';
            } else if (typeof val === 'string') {
              val = val.trim();
            }
            cleanRow[header] = val;
          });
          return cleanRow;
        });

        resolve({
          data: cleanedData,
          headers: cleanedHeaders,
          rowCount: cleanedData.length,
          colCount: cleanedHeaders.length,
          errors,
        });
      },
      error: (err) => {
        reject(new Error(`Failed to parse CSV file: ${err.message}`));
      },
    });
  });
}
