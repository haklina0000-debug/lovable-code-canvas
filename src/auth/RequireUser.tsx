import { Navigate } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { useAuth } from "./useAuth";

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="glass-card glow-border p-6 max-w-md w-full text-center">
        <h1 className="text-xl font-bold mb-2">غير مصرح</h1>
        <p className="text-sm text-muted-foreground">
          ليس لديك صلاحية للوصول إلى لوحة المستخدم.
        </p>
      </div>
    </div>
  );
}

export function RequireUser({ children }: { children: JSX.Element }) {
  return (
    <RequireAuth>
      <RequireUserInner>{children}</RequireUserInner>
    </RequireAuth>
  );
}

function RequireUserInner({ children }: { children: JSX.Element }) {
  const { role } = useAuth();

  if (role === "admin") return <Navigate to="/admin" replace />;
  if (role !== "user") return <AccessDenied />;

  return children;
}
