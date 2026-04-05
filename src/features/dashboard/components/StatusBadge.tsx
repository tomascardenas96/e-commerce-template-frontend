type StatusType =
  | "active"
  | "inactive"
  | "draft"
  | "archived"
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

const statusStyles: Record<StatusType, string> = {
  active: "bg-success/15 text-success",
  inactive: "bg-muted/15 text-muted",
  draft: "bg-warning/15 text-warning",
  archived: "bg-muted/15 text-muted",
  pending: "bg-warning/15 text-warning",
  processing: "bg-accent/15 text-accent",
  shipped: "bg-blue-500/15 text-blue-400",
  delivered: "bg-success/15 text-success",
  cancelled: "bg-danger/15 text-danger",
};

export const StatusBadge = ({ status }: { status: StatusType }) => {
  return (
    <span
      className={`inline-block px-2.5 py-1 text-[0.65rem] tracking-[0.1em] uppercase rounded-sm ${
        statusStyles[status] || "bg-muted/15 text-muted"
      }`}
    >
      {status}
    </span>
  );
};
