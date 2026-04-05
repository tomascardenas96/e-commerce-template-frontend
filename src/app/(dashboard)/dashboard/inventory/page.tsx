"use client";

import { useState } from "react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DataTable } from "@/features/dashboard/components/DataTable";
import { StatusBadge } from "@/features/dashboard/components/StatusBadge";
import { products } from "@/features/dashboard/data/products.data";
import type { Product, Column } from "@/features/dashboard/types/dashboard.types";
import { Search } from "lucide-react";

const columns: Column<Product>[] = [
  {
    key: "name",
    label: "Product",
    render: (item) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-sm bg-card-light shrink-0" />
        <span className="font-medium">{item.name}</span>
      </div>
    ),
  },
  { key: "sku", label: "SKU" },
  {
    key: "price",
    label: "Price",
    render: (item) => `$${item.price.toLocaleString("en-US")}`,
  },
  {
    key: "stock",
    label: "Stock",
    render: (item) => (
      <span className={item.stock === 0 ? "text-danger" : ""}>
        {item.stock}
      </span>
    ),
  },
  { key: "category", label: "Category" },
  {
    key: "status",
    label: "Status",
    render: (item) => <StatusBadge status={item.status} />,
  },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-[1400px]">
      <DashboardHeader
        title="Inventory"
        subtitle="Product Management"
        actions={
          <button className="px-5 py-2.5 bg-white text-black text-xs tracking-[0.15em] uppercase hover:bg-white/90 transition-colors rounded-sm">
            Add Product
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card text-white text-sm pl-10 pr-4 py-2.5 rounded-sm outline-none placeholder:text-muted/60 focus:ring-1 focus:ring-white/20"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-card text-white text-sm px-4 py-2.5 rounded-sm outline-none appearance-none cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
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
