import { useState } from "react";
import { Card } from "antd";
interface FlashCardProps {
  question: string;
  answer: string;
}

const FlashCard = ({ question, answer }: FlashCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const cardStyle: React.CSSProperties = {
    width: "100%",
    height: 500,
    margin: "20px auto",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: isOpen ? "var(--primary-color)" : "var(--second-color)",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    border: "1px solid #d9d9d9",
    borderRadius: 8,
    color: isOpen ? "white" : "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
  };

  const textStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 500,
    padding: "40px 20px",
  };
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Card style={cardStyle} onClick={handleClick}>
      <div style={textStyle}>
        {isOpen ? `Đáp án: ${answer}` : `Câu hỏi: ${question}`}
      </div>
    </Card>
  );
};

export default FlashCard;
