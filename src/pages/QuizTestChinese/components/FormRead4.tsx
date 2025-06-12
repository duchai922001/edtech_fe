import { useState } from "react";
import { Card, Row, Col, Typography, Input, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Question {
  id: number;
  image: string;
  value: string; // A, B, D, E, F
  text: string;
  desR?: string;
  desL?: string;
  answer: boolean;
}

interface FormRead4Props {
  questions: { questions: Question[] }[];
}

const FormRead4 = ({ questions }: FormRead4Props) => {
  // Flatten all questions into a single array
  const allQuestions = questions.flatMap((q) => q.questions);

  // State to store user inputs (e.g., { A: "1", B: "2", D: "3", ... })
  const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({});
  // State to store validation results
  const [results, setResults] = useState<{ [key: string]: boolean | null }>({});

  // Handle input change for each value
  const handleInputChange = (value: string, input: string) => {
    setUserInputs((prev) => ({ ...prev, [value]: input }));
    // Reset validation for this value
    setResults((prev) => ({ ...prev, [value]: null }));
  };

  // Validate all inputs
  const handleSubmit = () => {
    const newResults: { [key: string]: boolean | null } = {};
    allQuestions.forEach((q) => {
      // For simplicity, assume correct mapping is the index + 1 (e.g., A -> 1, B -> 2, D -> 3, etc.)
      // Adjust this logic if the correct mapping is different
      const correctNumber = (
        allQuestions.findIndex((item) => item.value === q.value) + 1
      ).toString();
      newResults[q.value] = userInputs[q.value] === correctNumber;
    });
    setResults(newResults);
  };

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
            Chọn số tương ứng với mỗi bức tranh
          </Text>
        </Row>
      }
    >
      {/* Render all images */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }} justify="center">
        {allQuestions
          .sort((a, b) => a.value.localeCompare(b.value)) // Sort by value (A, B, D, E, F)
          .map((item, index) => (
            <Col key={`image-${item.id}`} xs={12} sm={8} md={4}>
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
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: -14,
                    background: "#2d365c",
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
                  {item.value}
                </div>
                <img
                  src={item.image}
                  alt={`option-${item.value}`}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 6,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/fallback-image.png";
                  }}
                />
                <Text style={{ display: "block", marginTop: 8 }}>
                  {index + 1}
                </Text>
              </div>
            </Col>
          ))}
      </Row>

      {/* Render input fields for each value */}
      <div style={{ marginBottom: 24 }}>
        {allQuestions
          .sort((a, b) => a.value.localeCompare(b.value))
          .map((item) => (
            <Row
              key={`input-${item.id}`}
              style={{ marginBottom: 12 }}
              align="middle"
            >
              <Col span={4}>
                <Text strong>{item.value}. </Text>
              </Col>
              <Col span={4}>
                <Input
                  value={userInputs[item.value] || ""}
                  onChange={(e) =>
                    handleInputChange(item.value, e.target.value)
                  }
                  placeholder="Nhập số (1, 2, 3, ...)"
                  style={{ width: 120 }}
                />
              </Col>
              <Col span={16}>
                <Text>{item.desR || item.desL || ""}</Text>
                {results[item.value] !== null && (
                  <span style={{ marginLeft: 12 }}>
                    {results[item.value] ? (
                      <CheckOutlined
                        style={{ color: "#52c41a", fontSize: 20 }}
                      />
                    ) : (
                      <CloseOutlined
                        style={{ color: "#ff4d4f", fontSize: 20 }}
                      />
                    )}
                  </span>
                )}
              </Col>
            </Row>
          ))}
      </div>

      {/* Submit button */}
      <Row justify="center">
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{
            borderRadius: 8,
            padding: "0 24px",
            height: 44,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          Kiểm tra
        </Button>
      </Row>
    </Card>
  );
};

export default FormRead4;
