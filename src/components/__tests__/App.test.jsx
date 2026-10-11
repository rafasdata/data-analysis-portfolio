import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';

describe('App Component Integration', () => {
  it('renders homepage title and sample data button', () => {
    render(<App />);
    expect(screen.getAllByText('AI Data Analyst').length).toBeGreaterThan(0);
    expect(screen.getByText('Instant Data Quality Audit & Analysis')).toBeInTheDocument();
    expect(screen.getByText('E-Commerce Sales & Orders')).toBeInTheDocument();
  });

  it('loads sample dataset on click and displays executive summary cards', async () => {
    render(<App />);

    // Click sample dataset button
    const sampleBtn = screen.getByText('E-Commerce Sales & Orders');
    fireEvent.click(sampleBtn);

    // Verify dataset overview elements appear
    await waitFor(() => {
      expect(screen.getByText('Dataset Executive Summary')).toBeInTheDocument();
    });

    expect(screen.getAllByText(/Data Quality Audit/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Business Insights')).toBeInTheDocument();
  });

  it('allows tab switching between audit, insights, descriptive stats, and raw data preview', async () => {
    render(<App />);

    // Load sample data
    const sampleBtn = screen.getByText('E-Commerce Sales & Orders');
    fireEvent.click(sampleBtn);

    await waitFor(() => {
      expect(screen.getByText('Dataset Executive Summary')).toBeInTheDocument();
    });

    // Switch to Descriptive Stats tab
    const statsTab = screen.getByText('Descriptive Stats');
    fireEvent.click(statsTab);
    expect(screen.getByText('Column Data Types & Descriptive Statistics')).toBeInTheDocument();

    // Switch to Business Insights tab
    const insightsTab = screen.getByText('Business Insights');
    fireEvent.click(insightsTab);
    expect(screen.getByText('Automated Business Insights')).toBeInTheDocument();

    // Switch to Raw Data Preview tab
    const previewTab = screen.getByText('Raw Data Preview');
    fireEvent.click(previewTab);
    expect(screen.getByPlaceholderText('Search rows...')).toBeInTheDocument();
  });
});
