import type { StatCardProps } from "../types/dashboard.types";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({ label, value, badge, trend }: StatCardProps) => {
  return (
    <div className="bg-card p-6 rounded-sm">
      <div className="text-[0.6rem] tracking-[0.2em] text-muted uppercase mb-3">
        {label}
      </div>
      <div className="text-2xl font-light text-white mb-1">{value}</div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-xs ${
            trend.direction === "up" ? "text-success" : "text-danger"
          }`}
        >
          {trend.direction === "up" ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          <span>{trend.value}</span>
        </div>
      )}
      {badge && (
        <div className="text-[0.6rem] tracking-[0.15em] text-muted uppercase mt-1">
          {badge}
        </div>
      )}
    </div>
  );
};
