import { useState } from "react";
import { Card, Row, Col, Typography } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Question {
  id: number;
  image: string;
  value: string;
  text: string;
  answer: boolean;
}

interface FormRead1Props {
  item: {
    questions: Question[];
  };
  index: number;
}

const FormRead1 = ({ item, index }: FormRead1Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const correct = item.questions.find((q) => q.answer);

  const handleSelect = (val: string) => {
    setSelected(val);
  };

  const isCorrect = selected === correct?.value;
  const isWrong = selected && !isCorrect;
  console.log({ item });
  return (
    <Card
      style={{ margin: 10, background: "#fff" }}
      bordered
      title={
        <Row justify="space-between" align="middle">
          <Text>
            <b>Phán đoán đúng sai</b> <Text type="secondary">Sai</Text>{" "}
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
      <Row gutter={[16, 16]} align="middle">
        <Col span={12}>
          <img
            src={item.questions[0].image}
            alt={`question-${index + 1}`}
            style={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 4,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.questions.map((q) => (
              <span>{q?.text}</span>
            ))}
          </div>
        </Col>
        <Col span={12}>
          <Row gutter={[8, 8]}>
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
                        ? "2px solid #52c41a"
                        : "1px solid #d9d9d9",
                      borderRadius: 4,
                      cursor: "pointer",
                      background: isSelected ? "#f6ffed" : "#fff",
                      transition: "all 0.3s",
                    }}
                  >
                    {isSelected && q.answer && (
                      <CheckOutlined
                        style={{ color: "#52c41a", marginRight: 8 }}
                      />
                    )}
                    {isSelected && !q.answer && (
                      <CloseOutlined
                        style={{ color: "#ff4d4f", marginRight: 8 }}
                      />
                    )}
                    <span
                      style={{ fontWeight: isSelected ? "bold" : "normal" }}
                    >
                      {q.value}
                    </span>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      {selected !== undefined && (
        <Row
          justify="space-between"
          style={{
            background: "#fff9e6",
            padding: "10px 15px",
            borderRadius: 4,
            border: "1px solid #ffe58f",
            marginTop: 16,
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

export default FormRead1;
