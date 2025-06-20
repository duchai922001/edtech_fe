import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetFlashCardsById } from "../../hooks/useFlashCard";
import Loading from "../../components/base/Loading";
import "./style.css";

interface FlashcardData {
  id: string;
  front: string;
  back: string;
}

// const flashcards: FlashcardData[] = [
//   { id: "1", front: "こんにちは", back: "Xin chào" },
//   { id: "2", front: "ありがとう", back: "Cảm ơn" },
//   { id: "3", front: "すみません", back: "Xin lỗi / Excuse me" },
//   { id: "4", front: "はじめまして", back: "Rất vui được gặp bạn" },
//   { id: "5", front: "おはよう", back: "Chào buổi sáng" },
//   { id: "6", front: "こんばんは", back: "Chào buổi tối" },
//   { id: "7", front: "さようなら", back: "Tạm biệt" },
//   { id: "8", front: "はい", back: "Vâng / Có" },
//   { id: "9", front: "いいえ", back: "Không" },
//   { id: "10", front: "わかりません", back: "Tôi không hiểu" },
//   { id: "11", front: "がくせい", back: "Học sinh" },
//   { id: "12", front: "せんせい", back: "Giáo viên" },
//   { id: "13", front: "ともだち", back: "Bạn bè" },
//   { id: "14", front: "かぞく", back: "Gia đình" },
//   { id: "15", front: "しごと", back: "Công việc" },
//   { id: "16", front: "がっこう", back: "Trường học" },
// ];

interface FlashcardComponentProps {
  flashcard: FlashcardData;
  isFlipped: boolean;
  onFlip: () => void;
  size?: "large" | "small";
}

function FlashcardComponent({
  flashcard,
  isFlipped,
  onFlip,
  size = "large",
}: FlashcardComponentProps) {
  return (
    <div
      className={`flashcard-container ${
        size === "large" ? "flashcard-large" : "flashcard-small"
      }`}
      onClick={onFlip}
    >
      <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
        <div className="flashcard-front">
          <div className="flashcard-content">{flashcard.front}</div>
        </div>
        <div className="flashcard-back">
          <div className="flashcard-content">{flashcard.back}</div>
        </div>
      </div>
    </div>
  );
}

export default function FlashCardDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetFlashCardsById(id || "");

  const flashcards =
    data?.flashcards.map((card: any) => ({
      id: card._id,
      front: card.questionFace,
      back: card.answerFace,
    })) || [];
  console.log(data);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  if (isLoading) return <Loading />;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setFlippedCards({});
  };

  const handleSmallCardFlip = (cardId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="flashcard-page">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flashcard-back-button"
      >
        <ArrowLeft className="flashcard-back-icon" />
        Back
      </button>

      {/* Header */}
      <div className="flashcard-header">
        <h1 className="flashcard-title">{data.title}</h1>
        <p className="flashcard-subtitle">
          Learn {data.languageId.name} vocabulary with interactive flashcards
        </p>
      </div>

      {/* Main Flashcard Section */}
      <div className="flashcard-main-section">
        <div className="flashcard-counter">
          {currentIndex + 1} / {flashcards.length}
        </div>

        <FlashcardComponent
          flashcard={flashcards[currentIndex]}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          size="large"
        />

        <div className="flashcard-hint">Click the card to flip it</div>

        <div className="flashcard-navigation">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flashcard-nav-button"
          >
            <ChevronLeft className="flashcard-nav-icon" />
            Previous
          </button>

          <button onClick={handleReset} className="flashcard-reset-button">
            <RotateCcw className="flashcard-nav-icon" />
            Reset
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="flashcard-nav-button"
          >
            Next
            <ChevronRight className="flashcard-nav-icon" />
          </button>
        </div>
      </div>

      {/* All Cards Grid Section */}
      <div className="flashcard-grid-section">
        <h2 className="flashcard-grid-title">All Flashcards</h2>
        <div className="flashcard-grid">
          {flashcards.map((flashcard: any) => (
            <FlashcardComponent
              key={flashcard.id}
              flashcard={flashcard}
              isFlipped={flippedCards[flashcard.id] || false}
              onFlip={() => handleSmallCardFlip(flashcard.id)}
              size="small"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
