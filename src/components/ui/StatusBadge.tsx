interface StatusBadgeProps {
  status: "paid" | "partial" | "unpaid" | "pending" | "active" | "converted" | "closed" | "new" | "low";
  label?: string;
}

const statusStyles: Record<string, string> = {
  paid: "status-paid",
  partial: "status-partial",
  unpaid: "status-unpaid",
  pending: "status-pending",
  active: "status-active",
  converted: "status-converted",
  closed: "bg-muted text-muted-foreground",
  new: "bg-info/10 text-info",
  low: "bg-destructive/10 text-destructive",
};

const statusLabels: Record<string, string> = {
  paid: "Paid",
  partial: "Partial",
  unpaid: "Unpaid",
  pending: "Pending",
  active: "Active",
  converted: "Converted",
  closed: "Closed",
  new: "New",
  low: "Low Stock",
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  return (
    <span className={`status-badge ${statusStyles[status]}`}>
      {label || statusLabels[status]}
    </span>
  );
};

export default StatusBadge;
