"use client";

import { useState } from "react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@lola.com",
    role: "Administrator",
  });

  const [store, setStore] = useState({
    storeName: "LOLA Centro de Estética",
    currency: "USD",
    timezone: "America/New_York",
  });

  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    stockAlerts: true,
    customerSignups: false,
    weeklyReport: true,
  });

  return (
    <div className="max-w-[800px]">
      <DashboardHeader title="Settings" subtitle="System Configuration" />

      {/* Profile */}
      <section className="bg-card p-6 rounded-sm mb-6">
        <h3 className="text-[0.65rem] tracking-[0.2em] text-muted uppercase mb-5">
          Profile
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.6rem] tracking-[0.2em] text-muted uppercase mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-card-light text-white text-sm px-4 py-2.5 rounded-sm outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block text-[0.6rem] tracking-[0.2em] text-muted uppercase mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-card-light text-white text-sm px-4 py-2.5 rounded-sm outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block text-[0.6rem] tracking-[0.2em] text-muted uppercase mb-1.5">
              Role
            </label>
            <input
              type="text"
              value={profile.role}
              readOnly
              className="w-full bg-card-light text-muted text-sm px-4 py-2.5 rounded-sm outline-none cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      {/* Store */}
      <section className="bg-card p-6 rounded-sm mb-6">
        <h3 className="text-[0.65rem] tracking-[0.2em] text-muted uppercase mb-5">
          Store Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[0.6rem] tracking-[0.2em] text-muted uppercase mb-1.5">
              Store Name
            </label>
            <input
              type="text"
              value={store.storeName}
              onChange={(e) => setStore({ ...store, storeName: e.target.value })}
              className="w-full bg-card-light text-white text-sm px-4 py-2.5 rounded-sm outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
          <div>
            <label className="block text-[0.6rem] tracking-[0.2em] text-muted uppercase mb-1.5">
              Currency
            </label>
            <select
              value={store.currency}
              onChange={(e) => setStore({ ...store, currency: e.target.value })}
              className="w-full bg-card-light text-white text-sm px-4 py-2.5 rounded-sm outline-none appearance-none cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (&euro;)</option>
              <option value="GBP">GBP (&pound;)</option>
              <option value="ARS">ARS ($)</option>
            </select>
          </div>
          <div>
            <label className="block text-[0.6rem] tracking-[0.2em] text-muted uppercase mb-1.5">
              Timezone
            </label>
            <select
              value={store.timezone}
              onChange={(e) => setStore({ ...store, timezone: e.target.value })}
              className="w-full bg-card-light text-white text-sm px-4 py-2.5 rounded-sm outline-none appearance-none cursor-pointer"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Argentina/Buenos_Aires">Argentina (ART)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-card p-6 rounded-sm mb-6">
        <h3 className="text-[0.65rem] tracking-[0.2em] text-muted uppercase mb-5">
          Notifications
        </h3>
        <div className="flex flex-col gap-4">
          {(
            [
              { key: "orderAlerts", label: "Order Alerts", desc: "Get notified for new orders" },
              { key: "stockAlerts", label: "Stock Alerts", desc: "Low stock warnings" },
              { key: "customerSignups", label: "Customer Signups", desc: "New customer registrations" },
              { key: "weeklyReport", label: "Weekly Report", desc: "Summary every Monday" },
            ] as const
          ).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">{label}</p>
                <p className="text-xs text-muted mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  notifications[key] ? "bg-accent" : "bg-card-light"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    notifications[key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-white text-black text-xs tracking-[0.15em] uppercase hover:bg-white/90 transition-colors rounded-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}
