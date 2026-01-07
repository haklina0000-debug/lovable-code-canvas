import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { firebaseReady, user, loading } = useAuth();
  const location = useLocation();

  if (!firebaseReady) return <Navigate to="/setup" replace />;
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  return children;
}
