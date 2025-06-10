import { useState } from "react";
import { Card, Row, Col, Button, Typography, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface Question {
  id: number;
  image: string;
  value: string; // "True" or "False"
  text: string;
  answer: boolean;
}

interface Form1Props {
  item: {
    questions: Question[];
  };
}

const Form1 = ({ item }: Form1Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction
  const correctAnswer = item.questions.find((q) => q.answer === true);

  const handleSelect = (value: string) => {
    setSelectedAnswer(value);
    setHasInteracted(true);
  };

  const handleIDontKnow = () => {
    setSelectedAnswer("dont-know");
    setHasInteracted(true);
  };

  const isCorrect = selectedAnswer === correctAnswer?.value;
  const showFeedback =
    selectedAnswer !== null && selectedAnswer !== "dont-know";
  const showHint =
    hasInteracted && (selectedAnswer === "dont-know" || showFeedback);

  return (
    <Card
      style={{
        margin: 10,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      bordered
      title={
        <Row justify="space-between" align="middle">
          <Text strong style={{ fontSize: 18 }}>
            Dựa vào từ nghe được phán đoán đúng sai
          </Text>
          {showFeedback && (
            <Text
              type={isCorrect ? "success" : "danger"}
              style={{ fontSize: 16, fontWeight: 500 }}
            >
              {isCorrect ? "Đúng" : "Sai"}
            </Text>
          )}
        </Row>
      }
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8} md={6}>
          <div
            style={{
              position: "relative",
              textAlign: "center",
              border: "1px solid #e8e8e8",
              borderRadius: 8,
              padding: 8,
              background: "white",
            }}
          >
            <img
              src={item?.questions?.[0]?.image}
              alt="question"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 6,
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.src = "/fallback-image.png";
              }}
            />
          </div>
        </Col>

        <Col xs={24} sm={16} md={18}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Row gutter={[12, 12]}>
              {item.questions
                .sort((a, b) => a.value.localeCompare(b.value)) // Sort True/False
                .map((q) => {
                  const isSelected = selectedAnswer === q.value;
                  const isCorrectAnswer = q.answer === true;
                  const showCorrect = showFeedback && isCorrectAnswer;
                  const showWrong = isSelected && showFeedback && !isCorrect;

                  return (
                    <Col key={`option-${q.id}`}>
                      <Button
                        type={isSelected ? "primary" : "default"}
                        icon={
                          showWrong ? (
                            <CloseOutlined style={{ color: "#ff4d4f" }} />
                          ) : showCorrect ? (
                            <CheckOutlined style={{ color: "#52c41a" }} />
                          ) : q.value === "True" ? (
                            <CheckOutlined />
                          ) : (
                            <CloseOutlined />
                          )
                        }
                        onClick={() => !showFeedback && handleSelect(q.value)}
                        style={{
                          borderColor: isSelected
                            ? "#1890ff"
                            : showCorrect
                            ? "#52c41a"
                            : showWrong
                            ? "#ff4d4f"
                            : "#e8e8e8",
                          backgroundColor: isSelected
                            ? "#e6f7ff"
                            : showCorrect
                            ? "#f6ffed"
                            : showWrong
                            ? "#fff1f0"
                            : "white",
                          color: showCorrect
                            ? "#52c41a"
                            : showWrong
                            ? "#ff4d4f"
                            : undefined,
                          borderRadius: 8,
                          padding: "0 16px",
                          height: 40,
                          fontSize: 16,
                          fontWeight: 500,
                          opacity:
                            showFeedback && !isSelected && !isCorrectAnswer
                              ? 0.6
                              : 1,
                        }}
                      >
                        {q.value === "True" ? "Đúng" : "Sai"}
                      </Button>
                    </Col>
                  );
                })}
              <Col>
                <Button
                  icon={<QuestionOutlined />}
                  onClick={handleIDontKnow}
                  danger
                  disabled={showFeedback}
                  style={{
                    borderRadius: 8,
                    padding: "0 16px",
                    height: 40,
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  Tôi không biết
                </Button>
              </Col>
            </Row>

            {showHint && (
              <div
                style={{
                  background: "#fffbe6",
                  padding: 12,
                  borderRadius: 8,
                  marginTop: 12,
                  border: "1px solid #ffe58f",
                }}
              >
                <Text strong style={{ fontSize: 16 }}>
                  Gợi ý đáp án đúng:{" "}
                </Text>
                <Button
                  icon={
                    correctAnswer?.value === "True" ? (
                      <CheckOutlined />
                    ) : (
                      <CloseOutlined />
                    )
                  }
                  type="default"
                  style={{
                    borderColor: "#fa8c16",
                    backgroundColor: "#fff7e6",
                    color: "#fa8c16",
                    borderRadius: 8,
                    marginLeft: 8,
                    fontWeight: 500,
                  }}
                >
                  {correctAnswer?.value === "True" ? "Đúng" : "Sai"}
                </Button>
              </div>
            )}
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default Form1;
