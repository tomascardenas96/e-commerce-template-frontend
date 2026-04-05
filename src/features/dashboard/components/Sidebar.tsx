"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  ShoppingCart,
  Settings,
  ArrowLeft,
  X,
  Menu,
} from "lucide-react";
import { useDashboardStore } from "../store/dashboardStore";

const managementLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/inventory", label: "Inventory", icon: Package },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

const operationsLinks = [
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const NavLink = ({ href, label, icon: Icon }: (typeof managementLinks)[0]) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        onClick={() => {
          if (window.innerWidth < 1024) toggleSidebar();
        }}
        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
          active
            ? "text-white bg-card-light border-l-2 border-accent"
            : "text-muted hover:text-white hover:bg-white/5 border-l-2 border-transparent"
        }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-card rounded-sm text-muted hover:text-white transition-colors"
      >
        {sidebarCollapsed ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop on mobile */}
      {sidebarCollapsed && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-screen w-56 bg-card flex flex-col transition-transform duration-200 ${
          sidebarCollapsed ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Back to store */}
        <div className="px-4 py-5 border-b border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted hover:text-white text-xs tracking-[0.15em] uppercase transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Store</span>
          </Link>
        </div>

        {/* Management */}
        <div className="mt-6 px-4 mb-2">
          <span className="text-[0.6rem] tracking-[0.2em] text-muted uppercase">
            Management
          </span>
        </div>
        <nav className="flex flex-col">
          {managementLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Operations */}
        <div className="mt-6 px-4 mb-2">
          <span className="text-[0.6rem] tracking-[0.2em] text-muted uppercase">
            Operations
          </span>
        </div>
        <nav className="flex flex-col">
          {operationsLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* System Health */}
        <div className="mt-auto px-4 py-4 border-t border-white/5">
          <div className="text-[0.6rem] tracking-[0.15em] text-muted uppercase mb-1">
            System Health
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-xs text-success">Operational</span>
          </div>
        </div>
      </aside>
    </>
  );
};
