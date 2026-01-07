export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card glow-border px-6 py-5 flex items-center gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <span className="text-sm text-muted-foreground">جاري التحميل...</span>
      </div>
    </div>
  );
}
