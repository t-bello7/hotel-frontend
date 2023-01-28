import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation";
import '../assets/styles/dashboard.css';

const DashboardLayout = () => (
  <div className="app_holder">
    <Navigation />
    <Outlet />
  </div>
);

export default DashboardLayout;
