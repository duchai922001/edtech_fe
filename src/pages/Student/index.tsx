import BackgroundHome from "./components/BackgroundHome";
import HeadStudent from "./components/HeadStudent";
import Learnmore from "./components/Learnmore";
import Scholarship from "./components/Scholarship";
import TrendingActivities from "./components/TrendingActivities";

const Student = () => {
  return (
    <>
      <HeadStudent />
      <Learnmore />
      <BackgroundHome/>
      <Scholarship/>
      <TrendingActivities/>
    </>
  );
};

export default Student;
