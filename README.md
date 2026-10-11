# AI Data Analyst 📊

**AI Data Analyst** is an interactive, beginner-friendly web application designed for automated CSV data-quality auditing, descriptive statistics, and rule-based business insights generation directly in the browser.

Built with React, Vite, Tailwind CSS, PapaParse, and Chart.js, it operates **100% client-side** with zero server uploads, preserving privacy while delivering instant analytical insights.

---

## 🚀 What the Project Does

1. **Clean Professional Homepage & CSV Drag-and-Drop**: Upload any CSV file from your computer or test immediately using built-in sample datasets (e.g., E-Commerce Sales & Customer Support Churn).
2. **Automated Schema & Summary Overview**:
   - Total number of rows and columns
   - Data Quality Score (0 - 100)
   - Total missing cells and overall missingness percentage
   - Duplicate row count detection
3. **Data Quality Audit Engine**:
   - Identifies duplicate records distorting aggregate reports
   - Highlights high missingness (>10% and >50%) per column with actionable resolution advice
   - Detects constant / zero-variance columns
   - Flags potential statistical outliers via Interquartile Range (IQR) analysis
4. **Descriptive Statistics & Data Types**:
   - Inferred data types (`numeric`, `string`, `date`, `boolean`)
   - Comprehensive numerical stats: Mean, Median, Standard Deviation, Min, Max, and Percentiles (25th, 75th)
   - Categorical top value frequency distributions
5. **Interactive Visualizations**:
   - Missingness distribution bar charts
   - Categorical slice distributions (Doughnut charts)
   - Metric comparison charts (Mean vs Median)
6. **Automated Business Insights**:
   - Executive data health summaries
   - Trend observations (distribution skewness, average ranges)
   - Dominant category drivers
   - Recommended data cleaning action items
7. **Searchable Data Preview**:
   - Paginated raw data table with search filtering and missing value highlighting

---

## 💻 Tech Stack

- **Frontend Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS 3
- **CSV Parsing**: PapaParse 5
- **Charts & Visualizations**: Chart.js 4 + react-chartjs-2
- **Icons**: Lucide React
- **Unit & Component Testing**: Vitest + React Testing Library

---

## ⚙️ How to Install & Run Locally

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rafasdata/data-analysis-portfolio.git
   cd data-analysis-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🧪 How to Run Tests

Run unit tests and UI component integration tests using Vitest:

```bash
npm test
```

To run tests in watch mode during development:
```bash
npm run test:watch
```

---

## 🌐 Deployment to GitHub Pages

This project includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

### Enabling GitHub Pages Publishing in GitHub Settings:

1. Go to your GitHub repository: `https://github.com/rafasdata/data-analysis-portfolio`
2. Click **Settings** -> **Pages** (under Code and automation).
3. Under **Build and deployment** -> **Source**, select **GitHub Actions**.
4. Push any commit to the `main` branch to trigger the deployment workflow.
5. Once complete, your portfolio site will be live at: `https://rafasdata.github.io/data-analysis-portfolio/`

---

## ⚠️ Current Version Scope & Limitations

- **Browser Memory Limits**: CSV files are parsed and held in client memory; extremely large CSV files (>100MB) may experience browser memory limits.
- **Rule-Based Insights**: Insights are generated automatically using deterministic data quality and statistical rules (no external paid AI / LLM APIs are invoked).

---

## 👩‍💻 Project Creator

Created as a hands-on portfolio project to demonstrate practical skills in data quality, exploratory data analysis, descriptive statistics, and business insights.

**GitHub:** [rafasdata](https://github.com/rafasdata)

