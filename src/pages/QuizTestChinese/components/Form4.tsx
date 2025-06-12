import { useState, useMemo } from "react";
import { Card, Row, Col, Typography } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Question {
  id: number;
  image?: string;
  value: string; // A, B, C
  text: string;
  answer: boolean;
  desR?: string | null;
  desL?: string | null;
}

interface Form4Props {
  questions: { questions: Question[] }[];
}

const Form4 = ({ questions }: Form4Props) => {
  const [selectedMap, setSelectedMap] = useState<{
    [key: number]: string | null;
  }>({});
  const [hasInteractedMap, setHasInteractedMap] = useState<{
    [key: number]: boolean;
  }>({});

  // Group questions by inferred question number (using id range or another identifier)
  const groupedQuestions = useMemo(() => {
    const allQuestions = questions.flatMap((q) => q.questions);
    // Since image is empty, group by id proximity (e.g., 63, 64, 65 are one question)
    const questionMap: { [key: string]: Question[] } = {};
    allQuestions.forEach((q) => {
      // Group by a common identifier; here, we assume consecutive IDs belong to one question
      // Adjust this logic if there's a specific question number identifier
      const questionNumber = Math.floor((q.id - 63) / 3).toString(); // Example grouping for IDs 63-65
      if (!questionMap[questionNumber]) {
        questionMap[questionNumber] = [];
      }
      questionMap[questionNumber].push(q);
    });
    return Object.values(questionMap).map((group) =>
      group.sort((a, b) => a.value.localeCompare(b.value))
    );
  }, [questions]);

  const handleSelect = (questionIndex: number, value: string) => {
    setSelectedMap((prev) => ({ ...prev, [questionIndex]: value }));
    setHasInteractedMap((prev) => ({ ...prev, [questionIndex]: true }));
  };

  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      {groupedQuestions.map((questionGroup, questionIndex) => {
        const selected = selectedMap[questionIndex] || null;
        const hasInteracted = hasInteractedMap[questionIndex] || false;
        const correct = questionGroup.find((q) => q.answer);
        const isCorrect = selected === correct?.value;
        const isWrong = selected !== null && !isCorrect;

        return (
          <Card
            key={`question-${questionIndex}`}
            style={{
              margin: "20px auto",
              maxWidth: "100%",
              background: "#ffffff",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            bordered
            title={
              <Row justify="space-between" align="middle">
                <Text strong style={{ fontSize: 18 }}>
                  Câu {questionIndex + 1}: Nghe câu, chọn đáp án phù hợp với câu
                  hỏi
                </Text>
                {hasInteracted && (
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
            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              {questionGroup.map((q) => {
                const isSelected = selected === q.value;
                const isCorrectAnswer = q.answer;
                const showCorrect = hasInteracted && isCorrectAnswer;
                const showWrong = isSelected && hasInteracted && !isCorrect;

                return (
                  <Col span={24} key={`option-${q.id}`}>
                    <div
                      onClick={() =>
                        !hasInteracted && handleSelect(questionIndex, q.value)
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 16px",
                        border: isSelected
                          ? "2px solid #fa8c16"
                          : showCorrect
                          ? "2px solid #52c41a"
                          : showWrong
                          ? "2px solid #ff4d4f"
                          : "1px solid #e8e8e8",
                        borderRadius: 8,
                        cursor: hasInteracted ? "default" : "pointer",
                        background: isSelected
                          ? "#fff7e6"
                          : showCorrect
                          ? "#f6ffed"
                          : showWrong
                          ? "#fff1f0"
                          : "#fff",
                        transition: "all 0.3s",
                        opacity:
                          hasInteracted && !isSelected && !isCorrectAnswer
                            ? 0.6
                            : 1,
                      }}
                    >
                      <span
                        style={{
                          width: 40,
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: 16,
                          color: isSelected
                            ? "#fa8c16"
                            : showCorrect
                            ? "#52c41a"
                            : showWrong
                            ? "#ff4d4f"
                            : "#2d365c",
                          marginRight: 12,
                        }}
                      >
                        {q.value}
                      </span>
                      <Text style={{ fontSize: 16 }}>
                        {q.text || "Không có nội dung"}
                      </Text>
                      {showWrong && (
                        <CloseOutlined
                          style={{
                            color: "#ff4d4f",
                            fontSize: 20,
                            marginLeft: 12,
                          }}
                        />
                      )}
                      {showCorrect && (
                        <CheckOutlined
                          style={{
                            color: "#52c41a",
                            fontSize: 20,
                            marginLeft: 12,
                          }}
                        />
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
            {hasInteracted && (
              <Row
                style={{
                  background: "#fffbe6",
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1px solid #ffe58f",
                }}
              >
                <Text strong style={{ fontSize: 16 }}>
                  Đáp án đúng:{" "}
                </Text>
                <Text style={{ fontSize: 16, marginLeft: 8 }}>
                  {correct?.value}. {correct?.text || "Không có nội dung"}
                </Text>
              </Row>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default Form4;
