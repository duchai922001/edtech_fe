import React, { useEffect, useState } from "react";
import { Radio, Button, Space, Row, Col, Typography } from "antd";

interface QuizProps {
  question: string;
  optionAnswer: string; // user's selected answer
  options: string[];
  numberQuestion: number;
  totalQuestion: number;
  onSelectOption?: (value: string) => void;
  disabled?: boolean;
  correctAnswer?: string;
  isAnswered?: boolean;
}

const Quiz: React.FC<QuizProps> = ({
  question,
  optionAnswer,
  options,
  numberQuestion,
  totalQuestion,
  onSelectOption,
  disabled = false,
  correctAnswer,
  isAnswered,
}) => {
  const [value, setValue] = useState<string | null>(optionAnswer || null);

  useEffect(() => {
    setValue(optionAnswer || null);
  }, [optionAnswer]);

  const handleRadioChange = (e: any) => {
    setValue(e.target.value);
    if (onSelectOption) onSelectOption(e.target.value);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: isAnswered ? "#00809D" : "#1d4e3a",
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
          <span style={{ fontSize: "14px", color: "white" }}>Thuật ngữ</span>
          <span style={{ fontSize: "14px", color: "white" }}>
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
          disabled={disabled}
        >
          <Row style={{ width: "100%" }} gutter={[12, 12]}>
            {options?.map((item) => {
              const isCorrect = disabled && correctAnswer === item;
              const isWrong =
                disabled && value === item && item !== correctAnswer;

              return (
                <Col span={12} key={item}>
                  <Radio
                    value={item}
                    style={{
                      color: "black",
                      marginBottom: "10px",
                      backgroundColor: isCorrect
                        ? "#4caf50"
                        : isWrong
                        ? "#f44336"
                        : "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #444",
                      width: "100%",
                      opacity: disabled ? 0.9 : 1,
                    }}
                  >
                    {item}
                  </Radio>
                </Col>
              );
            })}
          </Row>
        </Radio.Group>

        {!disabled && (
          <Button
            style={{
              width: "100%",
              backgroundColor: "#3b5998",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              marginTop: 12,
            }}
            onClick={() => {
              if (onSelectOption) onSelectOption(correctAnswer || "");
              setValue(correctAnswer || "");
            }}
          >
            Bạn không biết?
          </Button>
        )}
      </div>
    </>
  );
};

export default Quiz;
