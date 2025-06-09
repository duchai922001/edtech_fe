import { useState } from "react";
import { Col, Row, Button, Typography, Space, Card } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface Question {
  id: number;
  image: string;
  value: string;
  text: string;
  answer: boolean;
}

interface Form1Props {
  item: {
    questions: Question[];
  };
  index: number;
}

const Form1 = ({ item }: Form1Props) => {
  const correctAnswer = item.questions.find((q) => q.answer === true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleIDontKnow = () => {
    setSelectedAnswer(null);
  };

  return (
    <Card
      title={<Text strong>Dựa vào từ nghe được phán đoán đúng sai</Text>}
      bordered
      style={{ margin: 10 }}
    >
      <Row gutter={16}>
        <Col span={6}>
          <img
            src={item?.questions?.[0].image}
            alt="question"
            style={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Col>

        <Col span={18}>
          <Space direction="vertical" size="middle">
            <Row gutter={10}>
              {item.questions.map((q) => {
                const isSelected = selectedAnswer === q.value;
                const isCorrect = q.answer === true;

                return (
                  <Col key={q.id}>
                    <Button
                      type={isSelected ? "primary" : "default"}
                      icon={
                        q.value === "True" ? (
                          <CheckOutlined />
                        ) : (
                          <CloseOutlined />
                        )
                      }
                      onClick={() => handleSelect(q.value)}
                      style={{
                        borderColor: isSelected
                          ? "#1890ff"
                          : isCorrect && selectedAnswer === null
                          ? "green"
                          : "#ccc",
                        backgroundColor: isSelected
                          ? "#bae7ff"
                          : isCorrect && selectedAnswer === null
                          ? "#e6ffe6"
                          : "white",
                        color:
                          isCorrect && selectedAnswer === null
                            ? "green"
                            : undefined,
                      }}
                    />
                  </Col>
                );
              })}
              <Col>
                <Button
                  icon={<QuestionOutlined />}
                  onClick={handleIDontKnow}
                  danger
                >
                  Tôi không biết
                </Button>
              </Col>
            </Row>

            {selectedAnswer === null && (
              <div
                style={{
                  background: "#fffbe6",
                  padding: 12,
                  borderRadius: 6,
                  marginTop: 10,
                }}
              >
                <Text strong>Gợi ý đáp án đúng: </Text>
                <Button
                  icon={<CheckOutlined />}
                  type="default"
                  style={{
                    borderColor: "orange",
                    backgroundColor: "#fff1b8",
                    marginLeft: 10,
                  }}
                >
                  {correctAnswer?.value === "True" ? "✓" : "✕"}
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
