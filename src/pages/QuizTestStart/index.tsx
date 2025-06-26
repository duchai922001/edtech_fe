import { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  Circle,
  PlayCircle,
  ArrowLeft,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetMockTestById } from "../../hooks/useMocktest";
import Loading from "../../components/base/Loading";
import { Menu } from "../../common/configMenu";
import "./style.css";

interface Answer {
  _id: string;
  content: string;
  isAnswer: boolean;
}

interface Question {
  _id: string;
  question: string;
  answers: Answer[];
}

export default function QuizTestStart() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: mockTest, isLoading } = useGetMockTestById(id || "");
  console.log(mockTest);
  const questions: Question[] = mockTest.questions;

  if (isLoading) return <Loading />;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);

  // Timer effect
  useEffect(() => {
    if (!isSubmitted) {
      const timer = setTimeout(() => setElapsedTime(elapsedTime + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [elapsedTime, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerChange = (answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion]._id]: answerId,
    }));
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    // Calculate correct answers
    let correct = 0;
    questions.forEach((question) => {
      const selectedAnswerId = answers[question._id];
      const correctAnswer = question.answers.find((ans) => ans.isAnswer);
      if (
        selectedAnswerId &&
        correctAnswer &&
        selectedAnswerId === correctAnswer._id
      ) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    setScore(Math.round((correct / questions.length) * 100));
    setCompletionTime(timeTaken);
    setIsSubmitted(true);
  };

  const getQuestionStatus = (index: number) => {
    if (index === currentQuestion && !isSubmitted) return "current";
    if (answers[questions[index]._id]) return "answered";
    return "unanswered";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <PlayCircle className="quiz-icon quiz-icon-green" />;
      case "answered":
        return <CheckCircle className="quiz-icon quiz-icon-green" />;
      default:
        return <Circle className="quiz-icon quiz-icon-gray" />;
    }
  };

  if (isSubmitted) {
    return (
      <div className="quiz-completion">
        <div className="quiz-completion-container">
          <div className="quiz-completion-card">
            <div className="quiz-completion-header">
              <h1 className="quiz-completion-title">Quiz Completed!</h1>
            </div>
            <div className="quiz-completion-content">
              <div className="quiz-completion-stats">
                <div className="quiz-completion-stat">
                  <span className="quiz-completion-stat-label">
                    Time taken:{" "}
                  </span>
                  <span className="quiz-completion-stat-value">
                    {completionTime ? formatTime(completionTime) : "N/A"}
                  </span>
                </div>
                <div className="quiz-completion-stat">
                  <span className="quiz-completion-stat-label">
                    Questions answered:{" "}
                  </span>
                  <span className="quiz-completion-stat-value">
                    {Object.keys(answers).length}/{questions.length}
                  </span>
                </div>
                <div className="quiz-completion-stat">
                  <span className="quiz-completion-stat-label">
                    Correct answers:{" "}
                  </span>
                  <span className="quiz-completion-stat-value">
                    {correctAnswers}/{questions.length}
                  </span>
                </div>
                <div className="quiz-completion-stat">
                  <span className="quiz-completion-stat-label">
                    Score (%):{" "}
                  </span>
                  <span className="quiz-completion-stat-value">{score}%</span>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      `${Menu.URL_MOCK_TEST_PAGE}/${mockTest.languageId._id}`
                    )
                  }
                  className="quiz-completion-button"
                >
                  Return
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flashcard-back-button"
      >
        <ArrowLeft className="flashcard-back-icon" />
        Back
      </button>
      {/* Fixed Question Status Sidebar */}
      <div className="quiz-sidebar">
        <div className="quiz-sidebar-card">
          <div className="quiz-sidebar-header">
            <h2 className="quiz-sidebar-title">
              <Clock className="quiz-icon-lg" />
              Quiz Status
            </h2>
          </div>
          <div className="quiz-sidebar-content">
            <div className="quiz-timer">
              <div className="quiz-timer-display">
                {formatTime(elapsedTime)}
              </div>
              <div className="quiz-timer-label">Elapsed Time</div>
            </div>
            <div className="quiz-question-grid">
              {questions.map((_, index) => {
                const status = getQuestionStatus(index);
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`quiz-question-button ${status}`}
                  >
                    {getStatusIcon(status)}Q{index + 1}
                  </button>
                );
              })}
            </div>
            <div className="quiz-legend">
              <div className="quiz-legend-item">
                <PlayCircle className="quiz-icon-sm quiz-icon-green" />
                <span>Current</span>
              </div>
              <div className="quiz-legend-item">
                <CheckCircle className="quiz-icon-sm quiz-icon-green" />
                <span>Answered</span>
              </div>
              <div className="quiz-legend-item">
                <Circle className="quiz-icon-sm quiz-icon-gray" />
                <span>Unanswered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="quiz-main-content">
        {/* Header */}
        <div className="quiz-header">
          <h1 className="quiz-title">{mockTest.languageId.name} Quiz</h1>
          <div className="quiz-progress-text">
            Q {currentQuestion + 1} / {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <div className="quiz-question-card">
          <div className="quiz-question-header">
            <h2 className="quiz-question-title">
              {questions[currentQuestion].question}
            </h2>
          </div>
          <div className="quiz-question-content">
            <div className="quiz-radio-group">
              {questions[currentQuestion].answers.map((answer) => (
                <div
                  key={answer._id}
                  className="quiz-answer-option"
                  onClick={() => handleAnswerChange(answer._id)}
                >
                  <input
                    type="radio"
                    id={answer._id}
                    name={`question-${questions[currentQuestion]._id}`}
                    value={answer._id}
                    checked={
                      answers[questions[currentQuestion]._id] === answer._id
                    }
                    onChange={() => handleAnswerChange(answer._id)}
                    className="quiz-radio-input"
                  />
                  <label htmlFor={answer._id} className="quiz-answer-label">
                    {answer.content}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="quiz-navigation">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="quiz-button quiz-button-outline"
          >
            Previous
          </button>

          <div className="quiz-nav-buttons">
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="quiz-button quiz-button-primary"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="quiz-button quiz-button-primary"
              >
                Submit
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
