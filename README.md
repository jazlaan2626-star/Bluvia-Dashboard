# Bluvia Business Dashboard

A modern, dark-mode business analytics dashboard for **Bluvia Maldives** — built with React, Vite, Tailwind CSS, Recharts, and lucide-react.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3 (utility styling + custom theme tokens in `src/index.css`)
- Recharts (area chart, bar chart, donut charts)
- lucide-react (icon set)

## Project structure

```
src/
  data/
    sampleData.js        # all sample data + formatting helpers — swap for a real API here
  components/
    layout/
      Sidebar.jsx
      TopBar.jsx
      LoadingScreen.jsx
    ui/
      GlassCard.jsx
      SectionHeading.jsx
      KPICard.jsx
      DiveGauge.jsx
      CategoryBar.jsx
      ChannelRow.jsx
      ChartTooltips.jsx
      PillToggle.jsx
      StatusPill.jsx
    sections/
      DashboardSection.jsx
      SalesSection.jsx
      ProductsSection.jsx
      InventorySection.jsx
      OrdersSection.jsx
      CustomersSection.jsx
      MarketingSection.jsx
      ExpensesSection.jsx
  App.jsx                 # page state + layout assembly
  main.jsx                # React entry point
  index.css                # Tailwind directives + custom theme CSS
```

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional local check of the production build
```

The production build is output to `dist/`.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Import Project** and select the repo.
3. Vercel auto-detects the Vite framework (build command `npm run build`, output directory `dist`) — a `vercel.json` is included as well, so no manual configuration is required.
4. Deploy.

## Replacing the sample data

Everything the dashboard displays lives in `src/data/sampleData.js` as plain arrays/objects (KPIs, monthly revenue/profit, product categories, top products, inventory, orders, sales channels, customers, expenses, shipping, marketing campaigns). Replace these constants with data fetched from your own API/backend to make the dashboard live — no component code needs to change as long as the shape of the data stays the same.
