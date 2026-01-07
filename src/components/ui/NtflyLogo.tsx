import { Zap } from "lucide-react";

interface NtflyLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export function NtflyLogo({ size = "md", showText = true }: NtflyLogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg`}
        style={{ boxShadow: "0 0 20px hsl(187 100% 42% / 0.4)" }}
      >
        <Zap className="w-5 h-5 text-primary-foreground fill-current" />
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold text-primary`}>
          Ntfly
        </span>
      )}
    </div>
  );
}
