import Container from "../../components/base/Container";
import CrosswordGame from "../../components/base/CrossWordGame";

const CrossGame: React.FC = () => {
  const gameData = {
    mainWord: "SCHOOL",
    clues: {
      2: { question: "The person who teaches", answer: "TEACHER" },
      3: { question: "A learner in school", answer: "STUDENT" },
      4: { question: "A group of students learning together", answer: "CLASS" },
    },
  };

  return (
    <Container>
      <CrosswordGame mainWord={gameData.mainWord} clues={gameData.clues} />
    </Container>
  );
};

export default CrossGame;
