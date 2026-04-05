import type { RevenueDataPoint, TopProduct, AnalyticsOverview } from "../types/dashboard.types";

export const analyticsOverview: AnalyticsOverview = {
  conversionRate: 3.8,
  conversionTrend: 0.5,
  avgSessionDuration: "4m 32s",
  bounceRate: 42.1,
  bounceTrend: -2.3,
  totalVisitors: 28400,
  visitorsTrend: 8.7,
};

export const revenueTimeline: RevenueDataPoint[] = [
  { month: "Jan", revenue: 28000, prevYear: 22000 },
  { month: "Feb", revenue: 32000, prevYear: 25000 },
  { month: "Mar", revenue: 38000, prevYear: 29000 },
  { month: "Apr", revenue: 35000, prevYear: 31000 },
  { month: "May", revenue: 42000, prevYear: 34000 },
  { month: "Jun", revenue: 48000, prevYear: 38000 },
  { month: "Jul", revenue: 52000, prevYear: 42000 },
  { month: "Aug", revenue: 49000, prevYear: 45000 },
  { month: "Sep", revenue: 55000, prevYear: 47000 },
  { month: "Oct", revenue: 58000, prevYear: 50000 },
  { month: "Nov", revenue: 62000, prevYear: 54000 },
  { month: "Dec", revenue: 54000, prevYear: 48000 },
];

export const topProducts: TopProduct[] = [
  { name: "Silk Evening Dress", sales: 142, revenue: 126380 },
  { name: "Cashmere Wrap Coat", sales: 89, revenue: 111250 },
  { name: "Leather Clutch Bag", sales: 203, revenue: 91350 },
  { name: "Pearl Drop Earrings", sales: 178, revenue: 56960 },
  { name: "Suede Ankle Boots", sales: 95, revenue: 53200 },
];

export async function fetchAnalyticsOverview(): Promise<AnalyticsOverview> {
  // return (await apiClient.get("/admin/analytics/overview")).data;
  return analyticsOverview;
}

export async function fetchRevenueTimeline(): Promise<RevenueDataPoint[]> {
  // return (await apiClient.get("/admin/analytics/revenue")).data;
  return revenueTimeline;
}

export async function fetchTopProducts(): Promise<TopProduct[]> {
  // return (await apiClient.get("/admin/analytics/top-products")).data;
  return topProducts;
}
