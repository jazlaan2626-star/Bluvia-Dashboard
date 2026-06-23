import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import LoadingScreen from './components/layout/LoadingScreen';
import DashboardSection from './components/sections/DashboardSection';
import SalesSection from './components/sections/SalesSection';
import ProductsSection from './components/sections/ProductsSection';
import InventorySection from './components/sections/InventorySection';
import OrdersSection from './components/sections/OrdersSection';
import CustomersSection from './components/sections/CustomersSection';
import MarketingSection from './components/sections/MarketingSection';
import ExpensesSection from './components/sections/ExpensesSection';
import { BASE_KPI, DATE_MULTIPLIERS, MONTHLY_DATA, QUARTER_FINANCE } from './data/sampleData';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [dateFilter, setDateFilter] = useState('This Month');
  const [chartPeriod, setChartPeriod] = useState('Month');
  const [notice, setNotice] = useState(null);
  const [excludeShipIncluded, setExcludeShipIncluded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const handleNavClick = (id) => {
    setActiveNav(id);
    setMobileOpen(false);
    if (id === 'reports' || id === 'settings') {
      setNotice(`${id === 'reports' ? 'Reports' : 'Settings'} is part of the full Bluvia platform — this preview focuses on the live dashboard below.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const mult = DATE_MULTIPLIERS[dateFilter];
  const kpi = useMemo(() => ({
    revenue: BASE_KPI.revenue * mult,
    profit: BASE_KPI.profit * mult,
    orders: Math.max(1, Math.round(BASE_KPI.orders * mult)),
    inventoryValue: BASE_KPI.inventoryValue,
    units: BASE_KPI.units,
  }), [mult]);
  const margin = ((kpi.profit / kpi.revenue) * 100).toFixed(1);

  const chartData = useMemo(() => {
    if (chartPeriod === 'Month') return MONTHLY_DATA;
    if (chartPeriod === 'Quarter') return QUARTER_FINANCE.map((q) => ({ month: q.quarter, revenue: q.revenue, profit: q.profit }));
    const total = MONTHLY_DATA.reduce((acc, m) => ({ revenue: acc.revenue + m.revenue, profit: acc.profit + m.profit }), { revenue: 0, profit: 0 });
    return [{ month: '2026', revenue: total.revenue, profit: total.profit }];
  }, [chartPeriod]);

  if (isLoading) return <LoadingScreen />;

  return (
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
          <TopBar setMobileOpen={setMobileOpen} dateFilter={dateFilter} setDateFilter={setDateFilter} notice={notice} setNotice={setNotice} />

          <main className="px-4 md:px-8 py-6 md:py-8 max-w-screen-2xl mx-auto space-y-10 fade-in">
            <DashboardSection kpi={kpi} margin={margin} chartData={chartData} chartPeriod={chartPeriod} setChartPeriod={setChartPeriod} />
            <SalesSection />
            <ProductsSection />
            <InventorySection />
            <OrdersSection />
            <CustomersSection />
            <MarketingSection />
            <ExpensesSection excludeShipIncluded={excludeShipIncluded} setExcludeShipIncluded={setExcludeShipIncluded} />

            <footer className="pt-6 pb-3 text-center text-[11px] text-slate-700 border-t border-blue-950/30">
              BLUVIA MALDIVES · Business Intelligence Dashboard · Sample data — connect a live data source to activate live metrics.
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
