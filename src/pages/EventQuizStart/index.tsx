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
import { useParams, useNavigate } from "react-router-dom";
import { useGetMocktestsChineseDetail } from "../../hooks/useMocktestChinese";
import { Menu } from "../../common/configMenu";
import Loading from "../../components/base/Loading";

interface Answer {
  _id: string;
  content: string;
  imageUrl?: string;
  isAnswer?: boolean;
}

// interface Question {
//   _id: string;
//   question: string;
//   imageUrl?: string;
//   formQuestion: "TF" | "ONLY" | "MULTIPLE";
//   answers: Answer[];
// }

export default function EventQuizStart() {
  const [questionNumberMap, setQuestionNumberMap] = useState<
    Record<string, number>
  >({});

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: mockQuizData,
    isLoading,
    isError,
  } = useGetMocktestsChineseDetail(id || "");

  if (isLoading) return <Loading />;
  if (isError || !mockQuizData) return <p>Lỗi khi tải bài kiểm tra.</p>;

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
    return mockQuizData.questions.reduce((total: any, question: any) => {
      if (question.formQuestion === "MULTIPLE") {
        return total + question.answers.length;
      }
      return total + 1;
    }, 0);
  }, [mockQuizData]);

  // Shuffle images for MULTIPLE questions
  const shuffledQuestions = useMemo(() => {
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
          const qNum = (questionNumberMap[question._id] + i).toString(); // tính theo số thứ tự thực tế
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
  };

  // const getQuestionStatus = (questionId: string) => {
  //   if (answers[questionId]) return "answered";
  //   return "unanswered";
  // };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "answered":
        return <CheckCircle className="quiz-icon quiz-icon-green" />;
      default:
        return <Circle className="quiz-icon quiz-icon-gray" />;
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
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

  // Calculate answered questions count
  const getAnsweredQuestionsCount = () => {
    let count = 0;
    shuffledQuestions.forEach((question: any, index: any) => {
      const userAnswer = answers[question._id];

      if (question.formQuestion === "MULTIPLE") {
        const userAnswerObj = (userAnswer as Record<string, string>) || {};

        if (index === 10) {
          // Count answered sub-questions for 5-9
          for (const questionNum of ["11", "12", "13", "14", "15"]) {
            if (userAnswerObj[questionNum]) {
              count++;
            }
          }
        }
        // else if (index === 5) {
        //   // Count answered sub-question for 10
        //   if (userAnswerObj["10"]) {
        //     count++;
        //   }
        // }
      } else {
        if (userAnswer) {
          count++;
        }
      }
    });
    return count;
  };

  // const sidebarQuestions = useMemo(() => {
  //   const list: {
  //     index: number;
  //     label: string;
  //     questionId: string;
  //     scrollIndex: number;
  //   }[] = [];
  //   let logicIndex = 1;

  //   shuffledQuestions.forEach((question: any, idx: number) => {
  //     if (question.formQuestion === "MULTIPLE" && idx === 10) {
  //       // 5 sub-questions (Q11–15)
  //       for (let sub = 11; sub <= 15; sub++) {
  //         list.push({
  //           index: logicIndex,
  //           label: `Q${sub}`,
  //           questionId: `${question._id}-${sub}`,
  //           scrollIndex: idx, // scroll đến câu MULTIPLE
  //         });
  //         logicIndex++;
  //       }
  //     } else {
  //       list.push({
  //         index: logicIndex,
  //         label: `Q${logicIndex}`,
  //         questionId: question._id,
  //         scrollIndex: idx, // scroll trực tiếp
  //       });
  //       logicIndex++;
  //     }
  //   });

  //   return list;
  // }, [shuffledQuestions]);

  const sidebarQuestions = useMemo(() => {
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

    setQuestionNumberMap(tempMap); // cập nhật state toàn cục
    return list;
  }, [shuffledQuestions]);

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
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="quiz-back-button"
      >
        <ArrowLeft className="quiz-back-icon" />
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

            {/* Audio Player */}
            {mockQuizData.listenUrl && (
              <div className="quiz-audio-player">
                <button onClick={toggleAudio} className="quiz-audio-button">
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

            {/* <div className="quiz-question-grid">
              {shuffledQuestions.map((question: any, index: any) => {
                const status = getQuestionStatus(question._id);
                return (
                  <button
                    key={question._id}
                    onClick={() => scrollToQuestion(index)}
                    className={`quiz-question-button ${status}`}
                  >
                    {getStatusIcon(status)}Q{index + 1}
                  </button>
                );
              })}
            </div> */}
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

      {/* Main Content */}
      <div className="chinese-quiz-main-content">
        {/* Header */}
        <div className="quiz-header">
          <h1 className="quiz-title">{mockQuizData.title}</h1>
          <div className="quiz-progress-text">
            {mockQuizData.type} - {totalQuestions} Questions
          </div>
        </div>

        {/* Questions */}
        <div className="quiz-questions-container">
          {shuffledQuestions.map((question: any, index: any) => (
            <div
              key={question._id}
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
                    // True/False layout - image above, answers in one row
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
                    // Single choice layout - 3 answers in one row
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
                                  src={answer.imageUrl || "/placeholder.svg"}
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
                    // Multiple choice - matching layout
                    <div className="quiz-multiple-layout">
                      {/* Images in random order */}
                      <div className="quiz-multiple-images">
                        {(question as any).shuffledAnswers?.map(
                          (answer: Answer) => (
                            <div
                              key={answer._id}
                              className="quiz-multiple-image-item"
                            >
                              {answer.imageUrl?.startsWith("https") ? (
                                <img
                                  src={answer.imageUrl}
                                  alt={answer.content}
                                />
                              ) : (
                                <span className="quiz-multiple-image-text">
                                  {answer.imageUrl || answer.content}
                                </span>
                              )}
                              <span className="quiz-multiple-image-label">
                                {answer.content}
                              </span>
                            </div>
                          )
                        )}
                      </div>

                      {/* Input fields based on question index and answers length */}
                      <div className="quiz-multiple-inputs">
                        <div className="quiz-multiple-inputs-title">
                          Enter your answers:
                        </div>
                        {/* <div className="quiz-multiple-input-row"> */}
                        {question.answers.map((_: any, i: any) => {
                          const num = questionNumberMap[question._id] + i;
                          return (
                            <div key={num} className="quiz-multiple-input-row">
                              <label className="quiz-multiple-input-label">
                                {num}
                              </label>
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
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    // </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="quiz-submit-section">
          <button onClick={handleSubmit} className="quiz-submit-button">
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
