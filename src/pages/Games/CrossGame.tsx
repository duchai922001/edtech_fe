import Container from "../../components/base/Container";
import CrosswordGame from "../../components/base/CrossWordGame";

const CrossGame: React.FC = () => {
  const gameData = {
    mainWord: "大学", // University
    clues: {      
      2: { question: "这些人在大学里教授课程", answer: "教授" }, // These people teach courses in the university
      3: { question: "学生们常常在这里阅读和学习", answer: "图书馆" }, // Students often read and study here
      4: { question: "这是大学中的一个学科领域", answer: "专业" }, // This is a field of study in university
      5: { question: "这是大学里的一个重要活动", answer: "讲座" }, // This is an important activity in the university
      6: { question: "学生们在这里住，通常是一个宿舍楼", answer: "宿舍" }, // Students live here, usually a dormitory building
      7: { question: "在这里你可以学习知识并获得学位", answer: "学生" }, // Here, you study knowledge and earn degrees
    },
  };
  

  return (
    <Container>
      <CrosswordGame mainWord={gameData.mainWord} clues={gameData.clues} />
    </Container>
  );
};

export default CrossGame;
