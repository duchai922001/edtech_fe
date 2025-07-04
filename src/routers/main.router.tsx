import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layouts/main.layout";
import { Menu } from "../common/configMenu";
import Lecture from "../pages/Lecturer";
import Student from "../pages/Student";
import MockTest from "../pages/Mocktest";
import FlashcardCollectionExperimental from "../pages/Flashcard";
import Classes from "../pages/Classes";
import Enroll from "../pages/Enroll";
import UploadSource from "../pages/UploadSource";
import Speaking from "../pages/Speaking";
import SpeakingTest from "../pages/SpeakingTest";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import FlashCardDetail from "../pages/FlashCardDetail";
import QuizTest from "../pages/QuizTest";
import WordGames from "../pages/Games/WordGames";
import CrossGame from "../pages/Games/CrossGame";
import BoardGame from "../pages/Games";
import CreateFlashCardPage from "../pages/createFlashCard";
import MocktestContainer from "../pages/MocktestContainer";
import MocktestChinese from "../pages/MocktestChinese";
import QuizTestChinese from "../pages/QuizTestChinese";
import MyFlashcards from "../pages/MyFlashCard";
import UserProfile from "../pages/UserProfile";
import QuizTestStart from "../pages/QuizTestStart";
import QuizTestChineseStart from "../pages/QuizTestChineseStart";
import ScholarshipPage from "../pages/Scholarship";
import MembershipPage from "../pages/Membership";
import EventsPage from "../pages/Event/EventsPage";
import EventQuiz from "../pages/EventQuiz";
import EventQuizStart from "../pages/EventQuizStart";
const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={Menu.URL_LECTURE_PAGE} element={<Lecture />} />
          <Route path={Menu.URL_STUDENT_PAGE} element={<Student />} />
          <Route
            path={Menu.URL_MOCK_TEST_PAGE}
            element={<MocktestContainer />}
          />
          <Route
            path={`${Menu.URL_MOCKTEST_CHINESE_PAGE}`}
            element={<MocktestChinese />}
          />
          <Route
            path={Menu.URL_FLASH_CARD_PAGE}
            element={<FlashcardCollectionExperimental />}
          />
          <Route path={Menu.URL_CLASSES_PAGE} element={<Classes />} />
          <Route path={Menu.URL_ENROLL_PAGE} element={<Enroll />} />
          <Route
            path={Menu.URL_UPLOAD_SOURCE_PAGE}
            element={<UploadSource />}
          />
          <Route path={Menu.URL_SPEAKING_PAGE} element={<Speaking />} />
          <Route
            path={Menu.URL_SPEAKING_TEST_PAGE}
            element={<SpeakingTest />}
          />
          <Route path={Menu.URL_LOGIN_PAGE} element={<LoginPage />} />
          <Route path={Menu.URL_SIGNUP_PAGE} element={<SignUpPage />} />
          <Route
            path={`${Menu.URL_FLASH_CARD_PAGE}/:id`}
            element={<FlashCardDetail />}
          />
          <Route
            path={`${Menu.URL_MOCK_TEST_PAGE}/:languageId`}
            element={<MockTest />}
          />
          <Route
            path={`${Menu.URL_MOCK_TEST_PAGE}/detail/:id`}
            element={<QuizTest />}
          />
          <Route
            path={`${Menu.URL_MOCK_TEST_PAGE}/start/:id`}
            element={<QuizTestStart />}
          />
          <Route
            path={`${Menu.URL_MOCKTEST_CHINESE_PAGE}/detail/:id`}
            element={<QuizTestChinese />}
          />
          <Route
            path={`${Menu.URL_MOCKTEST_CHINESE_PAGE}/start/:id`}
            element={<QuizTestChineseStart />}
          />
          <Route path={`${Menu.URL_WORD_GAME_PAGE}`} element={<WordGames />} />
          <Route path={`${Menu.URL_CROSS_GAME_PAGE}`} element={<CrossGame />} />
          <Route path={`${Menu.URL_BOARD_GAME_PAGE}`} element={<BoardGame />} />
          <Route
            path={`${Menu.URL_MY_FLASHCARD_PAGE}`}
            element={<MyFlashcards />}
          />
          <Route path={`${Menu.URL_PROFILE_USER}`} element={<UserProfile />} />
          <Route
            path={`${Menu.URL_CREATE_FLASHCARD_PAGE}`}
            element={<CreateFlashCardPage />}
          />

          <Route
            path={`${Menu.URL_SCHOLARSHIP}`}
            element={<ScholarshipPage />}
          />

          <Route path={`${Menu.URL_MEMBERSHIP}`} element={<MembershipPage />} />
          <Route path={`${Menu.URL_EVENT}`} element={<EventsPage />} />
          <Route
            path={`${Menu.URL_EVENT}/detail/:id`}
            element={<EventQuiz />}
          />
          <Route
            path={`${Menu.URL_EVENT}/start/:id`}
            element={<EventQuizStart />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
