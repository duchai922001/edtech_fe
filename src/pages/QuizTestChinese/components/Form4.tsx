import { useState } from "react";
import { Card, Row, Col, Typography } from "antd";

const { Text } = Typography;

interface Question {
  id: number;
  image?: string;
  value: string;
  text: string;
  answer: boolean;
}

interface Form4Props {
  item: {
    questions: Question[];
  };
  index: number;
}

const Form4 = ({ item }: Form4Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const correct = item.questions.find((q) => q.answer);

  const handleSelect = (val: string) => {
    setSelected(val);
  };

  const isCorrect = selected === correct?.value;
  const isWrong = selected && !isCorrect;

  return (
    <Card
      style={{ margin: 10, background: "#fff" }}
      bordered
      title={
        <Row justify="space-between">
          <Text>
            <b>Nghe câu, chọn đáp án phù hợp với câu hỏi</b>{" "}
          </Text>
          {selected !== undefined && (
            <Text
              type={isWrong ? "danger" : "success"}
              style={{ marginLeft: 10 }}
            >
              {isWrong ? "Sai" : "Đúng"}
            </Text>
          )}
        </Row>
      }
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {item.questions.map((q) => {
          const isSelected = selected === q.value;
          return (
            <Col span={24} key={q.id}>
              <div
                onClick={() => handleSelect(q.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  border: isSelected
                    ? "2px solid #ffa500"
                    : "1px solid #d9d9d9",
                  borderRadius: 4,
                  cursor: "pointer",
                  background: isSelected ? "#fff3e0" : "#fff",
                  transition: "all 0.3s",
                }}
              >
                <span
                  style={{
                    width: 30,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: isSelected ? "#ffa500" : "#000",
                  }}
                >
                  {q.value}
                </span>
                <span>{q.text}</span>
              </div>
            </Col>
          );
        })}
      </Row>
      {selected !== undefined && (
        <Row
          justify="space-between"
          style={{
            background: "#fff9e6",
            padding: "10px 15px",
            borderRadius: 4,
            border: "1px solid #ffe58f",
          }}
        >
          <Text strong>Đáp án đúng:</Text>
          <Text>
            {correct?.value} {correct?.text}
          </Text>
        </Row>
      )}
    </Card>
  );
};

export default Form4;
