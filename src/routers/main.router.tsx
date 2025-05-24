import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layouts/main.layout";
import { Menu } from "../common/configMenu";
import Lecture from "../pages/Lecturer";
import Student from "../pages/Student";
const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={Menu.URL_LECTURE_PAGE} element={<Lecture />} />
          <Route path={Menu.URL_STUDENT_PAGE} element={<Student />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
