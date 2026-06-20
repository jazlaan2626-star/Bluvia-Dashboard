import {
  LayoutDashboard, TrendingUp, Package, ShoppingBag, ClipboardList, Users,
  Megaphone, Wallet, FileBarChart2, Settings, CheckCircle2, AlertTriangle,
  XCircle, Truck, PackageCheck, RefreshCw, Sparkles, Box, DollarSign,
  Percent, Ship, Plane, Instagram, Globe, MessageCircle, Store, Building2,
  ShoppingCart,
} from 'lucide-react';

/* ============================================================================
   SAMPLE DATA — swap these constants for live API data later. Shapes are
   kept intentionally flat/simple so a real data source can drop straight in.
============================================================================ */

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sales', label: 'Sales', icon: TrendingUp },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'expenses', label: 'Expenses', icon: Wallet },
  { id: 'reports', label: 'Reports', icon: FileBarChart2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const DATE_FILTERS = ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year', 'Custom Range'];
export const DATE_MULTIPLIERS = {
  'Today': 0.038, 'This Week': 0.22, 'This Month': 1,
  'This Quarter': 3.05, 'This Year': 12.4, 'Custom Range': 1,
};

export const MONTHLY_DATA = [
  { month: 'Jan', revenue: 142000, profit: 46000 },
  { month: 'Feb', revenue: 138500, profit: 44200 },
  { month: 'Mar', revenue: 151200, profit: 49800 },
  { month: 'Apr', revenue: 147800, profit: 47500 },
  { month: 'May', revenue: 159400, profit: 52600 },
  { month: 'Jun', revenue: 162100, profit: 53900 },
  { month: 'Jul', revenue: 171300, profit: 57200 },
  { month: 'Aug', revenue: 168900, profit: 55800 },
  { month: 'Sep', revenue: 174600, profit: 58900 },
  { month: 'Oct', revenue: 179200, profit: 60100 },
  { month: 'Nov', revenue: 181800, profit: 61400 },
  { month: 'Dec', revenue: 185450, profit: 62780 },
];

export const BASE_KPI = { revenue: 185450, profit: 62780, orders: 286, inventoryValue: 240500, units: 1840 };

export const GAUGES = [
  { key: 'revenue', label: 'Revenue Target', percent: 82, value: 'MVR 185,450 of MVR 226,000', color: '#2dd4bf' },
  { key: 'profit', label: 'Profit Target', percent: 74, value: 'MVR 62,780 of MVR 84,800', color: '#38bdf8' },
  { key: 'sales', label: 'Sales Target', percent: 91, value: '286 of 315 orders', color: '#fb923c' },
];

export const CATEGORY_DATA = [
  { name: 'Snorkeling Fins', units: 420, value: 48600 },
  { name: 'Diving Masks', units: 365, value: 54200 },
  { name: 'Snorkels', units: 310, value: 21700 },
  { name: 'Dry Bags', units: 245, value: 18400 },
  { name: 'Anti-Fog Products', units: 580, value: 14500 },
  { name: 'Water Shoes', units: 198, value: 23100 },
  { name: 'Accessories', units: 410, value: 19800 },
];

export const DONUT_COLORS = ['#2dd4bf', '#38bdf8', '#0ea5e9', '#fb923c', '#34d399', '#a78bfa', '#f472b6'];

export const TOP_PRODUCTS = [
  { name: 'Bluvia Ocean Glide Fins', category: 'Snorkeling Fins', units: 186, revenue: 27900, cost: 16740, profit: 11160, stock: 142, status: 'In Stock' },
  { name: 'Bluvia Reef Explorer Mask', category: 'Diving Masks', units: 154, revenue: 23100, cost: 13860, profit: 9240, stock: 38, status: 'Low Stock' },
  { name: 'Bluvia ClearView Anti-Fog', category: 'Anti-Fog Products', units: 312, revenue: 9360, cost: 4680, profit: 4680, stock: 0, status: 'Out of Stock' },
  { name: 'Bluvia Waterproof Dry Bag', category: 'Dry Bags', units: 128, revenue: 12800, cost: 7040, profit: 5760, stock: 18, status: 'Reorder Required' },
  { name: 'Bluvia AquaStep Water Shoes', category: 'Water Shoes', units: 96, revenue: 14400, cost: 8160, profit: 6240, stock: 64, status: 'In Stock' },
];

export const INVENTORY_SUMMARY = [
  { label: 'Total Products', value: '48', icon: Package },
  { label: 'Available Stock', value: '1,840 units', icon: CheckCircle2 },
  { label: 'Low-Stock Products', value: '6', icon: AlertTriangle },
  { label: 'Out-of-Stock Products', value: '2', icon: XCircle },
  { label: 'Incoming Shipments', value: '3', icon: Truck },
];

export const STOCK_ALERTS = [
  { name: 'Bluvia Reef Explorer Mask', stock: 38, reorder: 40, status: 'Low Stock' },
  { name: 'Bluvia ClearView Anti-Fog', stock: 0, reorder: 50, status: 'Out of Stock' },
  { name: 'Bluvia Waterproof Dry Bag', stock: 18, reorder: 25, status: 'Reorder Required' },
  { name: 'Bluvia DeepDive Weight Belt', stock: 12, reorder: 20, status: 'Low Stock' },
  { name: 'Bluvia Snorkel Pro X1', stock: 5, reorder: 30, status: 'Reorder Required' },
];

export const ORDER_STATUSES = [
  { label: 'New Orders', value: 32, icon: Sparkles, color: '#38bdf8' },
  { label: 'Processing', value: 41, icon: RefreshCw, color: '#a78bfa' },
  { label: 'Packed', value: 28, icon: Box, color: '#fb923c' },
  { label: 'Shipped', value: 56, icon: Truck, color: '#22d3ee' },
  { label: 'Delivered', value: 118, icon: PackageCheck, color: '#34d399' },
  { label: 'Cancelled', value: 11, icon: XCircle, color: '#fb7185' },
];

export const SALES_CHANNELS = [
  { name: 'Instagram', icon: Instagram, revenue: 68400, orders: 124, aov: 552 },
  { name: 'Website', icon: Globe, revenue: 52100, orders: 86, aov: 606 },
  { name: 'WhatsApp', icon: MessageCircle, revenue: 31200, orders: 58, aov: 538 },
  { name: 'Retail Store', icon: Store, revenue: 18900, orders: 34, aov: 556 },
  { name: 'Events and Expos', icon: Building2, revenue: 9850, orders: 12, aov: 821 },
  { name: 'Wholesale Partners', icon: ShoppingCart, revenue: 5000, orders: 8, aov: 625 },
];

export const CUSTOMER_STATS = [
  { label: 'Total Customers', value: '1,842', icon: Users },
  { label: 'New Customers', value: '186', icon: Sparkles },
  { label: 'Returning Customers', value: '1,656', icon: RefreshCw },
  { label: 'Repeat Purchase Rate', value: '64.2%', icon: Percent },
  { label: 'Avg. Customer Value', value: 'MVR 1,240', icon: DollarSign },
];

export const CUSTOMER_DONUT = [
  { name: 'New Customers', value: 186 },
  { name: 'Returning Customers', value: 1656 },
];

export const EXPENSE_CARDS = [
  { label: 'Product Cost', value: 78400, tone: 'neutral' },
  { label: 'Shipping Cost', value: 14200, tone: 'neutral' },
  { label: 'Packaging Cost', value: 6800, tone: 'neutral' },
  { label: 'Marketing Cost', value: 12600, tone: 'neutral' },
  { label: 'Operational Expenses', value: 10670, tone: 'neutral' },
  { label: 'Net Profit', value: 62780, tone: 'positive' },
];

export const QUARTER_FINANCE = [
  { quarter: 'Q1', revenue: 431700, cost: 291700, profit: 140000 },
  { quarter: 'Q2', revenue: 469300, cost: 315300, profit: 154000 },
  { quarter: 'Q3', revenue: 514800, cost: 342900, profit: 171900 },
  { quarter: 'Q4', revenue: 546450, cost: 362170, profit: 184280 },
];

export const SHIPPING_STATS = [
  { label: 'Total Sea Shipping Cost', value: 9800, icon: Ship },
  { label: 'Total Air Shipping Cost', value: 4400, icon: Plane },
  { label: 'Shipping Cost per Product', value: 296, icon: Box },
  { label: 'Shipping Cost % of Revenue', value: '7.66%', icon: Percent, isPercent: true },
];

export const MARKETING_STATS = [
  { label: 'Marketing Spend', value: 'MVR 12,600', icon: Wallet },
  { label: 'Sales Generated', value: 'MVR 54,800', icon: TrendingUp },
  { label: 'Return on Ad Spend', value: '4.35x', icon: Sparkles },
  { label: 'Website Visitors', value: '24,680', icon: Globe },
  { label: 'Conversion Rate', value: '3.2%', icon: Percent },
  { label: 'Instagram Engagement', value: '8.4%', icon: Instagram },
];

export const CAMPAIGNS = [
  { name: 'Summer Dive Sale', platform: 'Instagram', budget: 3200, sales: 16400, roi: '412%', status: 'Active' },
  { name: 'New Arrivals Push', platform: 'Website', budget: 2400, sales: 9800, roi: '308%', status: 'Active' },
  { name: 'Eid Snorkel Bundle', platform: 'WhatsApp', budget: 1800, sales: 11200, roi: '522%', status: 'Completed' },
  { name: 'Reef Explorer Launch', platform: 'Instagram', budget: 2800, sales: 12600, roi: '350%', status: 'Completed' },
  { name: 'Expo Booth Promo', platform: 'Events & Expos', budget: 2400, sales: 4800, roi: '100%', status: 'Paused' },
];

/* ============================================================================
   HELPERS
============================================================================ */

export const fmtMVR = (n) => `MVR ${Math.round(n).toLocaleString('en-US')}`;
export const fmtNum = (n) => Math.round(n).toLocaleString('en-US');

export const STATUS_STYLES = {
  'In Stock': 'bg-emerald-400/10 text-emerald-300 border-emerald-400/25',
  'Low Stock': 'bg-amber-400/10 text-amber-300 border-amber-400/25',
  'Out of Stock': 'bg-rose-400/10 text-rose-300 border-rose-400/25',
  'Reorder Required': 'bg-orange-400/10 text-orange-300 border-orange-400/25',
  'Active': 'bg-emerald-400/10 text-emerald-300 border-emerald-400/25',
  'Completed': 'bg-sky-400/10 text-sky-300 border-sky-400/25',
  'Paused': 'bg-slate-400/10 text-slate-300 border-slate-400/25',
};
