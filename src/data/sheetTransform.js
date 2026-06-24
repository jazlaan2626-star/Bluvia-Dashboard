import {
  Package, CheckCircle2, AlertTriangle, XCircle, Truck,
  Users, Sparkles, RefreshCw, Percent, DollarSign,
  Wallet, TrendingUp, Globe, Instagram, MessageCircle,
  Store, Building2, ShoppingCart,
} from 'lucide-react';

const INVENTORY_ICONS = {
  'Total Products': Package,
  'Available Stock': CheckCircle2,
  'Low-Stock Products': AlertTriangle,
  'Out-of-Stock Products': XCircle,
  'Incoming Shipments': Truck,
};

const CUSTOMER_ICONS = {
  'Total Customers': Users,
  'New Customers': Sparkles,
  'Returning Customers': RefreshCw,
  'Repeat Purchase Rate': Percent,
  'Avg. Customer Value': DollarSign,
};

const MARKETING_ICONS = {
  'Marketing Spend': Wallet,
  'Sales Generated': TrendingUp,
  'Return on Ad Spend': Sparkles,
  'Website Visitors': Globe,
  'Conversion Rate': Percent,
  'Instagram Engagement': Instagram,
};

const CHANNEL_ICONS = {
  'Instagram': Instagram,
  'Website': Globe,
  'WhatsApp': MessageCircle,
  'Retail Store': Store,
  'Events and Expos': Building2,
  'Wholesale Partners': ShoppingCart,
};

const GAUGE_COLORS = {
  revenue: '#3b82f6',
  profit: '#60a5fa',
  sales: '#7c3aed',
};

const n = (v) => Number(v) || 0;

export function transformSheetData(raw) {
  const d = raw.data || {};

  const kpiRow = d.kpi?.[0] || {};

  return {
    BASE_KPI: {
      revenue: n(kpiRow.revenue),
      profit:  n(kpiRow.profit),
      orders:  n(kpiRow.orders),
    },

    MONTHLY_DATA: (d.monthly || []).map((r) => ({
      month:   r.month,
      revenue: n(r.revenue),
      profit:  n(r.profit),
    })),

    QUARTER_FINANCE: (d.quarterly || []).map((r) => ({
      quarter: r.quarter,
      revenue: n(r.revenue),
      cost:    n(r.cost),
      profit:  n(r.profit),
    })),

    GAUGES: (d.gauges || []).map((r) => ({
      key:     r.key,
      label:   r.label,
      percent: n(r.percent),
      value:   r.value,
      color:   GAUGE_COLORS[r.key] || '#3b82f6',
    })),

    CATEGORY_DATA: (d.categories || []).map((r) => ({
      name:  r.name,
      units: n(r.units),
      value: n(r.value),
    })),

    TOP_PRODUCTS: (d.products || []).map((r) => ({
      name:     r.name,
      category: r.category,
      units:    n(r.units),
      revenue:  n(r.revenue),
      cost:     n(r.cost),
      profit:   n(r.profit),
      stock:    n(r.stock),
      status:   r.status,
    })),

    SALES_CHANNELS: (d.channels || []).map((r) => ({
      name:    r.name,
      icon:    CHANNEL_ICONS[r.name] || Globe,
      revenue: n(r.revenue),
      orders:  n(r.orders),
      aov:     n(r.aov),
    })),

    INVENTORY_SUMMARY: (d.inventory || []).map((r) => ({
      label: r.label,
      value: r.value,
      icon:  INVENTORY_ICONS[r.label] || Package,
    })),

    STOCK_ALERTS: (d.stockAlerts || []).map((r) => ({
      name:    r.name,
      stock:   n(r.stock),
      reorder: n(r.reorder),
      status:  r.status,
    })),

    CUSTOMER_STATS: (d.customers || []).map((r) => ({
      label: r.label,
      value: r.value,
      icon:  CUSTOMER_ICONS[r.label] || Users,
    })),

    CUSTOMER_DONUT: (d.customerDonut || []).map((r) => ({
      name:  r.name,
      value: n(r.value),
    })),

    MARKETING_STATS: (d.marketing || []).map((r) => ({
      label: r.label,
      value: r.value,
      icon:  MARKETING_ICONS[r.label] || TrendingUp,
    })),

    CAMPAIGNS: (d.campaigns || []).map((r) => ({
      name:     r.name,
      platform: r.platform,
      budget:   n(r.budget),
      sales:    n(r.sales),
      roi:      r.roi,
      status:   r.status,
    })),

    EXPENSE_CARDS: (d.expenses || []).map((r) => ({
      label: r.label,
      value: n(r.value),
      tone:  r.tone || 'neutral',
    })),
  };
}
