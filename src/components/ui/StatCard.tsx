import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  variant?: "default" | "success" | "warning" | "pending";
  className?: string;
}

const iconVariants = {
  default: "text-primary",
  success: "text-success",
  warning: "text-warning",
  pending: "text-muted-foreground",
};

export function StatCard({
  icon: Icon,
  value,
  label,
  variant = "default",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "glass-card glow-border p-5 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        <Icon className={cn("w-6 h-6", iconVariants[variant])} />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
