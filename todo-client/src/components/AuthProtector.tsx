import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  const isTokenValid = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!isTokenValid()) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  return isTokenValid() ? children ? <>{children}</> : <Outlet /> : null;
};

export default RequireAuth;
