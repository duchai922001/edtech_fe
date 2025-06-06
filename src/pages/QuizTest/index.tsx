import { Button, message, Result } from "antd";
import Container from "../../components/base/Container";
import Quiz from "../../components/base/Quizlet";
import { useGetMocktestByTitle } from "../../hooks/useMocktest";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDeviceType } from "../../hooks/useDevice";

const QuizTest: React.FC = () => {
  const { title } = useParams();
  const { data } = useGetMocktestByTitle(title ?? "");
  const navigate = useNavigate();

  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isMonitor } = useDeviceType();
  useEffect(() => {
    if (submitted) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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

  const handleTryAgain = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(0);
    setSeconds(0);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const total = data?.mocktests?.length || 0;
  const percentage = (score / total) * 100;
  const isPassed = percentage >= 50;

  return (
    <Container>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: 16 }}>
        <h2>Làm bài thi của bạn</h2>
        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: submitted ? "gray" : "var(--primary-color)",
          }}
        >
          {formatTime(seconds)}
        </div>
      </header>

      {!submitted && (
        <div
          style={{
            position: "fixed",
            top: "230px",
            right: isMonitor ? "200px" : 50,
            width: "250px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            zIndex: 1000,
          }}
        >
          {data?.mocktests?.map((_, index) => {
            const isAnswered = !!userAnswers[index];
            return (
              <Button
                key={index}
                onClick={() =>
                  questionRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                style={{
                  width: 50,
                  height: 50,
                  background: isAnswered ? "var(--primary-color)" : "#f0f0f0",
                  color: isAnswered ? "#fff" : "#000",
                  border: "1px solid #ccc",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>
      )}

      {!submitted && (
        <div
          style={{
            margin: "32px 0",
            width: "100%",
            maxWidth: 900,
            marginInline: "auto",
            position: "relative",
            textAlign: "center",
          }}
        >
          {data?.mocktests?.map((quiz, index) => (
            <div
              key={index}
              ref={(el) => (questionRefs.current[index] = el)}
              style={{ marginBottom: 32 }}
            >
              <Quiz
                question={quiz.question}
                optionAnswer={userAnswers[index] || ""}
                onSelectOption={(answer) => handleOptionSelect(index, answer)}
                options={quiz.answers}
                numberQuestion={index + 1}
                totalQuestion={data?.mocktests?.length}
                disabled={submitted}
                correctAnswer={quiz.answerQuestion}
                isAnswered={!!userAnswers[index]}
                imageQuestion={quiz.imageQuestion}
                listenUrl={quiz.listenUrl}
              />
            </div>
          ))}
        </div>
      )}

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
        <Result
          status={isPassed ? "success" : "error"}
          title={isPassed ? "🎉 Chúc mừng!" : "😢 Thử lại lần sau!"}
          subTitle={`Bạn đã trả lời đúng ${score} trên tổng ${total} câu hỏi.`}
          icon={
            <img
              src={
                isPassed
                  ? "https://i.pinimg.com/originals/5b/11/db/5b11dbec2fc43fb686bb30e49163c1cc.gif"
                  : "https://i.pinimg.com/originals/2e/b8/dd/2eb8dda12be99f0385e10f048ac81aae.gif"
              }
              alt={isPassed ? "Success" : "Fail"}
              style={{ width: "20%", height: "20%" }}
            />
          }
          extra={[
            <Button type="primary" key="back" onClick={handleBack}>
              Quay lại
            </Button>,
            <Button key="retry" onClick={handleTryAgain}>
              Làm lại
            </Button>,
          ]}
        />
      )}
    </Container>
  );
};

export default QuizTest;
