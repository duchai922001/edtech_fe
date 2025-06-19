import React, { useState } from "react";
import { useCreateFlashCards } from "../../hooks/useFlashCard"; // chỉnh đường dẫn nếu khác

import "./style.css";

interface Flashcard {
  question: string;
  answer: string;
  imageUrl?: string;
}

const languages = ["English", "Japanese", "Chinese"];

const CreateFlashcardPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState(languages[0]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { question: "", answer: "" },
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const { mutate: createFlashCards } = useCreateFlashCards();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Please enter a title.";
    flashcards.forEach((fc, idx) => {
      if (!fc.question.trim())
        newErrors[`question-${idx}`] = "Please enter a term.";
      if (!fc.answer.trim())
        newErrors[`answer-${idx}`] = "Please enter a definition.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFlashcardChange = (
    index: number,
    field: "question" | "answer" | "imageUrl",
    value: string
  ) => {
    const newFlashcards = [...flashcards];
    newFlashcards[index] = { ...newFlashcards[index], [field]: value };
    setFlashcards(newFlashcards);
    setErrors((prev) => {
      const newErr = { ...prev };
      delete newErr[`${field}-${index}`];
      return newErr;
    });
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { question: "", answer: "" }]);
  };

  const removeFlashcard = (index: number) => {
    if (flashcards.length === 1) return;
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const userId = localStorage.getItem("userId");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const languageMap: { [key: string]: string } = {
      English: "68522b36943cefeda18742ef",
      Japanese: "68522b46943cefeda18742f1",
      Chinese: "68522b53943cefeda18742f3",
    };

    const payload = {
      userId: userId,
      title,
      languageId: languageMap[language],
      backgroundImage: "https://example.com/default-bg.jpg",
      flashcards: flashcards.map((fc) => ({
        questionFace: fc.question,
        answerFace: fc.answer,
        imageUrl: fc.imageUrl || "",
        voiceUrl: "",
      })),
    };

    createFlashCards(payload, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  };

  if (submitted) {
    return (
      <div className="create-flashcard-page">
        <h1>Flashcard Set Created</h1>
        <p>
          You have successfully created a flashcard set titled:{" "}
          <strong>{title}</strong>
        </p>
        <p>Language: {language}</p>
        <h2>Flashcards</h2>
        <ul className="flashcard-summary-list">
          {flashcards.map((fc, i) => (
            <li key={i}>
              <strong>{fc.question}</strong> – {fc.answer}
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            setSubmitted(false);
            setTitle("");
            setFlashcards([{ question: "", answer: "" }]);
            setLanguage(languages[0]);
            setErrors({});
          }}
          className="btn-primary"
        >
          Create a New Flashcard Set
        </button>
      </div>
    );
  }

  return (
    <div className="create-flashcard-page">
      <button onClick={() => window.history.back()} className="btn-back">
        ← Back
      </button>
      <h1>Create a New Flashcard Set</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Set Title</label>
          <input
            id="title"
            type="text"
            value={title}
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? "input-error" : ""}
            placeholder="Enter the flashcard set title"
            required
          />
          {errors.title && (
            <div role="alert" className="error-msg">
              {errors.title}
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option value={lang} key={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset>
          <legend>Flashcards</legend>
          {flashcards.map((card, idx) => (
            <div key={idx} className="flashcard-item">
              <div className="form-group flex-grow">
                <label htmlFor={`question-${idx}`}>Term</label>
                <input
                  id={`question-${idx}`}
                  type="text"
                  value={card.question}
                  onChange={(e) =>
                    handleFlashcardChange(idx, "question", e.target.value)
                  }
                  className={errors[`question-${idx}`] ? "input-error" : ""}
                  placeholder="Enter a term"
                  required
                />
                {errors[`question-${idx}`] && (
                  <div role="alert" className="error-msg">
                    {errors[`question-${idx}`]}
                  </div>
                )}
              </div>
              <div className="form-group flex-grow">
                <label htmlFor={`answer-${idx}`}>Definition</label>
                <input
                  id={`answer-${idx}`}
                  type="text"
                  value={card.answer}
                  onChange={(e) =>
                    handleFlashcardChange(idx, "answer", e.target.value)
                  }
                  className={errors[`answer-${idx}`] ? "input-error" : ""}
                  placeholder="Enter a definition"
                  required
                />
                {errors[`answer-${idx}`] && (
                  <div role="alert" className="error-msg">
                    {errors[`answer-${idx}`]}
                  </div>
                )}
              </div>
              <div className="form-group flex-grow">
                <label htmlFor={`imageUrl-${idx}`}>Image URL (optional)</label>
                <input
                  id={`imageUrl-${idx}`}
                  type="url"
                  value={card.imageUrl || ""}
                  onChange={(e) =>
                    handleFlashcardChange(idx, "imageUrl", e.target.value)
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <button
                type="button"
                aria-label="Remove flashcard"
                onClick={() => removeFlashcard(idx)}
                className="btn-remove"
                disabled={flashcards.length === 1}
              >
                &times;
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addFlashcard}
            className="btn-secondary"
          >
            + Add Flashcard
          </button>
        </fieldset>

        <button type="submit" className="btn-primary">
          Create Flashcard Set
        </button>
      </form>
    </div>
  );
};

export default CreateFlashcardPage;
