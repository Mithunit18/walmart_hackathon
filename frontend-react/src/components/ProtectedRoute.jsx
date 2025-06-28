import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userRole = decoded.role;

      if (allowedRoles.includes(userRole)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      localStorage.removeItem("token");
      setIsAuthorized(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized === false) {
      toast.error("Access denied: You are not authorized to view this page.", {
        toastId: "unauthorized",
      });
    }
  }, [isAuthorized]);

  if (isAuthorized === null) return null;

  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
