import { Zap } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type ProjectStatus = "completed" | "inProgress" | "pending";

interface ProjectCardProps {
  name: string;
  date: string;
  status: ProjectStatus;
}

const statusConfig: Record<
  ProjectStatus,
  { label: string; variant: "success" | "warning" | "pending" }
> = {
  completed: { label: "مكتمل", variant: "success" },
  inProgress: { label: "قيد التنفيذ", variant: "warning" },
  pending: { label: "معلق", variant: "pending" },
};

export function ProjectCard({ name, date, status }: ProjectCardProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>
      <StatusBadge variant={config.variant}>{config.label}</StatusBadge>
    </div>
  );
}
