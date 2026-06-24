import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import LoadingScreen from './components/layout/LoadingScreen';
import DashboardSection from './components/sections/DashboardSection';
import SalesSection from './components/sections/SalesSection';
import ProductsSection from './components/sections/ProductsSection';
import InventorySection from './components/sections/InventorySection';
import CustomersSection from './components/sections/CustomersSection';
import MarketingSection from './components/sections/MarketingSection';
import ExpensesSection from './components/sections/ExpensesSection';
import { DataContext } from './context/DataContext';
import { useSheetData } from './hooks/useSheetData';
import { DATE_MULTIPLIERS, MONTHLY_DATA, QUARTER_FINANCE } from './data/sampleData';

export default function App() {
  const [isLoading, setIsLoading]   = useState(true);
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav]   = useState('dashboard');
  const [dateFilter, setDateFilter] = useState('This Month');
  const [chartPeriod, setChartPeriod] = useState('Month');
  const [notice, setNotice]         = useState(null);

  const { data, status } = useSheetData();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const handleNavClick = (id) => {
    setActiveNav(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const mult = DATE_MULTIPLIERS[dateFilter];

  const kpi = useMemo(() => ({
    revenue: data.BASE_KPI.revenue * mult,
    profit:  data.BASE_KPI.profit  * mult,
    orders:  Math.max(1, Math.round(data.BASE_KPI.orders * mult)),
  }), [data.BASE_KPI, mult]);

  const margin = ((kpi.profit / kpi.revenue) * 100).toFixed(1);

  const monthlyData  = data.MONTHLY_DATA?.length  ? data.MONTHLY_DATA  : MONTHLY_DATA;
  const quarterData  = data.QUARTER_FINANCE?.length ? data.QUARTER_FINANCE : QUARTER_FINANCE;

  const chartData = useMemo(() => {
    if (chartPeriod === 'Month')   return monthlyData;
    if (chartPeriod === 'Quarter') return quarterData.map((q) => ({ month: q.quarter, revenue: q.revenue, profit: q.profit }));
    const total = monthlyData.reduce(
      (acc, m) => ({ revenue: acc.revenue + m.revenue, profit: acc.profit + m.profit }),
      { revenue: 0, profit: 0 }
    );
    return [{ month: '2026', revenue: total.revenue, profit: total.profit }];
  }, [chartPeriod, monthlyData, quarterData]);

  if (isLoading) return <LoadingScreen />;

  return (
    <DataContext.Provider value={data}>
      <div className="min-h-screen w-full text-slate-200 relative" style={{ background: '#000000' }}>
        <div className="caustic-bg">
          <div className="caustic-blob blob-1" />
          <div className="caustic-blob blob-2" />
          <div className="caustic-blob blob-3" />
          <div className="caustic-blob blob-4" />
        </div>

        <div className="relative z-10 flex">
          <Sidebar
            collapsed={collapsed} setCollapsed={setCollapsed}
            mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}
            activeNav={activeNav} onNavClick={handleNavClick}
          />

          <div className="flex-1 min-w-0">
            <TopBar
              setMobileOpen={setMobileOpen}
              dateFilter={dateFilter} setDateFilter={setDateFilter}
              notice={notice} setNotice={setNotice}
              dataStatus={status}
            />

            <main className="px-4 md:px-8 py-6 md:py-8 max-w-screen-2xl mx-auto space-y-10 fade-in">
              <DashboardSection
                kpi={kpi} margin={margin}
                chartData={chartData}
                chartPeriod={chartPeriod} setChartPeriod={setChartPeriod}
              />
              <SalesSection />
              <ProductsSection />
              <InventorySection />
              <CustomersSection />
              <MarketingSection />
              <ExpensesSection />

              <footer className="pt-6 pb-3 text-center text-[11px] text-slate-700 border-t border-blue-950/30">
                BLUVIA MALDIVES · Business Intelligence Dashboard · {status === 'live' ? 'Connected to Google Sheets' : 'Connect Google Sheets to activate live data'}
              </footer>
            </main>
          </div>
        </div>
      </div>
    </DataContext.Provider>
  );
}
