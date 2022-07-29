import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export function PrivateRoute({ children, isAuthenticated, redirectTo }) {
  const location = useLocation();
  const {
    isLoggedIn: { status },
  } = useAuth();

  return (isAuthenticated !== undefined ? isAuthenticated : status) ? (
    children
  ) : (
    <Navigate
      to={redirectTo !== undefined ? redirectTo : "/login"}
      state={{ previousRoute: location.pathname }}
      replace
    />
  );
}
