import { useState, useMemo } from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface Question {
  id: number;
  image: string;
  value: string; // A, B, C
  text: string;
  answer: boolean;
  desR?: string | null;
  desL?: string | null;
}

interface Form2Props {
  questions: { questions: Question[] }[];
}

const Form2 = ({ questions }: Form2Props) => {
  const [selectedMap, setSelectedMap] = useState<{
    [key: number]: string | null;
  }>({});

  const handleSelect = (questionIndex: number, value: string) => {
    setSelectedMap((prev) => ({ ...prev, [questionIndex]: value }));
  };

  const handleDontKnow = (questionIndex: number) => {
    setSelectedMap((prev) => ({ ...prev, [questionIndex]: "dont-know" }));
  };

  // Group questions by question number (inferred from image URL or ID)
  const groupedQuestions = useMemo(() => {
    // Flatten all questions into a single array
    const allQuestions = questions.flatMap((q) => q.questions);

    // Group by question number (extract from image URL, e.g., "6A" -> question 6)
    const questionMap: { [key: string]: Question[] } = {};
    allQuestions.forEach((q) => {
      // Extract question number from image URL (e.g., "6A" -> "6")
      const questionNumber = q.image.match(/\/(\d+)[A-C]/)?.[1];
      if (questionNumber) {
        if (!questionMap[questionNumber]) {
          questionMap[questionNumber] = [];
        }
        questionMap[questionNumber].push(q);
      }
    });

    // Convert to array and sort options (A, B, C)
    return Object.values(questionMap).map((group) =>
      group.sort((a, b) => a.value.localeCompare(b.value))
    );
  }, [questions]);

  // Debug data
  console.log("Questions input:", questions);
  console.log("Grouped Questions:", groupedQuestions);

  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      {groupedQuestions.map((questionGroup, questionIndex) => {
        const selected = selectedMap[questionIndex] || null;
        const correctValue = questionGroup.find((q) => q.answer)?.value;
        const isWrong =
          selected !== null &&
          selected !== correctValue &&
          selected !== "dont-know";

        return (
          <Card
            key={`question-${questionIndex}`}
            style={{
              margin: "20px auto",
              maxWidth: 900,
              background: "#ffffff",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            bordered
            title={
              <Row justify="space-between" align="middle">
                <Text strong style={{ fontSize: 18 }}>
                  Câu {questionIndex + 1}: Chọn bức tranh tương ứng với nội dung
                  nghe được
                </Text>
                {selected !== null && selected !== "dont-know" && (
                  <Text
                    type={isWrong ? "danger" : "success"}
                    style={{ fontSize: 16, fontWeight: 500 }}
                  >
                    {isWrong ? "Sai" : "Đúng"}
                  </Text>
                )}
              </Row>
            }
          >
            <Row gutter={[16, 16]} justify="center">
              {questionGroup.map((q: Question) => {
                const isSelected = selected === q.value;
                const isCorrectAnswer = q.answer;
                const showCorrect = selected !== null && isCorrectAnswer;
                const showWrong = isSelected && isWrong;

                return (
                  <Col key={`option-${q.id}`} xs={24} sm={12} md={8} lg={6}>
                    <div
                      onClick={() =>
                        selected === null &&
                        handleSelect(questionIndex, q.value)
                      }
                      style={{
                        border: isSelected
                          ? "3px solid #fa8c16"
                          : showCorrect
                          ? "3px solid #52c41a"
                          : "1px solid #e8e8e8",
                        padding: 8,
                        borderRadius: 8,
                        cursor: selected === null ? "pointer" : "default",
                        textAlign: "center",
                        position: "relative",
                        background: "white",
                        transition: "all 0.3s ease",
                        opacity:
                          selected !== null && !isSelected && !isCorrectAnswer
                            ? 0.6
                            : 1,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: -14,
                          left: -14,
                          background: isSelected ? "#fa8c16" : "#2d365c",
                          borderRadius: "50%",
                          width: 32,
                          height: 32,
                          fontWeight: "bold",
                          color: "white",
                          textAlign: "center",
                          lineHeight: "32px",
                          fontSize: 18,
                        }}
                      >
                        {q.value}
                      </div>
                      <img
                        src={q.image}
                        alt={`option-${q.value}`}
                        style={{
                          width: "100%",
                          height: 140,
                          objectFit: "cover",
                          borderRadius: 6,
                          display: "block",
                        }}
                        onError={(e) => {
                          e.currentTarget.src = "/fallback-image.png";
                        }}
                      />
                      {showWrong && (
                        <CloseOutlined
                          style={{
                            color: "#ff4d4f",
                            fontSize: 28,
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "50%",
                            padding: 4,
                          }}
                        />
                      )}
                      {showCorrect && (
                        <CheckOutlined
                          style={{
                            color: "#52c41a",
                            fontSize: 28,
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "50%",
                            padding: 4,
                          }}
                        />
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
            {selected === null && (
              <Row justify="center" style={{ marginTop: 24 }}>
                <Button
                  type="primary"
                  danger
                  icon={<QuestionOutlined />}
                  onClick={() => handleDontKnow(questionIndex)}
                  style={{
                    borderRadius: 8,
                    padding: "0 24px",
                    height: 44,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Tôi không biết
                </Button>
              </Row>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default Form2;
