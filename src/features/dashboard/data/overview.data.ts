import type { OverviewStats, MarketPerformance, RecentActivityItem } from "../types/dashboard.types";

export const overviewStats: OverviewStats = {
  netRevenue: 142000,
  netRevenueTrend: 12.4,
  totalOrders: 1284,
  totalOrdersLabel: "Current Month",
  activeClients: 482,
  activeClientsTrend: 3.1,
  aov: 312.4,
  aovTrend: -0.8,
};

export const marketPerformance: MarketPerformance[] = [
  { month: "Jan", sales: 4200, projections: 3800 },
  { month: "Feb", sales: 3800, projections: 4100 },
  { month: "Mar", sales: 5100, projections: 4600 },
  { month: "Apr", sales: 4700, projections: 5200 },
  { month: "May", sales: 6300, projections: 5800 },
  { month: "Jun", sales: 5900, projections: 6100 },
  { month: "Jul", sales: 7200, projections: 6500 },
  { month: "Aug", sales: 6800, projections: 7000 },
  { month: "Sep", sales: 7500, projections: 7200 },
  { month: "Oct", sales: 7100, projections: 7400 },
  { month: "Nov", sales: 7800, projections: 7100 },
  { month: "Dec", sales: 6200, projections: 6800 },
];

export const recentActivities: RecentActivityItem[] = [
  {
    id: "1",
    title: "Stock Replenishment: SKU-9241",
    timeAgo: "2 hours ago",
    dotColor: "accent",
  },
  {
    id: "2",
    title: "New Boutique Partnership: NYC",
    timeAgo: "4 hours ago",
    dotColor: "accent",
  },
  {
    id: "3",
    title: "System Backup Completed",
    timeAgo: "6 hours ago",
    dotColor: "muted",
  },
  {
    id: "4",
    title: "High Value Order: #88219",
    timeAgo: "12 hours ago",
    dotColor: "accent",
  },
];

// Swap these functions with real API calls when ready
export async function fetchOverviewStats(): Promise<OverviewStats> {
  // return (await apiClient.get("/admin/overview/stats")).data;
  return overviewStats;
}

export async function fetchMarketPerformance(): Promise<MarketPerformance[]> {
  // return (await apiClient.get("/admin/overview/market")).data;
  return marketPerformance;
}

export async function fetchRecentActivities(): Promise<RecentActivityItem[]> {
  // return (await apiClient.get("/admin/overview/activity")).data;
  return recentActivities;
}
