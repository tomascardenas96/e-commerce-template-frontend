"use client";

import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { MarketChart } from "@/features/dashboard/components/MarketChart";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import {
  overviewStats,
  marketPerformance,
  recentActivities,
} from "@/features/dashboard/data/overview.data";

export default function DashboardOverviewPage() {
  const stats = overviewStats;

  return (
    <div className="max-w-[1400px]">
      <DashboardHeader
        title="Overview"
        subtitle="Admin Control Center & Data Studio"
        actions={
          <>
            <button className="px-5 py-2.5 bg-white text-black text-xs tracking-[0.15em] uppercase hover:bg-white/90 transition-colors rounded-sm">
              Export Data
            </button>
            <button className="px-5 py-2.5 border border-white/20 text-white text-xs tracking-[0.15em] uppercase hover:bg-white/5 transition-colors rounded-sm">
              New Entry
            </button>
          </>
        }
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Net Revenue"
          value={`$${stats.netRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          trend={{ value: `${stats.netRevenueTrend}%`, direction: "up" }}
        />
        <StatCard
          label="Total Orders"
          value={stats.totalOrders.toLocaleString("en-US")}
          badge={stats.totalOrdersLabel}
        />
        <StatCard
          label="Active Clients"
          value={stats.activeClients.toLocaleString("en-US")}
          trend={{ value: `${stats.activeClientsTrend}%`, direction: "up" }}
        />
        <StatCard
          label="AOV"
          value={`$${stats.aov.toFixed(2)}`}
          trend={{
            value: `${Math.abs(stats.aovTrend)}%`,
            direction: stats.aovTrend >= 0 ? "up" : "down",
          }}
        />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <MarketChart data={marketPerformance} />
        </div>
        <div>
          <RecentActivity items={recentActivities} />
        </div>
      </div>
    </div>
  );
}
