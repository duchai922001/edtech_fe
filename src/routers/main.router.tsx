import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layouts/main.layout";
import { Menu } from "../common/configMenu";
import Lecture from "../pages/Lecturer";
import Student from "../pages/Student";
import MockTest from "../pages/Mocktest";
import Flashcard from "../pages/Flashcard";
import Classes from "../pages/Classes";
import Enroll from "../pages/Enroll";
import UploadSource from "../pages/UploadSource";
import Speaking from "../pages/Speaking";
import SpeakingTest from "../pages/SpeakingTest";
import LoginPage from "../pages/LoginPage";
const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={Menu.URL_LECTURE_PAGE} element={<Lecture />} />
          <Route path={Menu.URL_STUDENT_PAGE} element={<Student />} />
          <Route path={Menu.URL_MOCK_TEST_PAGE} element={<MockTest />} />
          <Route path={Menu.URL_FLASH_CARD_PAGE} element={<Flashcard />} />
          <Route path={Menu.URL_CLASSES_PAGE} element={<Classes />} />
          <Route path={Menu.URL_ENROLL_PAGE} element={<Enroll />} />
          <Route path={Menu.URL_UPLOAD_SOURCE_PAGE} element={<UploadSource />} />
          <Route path={Menu.URL_SPEAKING_PAGE} element={<Speaking />} />
          <Route path={Menu.URL_SPEAKING_TEST_PAGE} element={<SpeakingTest />} />
          <Route path={Menu.URL_LOGIN_PAGE} element={<LoginPage />} />

        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
