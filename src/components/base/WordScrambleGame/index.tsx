import React, { useState, useEffect } from "react";
import { Input, Button, Space } from "antd";
import Container from "../Container";
import toast from "react-hot-toast";

interface WordScrambleGameProps {
  words: string[];
}

const WordScrambleGame: React.FC<WordScrambleGameProps> = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (currentIndex < words.length) {
      const allLetters = words[currentIndex].toUpperCase().split("");
      setAvailableLetters(shuffleArray([...allLetters]));
      setUserInput("");
      setShowHint(false);
    }
  }, [currentIndex, words]);

  const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    const cleanedInput = userInput.replace(/\s/g, "").toUpperCase();
    const correctWord = words[currentIndex].toUpperCase();
    if (cleanedInput === correctWord) {
      toast.success("Đúng!");
      if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCompleted(true);
      }
    } else {
      toast.error("Sai!");
    }
  };

  const handleShowHint = () => {
    setShowHint(true);
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
        Chúc mừng bạn hoàn thành thử thách!
      </h1>
      <p style={{ fontSize: "18px" }}>
        Bạn đã hoàn thành vào lúc{" "}
        {new Date().toLocaleTimeString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })}{" "}
        ngày {new Date().toLocaleDateString("vi-VN")}.
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
        Chơi lại
      </Button>
    </div>
  );

  return (
    <Container>
      {!completed ? (
        <div
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
            color: "white",
            fontFamily: "Arial, sans-serif",
            maxWidth: "800px",
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
            Đoán từ: {words[currentIndex].length} chữ cái
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {availableLetters.map((letter, index) => (
              <div
                key={index}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "rgba(255, 165, 0, 0.9)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                }}
              >
                {letter}
              </div>
            ))}
          </div>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              value={userInput}
              onChange={handleInputChange}
              placeholder="Nhập từ bạn đoán..."
              style={{
                borderRadius: "8px",
                padding: "10px",
                fontSize: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "none",
              }}
              onPressEnter={handleSubmit}
            />

            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#ff4500",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Kiểm tra
            </Button>

            <Button
              onClick={handleShowHint}
              style={{
                backgroundColor: "#ff8c00",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Gợi ý
            </Button>

            {showHint && (
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  color: "#ffd700",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                Từ đúng: <strong>{words[currentIndex].toUpperCase()}</strong>
              </div>
            )}
          </Space>
        </div>
      ) : (
        <Celebration />
      )}
    </Container>
  );
};

export default WordScrambleGame;
