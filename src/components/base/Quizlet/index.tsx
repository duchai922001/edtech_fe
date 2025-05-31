import React, { useState } from "react";
import { Radio, Button, Space, Row, Col } from "antd";

interface QuizProps {
  question: string;
  optionB: string;
  options: string[];
  numberQuestion: number;
  totalQuestion: number;
}

const Quiz: React.FC<QuizProps> = ({
  question,
  optionB,
  options,
  numberQuestion,
  totalQuestion,
}) => {
  const [value, setValue] = useState<string | null>(null);

  const handleRadioChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "#1a2a44",
        padding: "24px",
        borderRadius: "10px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        maxWidth: "100%",
        margin: "0 auto",
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "14px", color: "#888" }}>Thuật ngữ</span>
        <span style={{ fontSize: "14px", color: "#888" }}>
          {numberQuestion}/{totalQuestion}
        </span>
      </div>

      <h3 style={{ margin: "10px 0", fontSize: "18px" }}>{question}</h3>
      <p
        style={{
          display: "flex",
          justifyContent: "flex-start",
          fontSize: "14px",
          color: "#888",
          margin: "24px 0",
        }}
      >
        Chọn định nghĩa đúng
      </p>
      <Radio.Group
        onChange={handleRadioChange}
        value={value}
        style={{ width: "100%" }}
      >
        <Row style={{ width: "100%" }} gutter={[12, 12]}>
          {options?.map((item) => (
            <Col span={12}>
              <Radio
                value={item}
                style={{
                  color: "white",
                  marginBottom: "10px",
                  backgroundColor: "#2a3b5a",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #444",
                  width: "100%",
                }}
              >
                {item}
              </Radio>
            </Col>
          ))}
        </Row>
      </Radio.Group>

      <Button
        style={{
          width: "100%",
          backgroundColor: "#3b5998",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        Bạn không biết?
      </Button>
    </div>
  );
};

export default Quiz;
