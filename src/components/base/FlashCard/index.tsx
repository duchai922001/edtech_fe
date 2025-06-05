import { useState } from "react";
import "./style.css";
interface FlashCardProps {
  question: string;
  answer: string;
}

const FlashCard = ({ question, answer }: FlashCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="flip-card" onClick={handleClick}>
      <div className={`flip-card-inner ${isOpen ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <div className="flip-content">Câu hỏi: {question}</div>
        </div>
        <div className="flip-card-back">
          <div className="flip-content">Đáp án: {answer}</div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
