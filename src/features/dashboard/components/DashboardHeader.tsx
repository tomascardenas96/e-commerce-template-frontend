import type { ReactNode } from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const DashboardHeader = ({ title, subtitle, actions }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="heading-display text-4xl md:text-5xl text-white">{title}</h1>
        {subtitle && (
          <p className="text-[0.65rem] tracking-[0.2em] text-muted uppercase mt-2">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
};
