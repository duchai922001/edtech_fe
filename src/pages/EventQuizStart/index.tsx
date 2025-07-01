"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Clock,
  CheckCircle,
  Circle,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
} from "lucide-react";
import "./style.css";
import "./modal-style.css";
import "./sentence-styles.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGetMocktestsChineseDetail } from "../../hooks/useMocktestChinese";
import { Menu } from "../../common/configMenu";
import Loading from "../../components/base/Loading";
import { ConfirmationModal } from "./components/ConfirmationModal";

interface Answer {
  _id: string;
  content: string;
  imageUrl?: string;
  isAnswer?: boolean;
}

type ModalType = "navigation" | "submit" | null;

export default function EventQuizStart() {
  // KHAI BÁO TẤT CẢ HOOKS TRƯỚC - KHÔNG CÓ EARLY RETURN
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    data: mockQuizData,
    isLoading,
    isError,
  } = useGetMocktestsChineseDetail(id || "");

  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const breakPoint = useMemo(() => {
    if (mockQuizData?.title === "Đề HSK 2 số 4") {
      return 35;
    } else if (mockQuizData?.title === "Example test") {
      return 39;
    } else if (mockQuizData?.title === "Đề HSK 1") {
      return 20;
    }
    return 0;
  }, [mockQuizData?.tittle]);

  const [questionNumberMap, setQuestionNumberMap] = useState<
    Record<string, number>
  >({});
  const [answers, setAnswers] = useState<
    Record<string, string | Record<string, string>>
  >({});
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Calculate total questions including MULTIPLE sub-questions
  const totalQuestions = useMemo(() => {
    if (!mockQuizData?.questions) return 0;
    return mockQuizData.questions.reduce((total: any, question: any) => {
      if (question.formQuestion === "MULTIPLE") {
        return total + question.answers.length;
      }
      return total + 1;
    }, 0);
  }, [mockQuizData]);

  // Shuffle images for MULTIPLE questions
  const shuffledQuestions = useMemo(() => {
    if (!mockQuizData?.questions) return [];
    return mockQuizData.questions.map((question: any) => {
      if (question.formQuestion === "MULTIPLE") {
        const shuffledAnswers = [...question.answers].sort(
          () => Math.random() - 0.5
        );
        return { ...question, shuffledAnswers };
      }
      return question;
    });
  }, [mockQuizData]);

  const sidebarQuestions = useMemo(() => {
    if (!shuffledQuestions || shuffledQuestions.length === 0) return [];
    const list: {
      index: number;
      label: string;
      questionId: string;
      scrollIndex: number;
    }[] = [];
    let logicIndex = 1;
    const tempMap: Record<string, number> = {};

    shuffledQuestions.forEach((question: any, idx: number) => {
      if (question.formQuestion === "MULTIPLE") {
        tempMap[question._id] = logicIndex;
        for (let i = 0; i < question.answers.length; i++) {
          const subQ = logicIndex + i;
          list.push({
            index: subQ,
            label: `Q${subQ}`,
            questionId: `${question._id}-${subQ}`,
            scrollIndex: idx,
          });
        }
        logicIndex += question.answers.length;
      } else {
        tempMap[question._id] = logicIndex;
        list.push({
          index: logicIndex,
          label: `Q${logicIndex}`,
          questionId: question._id,
          scrollIndex: idx,
        });
        logicIndex++;
      }
    });

    setQuestionNumberMap(tempMap);
    return list;
  }, [shuffledQuestions]);

  // Timer effect
  useEffect(() => {
    if (!isSubmitted) {
      const timer = setTimeout(() => setElapsedTime(elapsedTime + 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [elapsedTime, isSubmitted]);

  // Navigation warning effect
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasPlayedAudio && !isSubmitted) {
        e.preventDefault();
        e.returnValue =
          "Nếu bạn thực hiện thao tác này, bài của bạn sẽ tự động submit. Bạn có đồng ý không?";
        return e.returnValue;
      }
    };

    const handlePopState = () => {
      if (hasPlayedAudio && !isSubmitted) {
        setActiveModal("navigation");
      }
    };

    if (hasPlayedAudio && !isSubmitted) {
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("popstate", handlePopState);
      window.history.pushState(null, "", window.location.href);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasPlayedAudio, isSubmitted]);

  // CONDITIONAL RENDERING SAU KHI ĐÃ KHAI BÁO TẤT CẢ HOOKS
  if (isLoading) return <Loading />;
  if (isError || !mockQuizData) return <p>Lỗi khi tải bài kiểm tra.</p>;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSingleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleMultipleAnswer = (
    questionId: string,
    questionNumber: string,
    value: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...((prev[questionId] as Record<string, string>) || {}),
        [questionNumber]: value.toUpperCase(),
      },
    }));
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    // Calculate correct answers
    let correct = 0;
    shuffledQuestions.forEach((question: any) => {
      const userAnswer = answers[question._id];

      if (question.formQuestion === "MULTIPLE") {
        const correctMapping = question.answers.map((a: any) => a.content);
        const userAnswerObj = (userAnswer as Record<string, string>) || {};

        for (let i = 0; i < correctMapping.length; i++) {
          const qNum = (questionNumberMap[question._id] + i).toString();
          if (userAnswerObj[qNum] === correctMapping[i]) {
            correct++;
          }
        }
      } else {
        const correctAnswer = question.answers.find((a: any) => a.isAnswer);
        if (correctAnswer && userAnswer === correctAnswer._id) {
          correct++;
        }
      }
    });

    setCorrectAnswers(correct);
    setCompletionTime(timeTaken);
    setIsSubmitted(true);
    setActiveModal(null);
  };

  const handleNavigationConfirm = () => {
    setActiveModal(null);
    handleSubmit();
  };

  const handleSubmitConfirm = () => {
    setActiveModal(null);
    handleSubmit();
  };

  const handleBackClick = () => {
    if (hasPlayedAudio && !isSubmitted) {
      setActiveModal("navigation");
    } else {
      window.history.back();
    }
  };

  const handleSubmitClick = () => {
    setActiveModal("submit");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "answered":
        return <CheckCircle className="quiz-icon quiz-icon-green" />;
      default:
        return <Circle className="quiz-icon quiz-icon-gray" />;
    }
  };

  const toggleAudio = () => {
    if (audioRef.current && !hasPlayedAudio) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setHasPlayedAudio(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToQuestion = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getAnsweredQuestionsCount = () => {
    let count = 0;
    shuffledQuestions.forEach((question: any, index: any) => {
      const userAnswer = answers[question._id];

      if (question.formQuestion === "MULTIPLE") {
        const userAnswerObj = (userAnswer as Record<string, string>) || {};

        if (index === 10) {
          for (const questionNum of ["11", "12", "13", "14", "15"]) {
            if (userAnswerObj[questionNum]) {
              count++;
            }
          }
        }
      } else {
        if (userAnswer) {
          count++;
        }
      }
    });
    return count;
  };

  const getQuestionStatus = (questionKey: string) => {
    const [mainId, subNum] = questionKey.split("-");
    const answer = answers[mainId];

    if (subNum) {
      return answer && (answer as Record<string, string>)[subNum]
        ? "answered"
        : "unanswered";
    }

    return answer ? "answered" : "unanswered";
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
                    {getAnsweredQuestionsCount()}/{totalQuestions}
                  </span>
                </div>
                <div className="quiz-completion-stat">
                  <span className="quiz-completion-stat-label">
                    Correct answers:{" "}
                  </span>
                  <span className="quiz-completion-stat-value">
                    {correctAnswers}/{totalQuestions}
                  </span>
                </div>
                <div className="quiz-completion-stat">
                  <span className="quiz-completion-stat-label">Score: </span>
                  <span className="quiz-completion-stat-value">
                    {Math.round((correctAnswers / totalQuestions) * 100)}%
                  </span>
                </div>
                <button
                  onClick={() => navigate(`${Menu.URL_EVENT}/detail/${id}`)}
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
    <div className="chinese-quiz-container">
      <button onClick={handleBackClick} className="quiz-back-button">
        <ArrowLeft className="quiz-back-icon" />
        Back
      </button>

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

            {mockQuizData.listenUrl && (
              <div className="quiz-audio-player">
                <button
                  onClick={toggleAudio}
                  className={`quiz-audio-button ${
                    hasPlayedAudio ? "disabled" : ""
                  }`}
                  disabled={hasPlayedAudio}
                >
                  {isPlaying ? (
                    <Pause className="quiz-icon" />
                  ) : (
                    <Play className="quiz-icon" />
                  )}
                  <Volume2 className="quiz-icon" />
                </button>
                <audio
                  ref={audioRef}
                  src={mockQuizData.listenUrl}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            )}

            <div className="quiz-question-grid">
              {sidebarQuestions.map((item) => {
                const status = getQuestionStatus(item.questionId);
                return (
                  <button
                    key={item.questionId}
                    onClick={() => scrollToQuestion(item.scrollIndex)}
                    className={`quiz-question-button ${status}`}
                  >
                    {getStatusIcon(status)}
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="quiz-legend">
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

      <div className="chinese-quiz-main-content">
        <div className="quiz-header">
          <h1 className="quiz-title">{mockQuizData.title}</h1>
          <div className="quiz-progress-text">
            {mockQuizData.type} - {totalQuestions} Questions
          </div>
        </div>

        <div className="quiz-questions-container">
          {shuffledQuestions.map((question: any, index: any) => {
            const currentQuestionNumber = questionNumberMap[question._id];
            const showListeningHeader = index === 0;
            const showReadingHeader =
              breakPoint > 0 && currentQuestionNumber === breakPoint + 1;

            return (
              <div key={question._id}>
                {showListeningHeader && (
                  <div className="quiz-section-header-alt">
                    <h2 className="quiz-section-title-alt">LISTENING</h2>
                  </div>
                )}
                {showReadingHeader && (
                  <div className="quiz-section-header-alt">
                    <h2 className="quiz-section-title-alt">READING</h2>
                  </div>
                )}
                <div
                  id={`question-${index}`}
                  className="quiz-question-card-chinese"
                >
                  <div className="quiz-question-header">
                    <h3 className="quiz-question-number">
                      {question.formQuestion === "MULTIPLE" ? (
                        <label className="quiz-multiple-input-label">
                          Q{questionNumberMap[question._id]}_
                          {questionNumberMap[question._id] +
                            question.answers.length -
                            1}
                        </label>
                      ) : (
                        <label className="quiz-multiple-input-label">
                          Q{questionNumberMap[question._id]}
                        </label>
                      )}
                    </h3>
                    <p className="quiz-question-title">{question.question}</p>
                  </div>

                  <div className="quiz-question-content">
                    {question.formQuestion !== "TF" && question.imageUrl && (
                      <div className="quiz-question-image">
                        <img
                          src={question.imageUrl || "/placeholder.svg"}
                          alt={`Question ${index + 1}`}
                        />
                      </div>
                    )}

                    <div className="quiz-answers">
                      {question.formQuestion === "TF" ? (
                        <div className="quiz-tf-layout">
                          {question.imageUrl && (
                            <div className="quiz-tf-image">
                              <img
                                src={question.imageUrl || "/placeholder.svg"}
                                alt={`Question ${index + 1}`}
                              />
                            </div>
                          )}
                          <div className="quiz-tf-answers">
                            {question.answers.map((answer: any) => (
                              <div
                                key={answer._id}
                                className="quiz-tf-answer-option"
                              >
                                <input
                                  type="radio"
                                  id={answer._id}
                                  name={`question-${question._id}`}
                                  checked={answers[question._id] === answer._id}
                                  onChange={() =>
                                    handleSingleAnswer(question._id, answer._id)
                                  }
                                  className="quiz-radio-input"
                                />
                                <label
                                  htmlFor={answer._id}
                                  className="quiz-tf-answer-label"
                                >
                                  {answer.content}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : question.formQuestion === "ONLY" ? (
                        <div className="quiz-only-answers">
                          {question.answers.map((answer: any) => (
                            <div
                              key={answer._id}
                              className="quiz-only-answer-option"
                            >
                              <input
                                type="radio"
                                id={answer._id}
                                name={`question-${question._id}`}
                                checked={answers[question._id] === answer._id}
                                onChange={() =>
                                  handleSingleAnswer(question._id, answer._id)
                                }
                                className="quiz-radio-input"
                              />
                              <label
                                htmlFor={answer._id}
                                className="quiz-only-answer-label"
                              >
                                {answer.imageUrl ? (
                                  <div className="quiz-only-answer-image">
                                    <span className="quiz-answer-text">
                                      {answer.content}
                                    </span>
                                    <img
                                      src={
                                        answer.imageUrl || "/placeholder.svg"
                                      }
                                      alt={answer.content}
                                    />
                                  </div>
                                ) : (
                                  <span className="quiz-answer-text">
                                    {answer.content}
                                  </span>
                                )}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="quiz-multiple-layout">
                          {question.answers[0].imageUrl?.startsWith("https") ? (
                            <div className="quiz-multiple-images">
                              {(question as any).shuffledAnswers?.map(
                                (answer: Answer) => (
                                  <div
                                    key={answer._id}
                                    className="quiz-multiple-image-item"
                                  >
                                    <img
                                      src={
                                        answer.imageUrl || "/placeholder.svg"
                                      }
                                      alt={answer.content}
                                    />
                                    <span className="quiz-multiple-image-label">
                                      {answer.content}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <div className="quiz-multiple-images-not-img">
                              {(question as any).shuffledAnswers?.map(
                                (answer: Answer) => (
                                  <div
                                    key={answer._id}
                                    className="quiz-multiple-image-item-not-img"
                                  >
                                    <p className="quiz-multiple-image-text">
                                      {answer.imageUrl}
                                    </p>
                                    <span className="quiz-multiple-image-label-not-img">
                                      {answer.content}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                          <div className="quiz-multiple-inputs">
                            <div className="quiz-multiple-inputs-title">
                              Enter your answers:
                            </div>
                            {/* {question.answers.map((_: any, i: any) => {
                              const num = questionNumberMap[question._id] + i;
                              return (
                                <div
                                  key={num}
                                  className="quiz-multiple-input-row"
                                >
                                  <label className="quiz-multiple-input-label">
                                    {num}
                                  </label>
                                  <p className="quiz-multiple-input-label">
                                    {_.desL}
                                  </p>
                                  <input
                                    type="text"
                                    maxLength={1}
                                    value={
                                      ((answers[question._id] as Record<
                                        string,
                                        string
                                      >) || {})[num.toString()] || ""
                                    }
                                    onChange={(e) =>
                                      handleMultipleAnswer(
                                        question._id,
                                        num.toString(),
                                        e.target.value
                                      )
                                    }
                                    className="quiz-multiple-input"
                                    placeholder="A-F"
                                  />
                                  {_.desR ?? (
                                    <p className="quiz-multiple-input-label">
                                      {_.desL}
                                    </p>
                                  )}
                                </div>
                              );
                            })} */}
                            {question.answers.map((_: any, i: any) => {
                              const num = questionNumberMap[question._id] + i;

                              // Create the complete sentence by combining desL and desR
                              const createSentence = () => {
                                const leftPart = _.desL || "";
                                const rightPart = _.desR || "";

                                // Combine both parts and replace | with line breaks
                                const fullText =
                                  `${leftPart} __INPUT__ ${rightPart}`.trim();

                                // Split by __INPUT__ to place the input field
                                const parts = fullText.split("__INPUT__");

                                return (
                                  <div className="quiz-simple-content">
                                    {parts[0] && (
                                      <span>
                                        {parts[0]
                                          .split("|")
                                          .map((line, idx, arr) => (
                                            <span key={idx}>
                                              {line.trim()}
                                              {idx < arr.length - 1 && <br />}
                                            </span>
                                          ))}
                                      </span>
                                    )}

                                    <input
                                      type="text"
                                      maxLength={1}
                                      value={
                                        ((answers[question._id] as Record<
                                          string,
                                          string
                                        >) || {})[num.toString()] || ""
                                      }
                                      onChange={(e) =>
                                        handleMultipleAnswer(
                                          question._id,
                                          num.toString(),
                                          e.target.value
                                        )
                                      }
                                      className="quiz-simple-input"
                                      placeholder="A-F"
                                    />

                                    {parts[1] && (
                                      <span>
                                        {parts[1]
                                          .split("|")
                                          .map((line, idx, arr) => (
                                            <span key={idx}>
                                              {line.trim()}
                                              {idx < arr.length - 1 && <br />}
                                            </span>
                                          ))}
                                      </span>
                                    )}
                                  </div>
                                );
                              };

                              return (
                                <div key={num} className="quiz-simple-row">
                                  <span className="quiz-simple-number">
                                    {num}.
                                  </span>
                                  {createSentence()}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="quiz-submit-section">
          <button onClick={handleSubmitClick} className="quiz-submit-button">
            Submit Quiz
          </button>
        </div>
      </div>

      {/* Custom Modals */}
      <ConfirmationModal
        isOpen={activeModal === "navigation"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleNavigationConfirm}
        title="Xác nhận rời khỏi bài thi"
        message="Nếu bạn thực hiện thao tác này, bài của bạn sẽ tự động submit. Bạn có đồng ý không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        type="warning"
      />

      <ConfirmationModal
        isOpen={activeModal === "submit"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleSubmitConfirm}
        title="Xác nhận nộp bài"
        message="Bạn có chắc chắn muốn nộp bài không? Sau khi nộp bài, bạn sẽ không thể thay đổi câu trả lời."
        confirmText="Nộp bài"
        cancelText="Hủy"
        type="info"
      />
    </div>
  );
}
