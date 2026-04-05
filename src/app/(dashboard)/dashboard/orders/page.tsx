"use client";

import { useState } from "react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DataTable } from "@/features/dashboard/components/DataTable";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import { orders } from "@/features/dashboard/data/orders.data";
import type { Order, OrderStatus, Column } from "@/features/dashboard/types/dashboard.types";

const tabs: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const columns: Column<Order>[] = [
  { key: "id", label: "Order ID", render: (item) => <span className="font-medium">{item.id}</span> },
  { key: "customer", label: "Customer" },
  { key: "items", label: "Items" },
  {
    key: "total",
    label: "Total",
    render: (item) => `$${item.total.toLocaleString("en-US")}`,
  },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
  {
    key: "date",
    label: "Date",
    render: (item) =>
      new Date(item.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");

  const filtered =
    activeTab === "all"
      ? orders
      : orders.filter((o) => o.status === activeTab);

  return (
    <div className="max-w-[1400px]">
      <DashboardHeader title="Orders" subtitle="Order Management" />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-xs tracking-[0.1em] uppercase rounded-sm transition-colors whitespace-nowrap ${
              activeTab === tab.value
                ? "bg-card-light text-white"
                : "text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-sm">
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
}
