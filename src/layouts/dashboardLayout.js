import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navigation from "../components/navigation";
import '../assets/styles/dashboard.css';

const DashboardLayout = () => {
  const auth = useAuth();
  const location = useLocation();
  return auth.token ? (
    <div className="app_holder">
      <Navigation />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default DashboardLayout;
