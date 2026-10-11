import { describe, it, expect } from 'vitest';
import { parseCSV } from '../csvParser';
import { inferColumnType, calculateNumericStats, analyzeColumns } from '../statsAnalyzer';

describe('csvParser', () => {
  it('parses valid CSV string correctly', async () => {
    const csvContent = 'name,age,salary\nAlice,30,70000\nBob,25,50000';
    const result = await parseCSV(csvContent);
    expect(result.headers).toEqual(['name', 'age', 'salary']);
    expect(result.rowCount).toBe(2);
    expect(result.colCount).toBe(3);
    expect(result.data[0]).toEqual({ name: 'Alice', age: '30', salary: '70000' });
  });

  it('rejects empty input', async () => {
    await expect(parseCSV('')).rejects.toThrow('The provided CSV string is empty.');
  });
});

describe('statsAnalyzer', () => {
  it('infers column types correctly', () => {
    expect(inferColumnType(['10', '20.5', '30'])).toBe('numeric');
    expect(inferColumnType(['true', 'false', 'true'])).toBe('boolean');
    expect(inferColumnType(['2023-01-01', '2023-05-12'])).toBe('date');
    expect(inferColumnType(['Apple', 'Banana', 'Cherry'])).toBe('string');
  });

  it('calculates numeric stats accurately', () => {
    const nums = [10, 20, 30, 40, 50];
    const stats = calculateNumericStats(nums);
    expect(stats.mean).toBe(30);
    expect(stats.median).toBe(30);
    expect(stats.min).toBe(10);
    expect(stats.max).toBe(50);
    expect(stats.q25).toBe(20);
    expect(stats.q75).toBe(40);
  });

  it('analyzes columns metadata', () => {
    const data = [
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
      { name: 'Charlie', age: '' },
    ];
    const headers = ['name', 'age'];
    const columns = analyzeColumns(data, headers);
    expect(columns.length).toBe(2);
    expect(columns[0].name).toBe('name');
    expect(columns[1].missingCount).toBe(1);
    expect(columns[1].missingPercentage).toBe(33.3);
  });
});
