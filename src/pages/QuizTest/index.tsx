import { Button, message } from "antd";
import Container from "../../components/base/Container";
import Quiz from "../../components/base/Quizlet";
import { useGetMocktestByTitle } from "../../hooks/useMocktest";
import { useParams } from "react-router-dom";
import { useState } from "react";

const QuizTest: React.FC = () => {
  const { title } = useParams();
  const { data } = useGetMocktestByTitle(title ?? "");

  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (index: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: answer,
    }));
  };

  const handleSubmit = () => {
    let correct = 0;

    data?.mocktests?.forEach((quiz, index) => {
      if (userAnswers[index] === quiz.answerQuestion) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
    message.success(
      `Bạn trả lời đúng ${correct}/${data?.mocktests?.length} câu!`
    );
  };

  return (
    <Container>
      <div
        style={{
          margin: "32px 0",
          width: "100%",
          maxWidth: 800,
          marginInline: "auto",
          position: "relative",
          textAlign: "center",
        }}
      >
        {data?.mocktests?.map((quiz, index) => (
          <Quiz
            key={index}
            question={quiz.question}
            optionAnswer={userAnswers[index] || ""}
            onSelectOption={(answer) => handleOptionSelect(index, answer)}
            options={quiz.answers}
            numberQuestion={index + 1}
            totalQuestion={data?.mocktests?.length}
            disabled={submitted}
            correctAnswer={quiz.answerQuestion}
          />
        ))}
      </div>

      {!submitted && (
        <Button
          style={{
            margin: "0 auto",
            marginBottom: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            background: "var(--primary-color)",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          Gửi bài kiểm tra
        </Button>
      )}

      {submitted && (
        <div style={{ textAlign: "center", fontSize: 18, marginBottom: 32 }}>
          ✅ Bạn đã làm đúng {score}/{data?.mocktests?.length} câu hỏi!
        </div>
      )}
    </Container>
  );
};

export default QuizTest;
