import { Outlet } from "react-router-dom";
import Navigation from "../components/Navbar/Navbar";

const EmptyLayout = () => (
  <div className="app-container">
    <Navigation />

    <Outlet />
  </div>
);

export default EmptyLayout;
