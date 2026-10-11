import { describe, it, expect } from 'vitest';
import { SAMPLE_DATASETS } from '../sampleDatasets';
import { parseCSV } from '../../utils/csvParser';

describe('sampleDatasets', () => {
  it('has valid embedded CSV samples that parse without errors', async () => {
    expect(SAMPLE_DATASETS.length).toBeGreaterThan(0);
    for (const sample of SAMPLE_DATASETS) {
      const parsed = await parseCSV(sample.content);
      expect(parsed.rowCount).toBeGreaterThan(0);
      expect(parsed.headers.length).toBeGreaterThan(0);
    }
  });
});
