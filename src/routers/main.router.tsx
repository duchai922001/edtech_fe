import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layouts/main.layout";
import { Menu } from "../common/configMenu";
import Home from "../pages/home";
const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={Menu.URL_HOME_PAGE} element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
