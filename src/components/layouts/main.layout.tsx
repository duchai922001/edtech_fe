import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import "./style.css";
const MainLayout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
