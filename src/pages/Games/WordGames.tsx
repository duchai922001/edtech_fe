import Container from "../../components/base/Container";
import WordScrambleGame from "../../components/base/WordScrambleGame";

const WordGames: React.FC = () => {
  const wordsData = [
    "我喜欢吃苹果",
    "他在学校学习中文",
    "今天天气很好",
    "我喜欢看书",
    "他正在工作",
    "我每天跑步",
    "她是我的朋友",
    "我们去看电影",
    "这个问题很难",
    "我有很多书",
    "他喜欢喝茶",
    "我们一起学习中文",
    "我喜欢旅行",
    "今天是星期天",
    "我住在北京",
    "她很喜欢画画",
    "我们去游泳",
    "他每天跑步",
    "我有很多朋友",
    "我喜欢听音乐",
    "她在学校工作",
    "我爱喝咖啡",
  ];
  return (
    <Container>
      <WordScrambleGame words={wordsData} />
    </Container>
  );
};

export default WordGames;
