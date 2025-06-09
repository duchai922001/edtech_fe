import { useState } from "react";
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
  value: string;
  text: string;
  answer: boolean;
}

interface Form2Props {
  item: {
    questions: Question[];
  };
  index: number;
}

const Form2 = ({ item }: Form2Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const correct = item.questions.find((q) => q.answer);

  const handleSelect = (val: string) => {
    setSelected(val);
  };

  const isWrong = selected && selected !== correct?.value;
  return (
    <Card
      style={{ margin: 10, background: "#fefefe" }}
      bordered
      title={
        <Row justify="space-between">
          <Text>
            <b>Chọn những bức tranh tương ứng dựa trên những gì nghe được</b>
          </Text>
          {selected !== undefined && (
            <>
              <Text
                type={isWrong ? "danger" : "success"}
                style={{ marginLeft: 10 }}
              >
                {isWrong ? "Sai" : "Đúng"}
              </Text>
            </>
          )}
        </Row>
      }
    >
      <Row gutter={[16, 16]} justify="center">
        {item.questions.map((q: any) => {
          const isSelected = selected === q.value;
          const isCorrectAnswer = selected === null && q.answer;

          return (
            <Col key={q.id}>
              <div
                onClick={() => handleSelect(q.value)}
                style={{
                  border: isSelected
                    ? "3px solid orange"
                    : isCorrectAnswer
                    ? "3px solid green"
                    : "1px solid #ccc",
                  padding: 4,
                  borderRadius: 8,
                  cursor: "pointer",
                  textAlign: "center",
                  position: "relative",
                  width: 160,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -10,
                    left: -10,
                    background: "#ffb74d",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                    lineHeight: "24px",
                  }}
                >
                  {q.value}
                </div>

                <img
                  src={q.image}
                  alt={`option-${q.value}`}
                  style={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />

                {selected !== undefined && selected === q.value && isWrong && (
                  <CloseOutlined
                    style={{
                      color: "red",
                      fontSize: 24,
                      position: "absolute",
                      top: 8,
                      right: 8,
                    }}
                  />
                )}

                {selected === null && q.answer && (
                  <CheckOutlined
                    style={{
                      color: "green",
                      fontSize: 24,
                      position: "absolute",
                      top: 8,
                      right: 8,
                    }}
                  />
                )}
              </div>
            </Col>
          );
        })}
      </Row>

      {selected === undefined && (
        <Row justify="center" style={{ marginTop: 20 }}>
          <Button
            type="primary"
            danger
            icon={<QuestionOutlined />}
            onClick={() => setSelected(null)}
          >
            Tôi không biết
          </Button>
        </Row>
      )}
    </Card>
  );
};

export default Form2;
