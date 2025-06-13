import React, { useState } from "react";
import { Input, Button, Space } from "antd";
import Container from "../Container";
import toast from "react-hot-toast";

interface Clue {
  question: string;
  answer: string;
}

interface CrosswordGameProps {
  mainWord: string;
  clues: { [key: number]: Clue };
}

const CrosswordGame: React.FC<CrosswordGameProps> = ({ mainWord, clues }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [disabledRows, setDisabledRows] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [mainWordInput, setMainWordInput] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const handleRowClick = (row: number) => {
    setSelectedRow(row);
  };

  const handleInputChange = (row: number, value: string) => {
    setAnswers({ ...answers, [row]: value.toUpperCase() });
  };

  const handleSubmitRow = (row: number) => {
    const clueAnswer = clues[row].answer.toUpperCase();
    if (answers[row] === clueAnswer) {
      toast.success(`Đúng! Đáp án hàng ${row} đã được hiển thị.`);
    } else {
      toast.error(`Sai! Hàng ${row} sẽ bị khóa.`);
      setDisabledRows({ ...disabledRows, [row]: true });
      setAnswers({ ...answers, [row]: "" });
    }
    setSelectedRow(null);
  };

  const handleMainWordSubmit = () => {
    if (mainWordInput.toUpperCase() === mainWord.toUpperCase()) {
      toast.success("Chúc mừng bạn đã hoàn thành thử thách!");
      setCompleted(true);
    } else {
      toast.error("Sai từ khóa!");
      setFailed(true);
    }
  };

  const Celebration = () => (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
        borderRadius: "15px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        maxWidth: "500px",
        margin: "50px auto",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Congratulation you finish the challenge!
      </h1>
      <p style={{ fontSize: "18px" }}>
        Finshed at{" "}
        {new Date().toLocaleTimeString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })}{" "}
        day {new Date().toLocaleDateString("vi-VN")}.
      </p>
      <Button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Replay
      </Button>
    </div>
  );

  const FailedMessage = () => (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        background: "linear-gradient(135deg, #ff6f61, #ff9f80)",
        borderRadius: "15px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        maxWidth: "500px",
        margin: "50px auto",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        You fail!
      </h1>
      <p style={{ fontSize: "18px" }}>Try again!</p>
      <Button
        onClick={() => window.location.reload()}
        style={{
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Replay
      </Button>
    </div>
  );

  return (
    <Container>
      {completed ? (
        <Celebration />
      ) : failed ? (
        <FailedMessage />
      ) : (
        <div
          style={{
            background: "linear-gradient(135deg, #1a2a44 0%, #2a3b5a 100%)",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
            color: "white",
            fontFamily: "Arial, sans-serif",
            maxWidth: "700px",
            margin: "50px auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "20px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              backgroundColor: "rgba(255, 165, 0, 0.8)",
              padding: "10px",
              borderRadius: "8px",
              display: "inline-block",
            }}
          >
            Cross Word Game
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              textAlign: "start",
            }}
          >
            <ul>
              <li>Click on the number box to reveal the hint question</li>
              <li>If you know the answer to the keyword, type it and submit the answer</li>
              <li>The keyword consists of {mainWord.length} letters</li>
            </ul>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${mainWord.length + 2}, 50px)`,
              gap: "5px",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            {Object.keys(clues).map((row) => (
              <React.Fragment key={row}>
                <div
                  onClick={() => handleRowClick(Number(row))}
                  style={{
                    gridColumn: 1,
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#87ceeb",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {Number(row) - 1}
                </div>
                {Array.from(
                  { length: clues[Number(row)].answer.length },
                  (_, colIdx) => (
                    <div
                      key={`${row}-${colIdx}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor:
                          answers[Number(row)] && !disabledRows[Number(row)]
                            ? "#ffd700"
                            : "rgba(255, 255, 255, 0.2)",
                        color:
                          answers[Number(row)] && !disabledRows[Number(row)]
                            ? "black"
                            : "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {answers[Number(row)] && !disabledRows[Number(row)]
                        ? answers[Number(row)][colIdx] || ""
                        : ""}
                    </div>
                  )
                )}
              </React.Fragment>
            ))}
          </div>

          {selectedRow !== null && (
            <div style={{ marginBottom: "20px", color: "#87ceeb" }}>
              <div>
                Row {Number(selectedRow) - 1}: {clues[selectedRow].question}
              </div>
              <Space style={{ marginTop: "10px" }}>
                <Input
                  value={answers[selectedRow] || ""}
                  onChange={(e) =>
                    handleInputChange(selectedRow, e.target.value)
                  }
                  placeholder="Nhập đáp án..."
                  disabled={disabledRows[selectedRow]}
                  style={{
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "none",
                  }}
                  onPressEnter={() => handleSubmitRow(selectedRow)}
                />
                <Button
                  onClick={() => handleSubmitRow(selectedRow)}
                  style={{
                    backgroundColor: "#ff4500",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "16px",
                  }}
                >
                  Confirm
                </Button>
              </Space>
            </div>
          )}

          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <Input
                value={mainWordInput}
                onChange={(e) => setMainWordInput(e.target.value)}
                placeholder="Nhập từ khóa chính..."
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "none",
                  marginBottom: "10px",
                }}
              />
              <Button
                onClick={handleMainWordSubmit}
                style={{
                  backgroundColor: "#ff8c00",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontSize: "16px",
                }}
              >
                Submit Key Word
              </Button>
            </div>
          </Space>
        </div>
      )}
    </Container>
  );
};

export default CrosswordGame;
