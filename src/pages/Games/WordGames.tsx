import Container from "../../components/base/Container";
import WordScrambleGame from "../../components/base/WordScrambleGame";

const WordGames: React.FC = () => {
  const wordsData = [
    "PLAY",
    "GAME",
    "WORLD",
    "FRIEND",
    "SCHOOL",
    "TEACHER",
    "STUDENT",
    "LEARNING",
    "KNOWLEDGE",
    "EDUCATION",
  ];
  return (
    <Container>
      <WordScrambleGame words={wordsData} />
    </Container>
  );
};

export default WordGames;
