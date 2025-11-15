import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function Layout() {
  const location = useLocation();
  const noNavbarRoutes = ["/admindashboard", "/startupdashboard"];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);
  return (
    <div>
      {showNavbar && (
        <header className="w-full ">
          <Navbar />
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
