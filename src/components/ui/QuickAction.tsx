import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "primary";
  className?: string;
}

export function QuickAction({
  icon: Icon,
  label,
  onClick,
  variant = "default",
  className,
}: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group",
        variant === "primary"
          ? "bg-gradient-to-l from-primary to-blue-500 text-primary-foreground hover:opacity-90"
          : "bg-secondary/50 hover:bg-secondary text-foreground",
        className
      )}
    >
      <span className="font-medium">{label}</span>
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
          variant === "primary"
            ? "bg-white/20"
            : "bg-primary/20"
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5",
            variant === "primary" ? "text-white" : "text-primary"
          )}
        />
      </div>
    </button>
  );
}
