import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layouts/main.layout";
import { Menu } from "../common/configMenu";
import Lecture from "../pages/Lecturer";
import Student from "../pages/Student";
import MockTest from "../pages/Mocktest";
import Flashcard from "../pages/Flashcard";
const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={Menu.URL_LECTURE_PAGE} element={<Lecture />} />
          <Route path={Menu.URL_STUDENT_PAGE} element={<Student />} />
          <Route path={Menu.URL_MOCK_TEST_PAGE} element={<MockTest />} />
          <Route path={Menu.URL_FLASH_CARD_PAGE} element={<Flashcard />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
