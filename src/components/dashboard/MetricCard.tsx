import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

const MetricCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
}: MetricCardProps) => {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="metric-label">{title}</p>
          <p className="metric-value mt-2">{value}</p>
          {change && (
            <p
              className={`metric-change mt-1 ${
                changeType === "positive"
                  ? "metric-change-positive"
                  : changeType === "negative"
                  ? "metric-change-negative"
                  : "text-muted-foreground"
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
