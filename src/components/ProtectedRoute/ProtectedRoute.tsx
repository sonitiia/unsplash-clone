import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector((s) => s.auth.user);
  const hydrated = useAppSelector((s) => s.auth.hydrated);
  const location = useLocation();

  if (!hydrated) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
