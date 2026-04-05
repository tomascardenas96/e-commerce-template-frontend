"use client";

import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DataTable } from "@/features/dashboard/components/DataTable";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import { customers } from "@/features/dashboard/data/customers.data";
import type { Customer, Column } from "@/features/dashboard/types/dashboard.types";

const columns: Column<Customer>[] = [
  {
    key: "name",
    label: "Customer",
    render: (item) => (
      <div>
        <span className="font-medium">{item.name}</span>
        <p className="text-xs text-muted mt-0.5">{item.email}</p>
      </div>
    ),
  },
  { key: "totalOrders", label: "Orders" },
  {
    key: "totalSpent",
    label: "Total Spent",
    render: (item) => `$${item.totalSpent.toLocaleString("en-US")}`,
  },
  {
    key: "joinedAt",
    label: "Joined",
    render: (item) =>
      new Date(item.joinedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
];

export default function CustomersPage() {
  return (
    <div className="max-w-[1400px]">
      <DashboardHeader
        title="Customers"
        subtitle="Client Management"
        actions={
          <button className="px-5 py-2.5 border border-white/20 text-white text-xs tracking-[0.15em] uppercase hover:bg-white/5 transition-colors rounded-sm">
            Export
          </button>
        }
      />

      <div className="bg-card rounded-sm">
        <DataTable
          columns={columns}
          data={customers}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
}
