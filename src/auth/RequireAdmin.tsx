import { Navigate } from "react-router-dom";
import { ADMIN_CONFIG } from "@/lib/constants";
import { RequireAuth } from "./RequireAuth";
import { useAuth } from "./useAuth";

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="glass-card glow-border p-6 max-w-md w-full text-center">
        <h1 className="text-xl font-bold mb-2">غير مصرح</h1>
        <p className="text-sm text-muted-foreground">
          هذا القسم مخصص للأدمن فقط.
        </p>
      </div>
    </div>
  );
}

export function RequireAdmin({ children }: { children: JSX.Element }) {
  return (
    <RequireAuth>
      <RequireAdminInner>{children}</RequireAdminInner>
    </RequireAuth>
  );
}

function RequireAdminInner({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const email = (user?.email ?? "").toLowerCase();
  const allowed = email === ADMIN_CONFIG.immutableAdminEmail.toLowerCase();

  if (!allowed) return <AccessDenied />;
  return children;
}

export function RedirectAdminToPanel() {
  return <Navigate to="/admin" replace />;
}
