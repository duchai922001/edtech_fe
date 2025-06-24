import React from "react";
import Loading from "../../components/base/Loading";
import Leaderboard from "./component/leaderboard/race-leaderboard";
import "./style.css";
import "./component/leaderboard/style.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGetMocktestsChineseDetail } from "../../hooks/useMocktestChinese";
import { Menu } from "../../common/configMenu";
import { Clock, BookOpen, Globe, RotateCcw } from "lucide-react";

// interface MockTest {
//   _id: string;
//   userId: string;
//   title: string;
//   languageId: Language;
//   backgroundImage: string;
//   questions: Question[];
//   type: string;
//   createdAt: string;
//   updatedAt: string;
// }

const EventQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: mockTest,
    isLoading,
    isError,
  } = useGetMocktestsChineseDetail(id || "");

  // console.log(mockTest);

  const handleStartTest = () => {
    navigate(`${Menu.URL_EVENT}/start/${id}`);
  };

  if (isLoading) return <Loading />;
  if (isError || !mockTest) return <p>Lỗi khi tải bài kiểm tra.</p>;

  return (
    <div className="mock-test-detail-container">
      <div className="mock-test-info">
        <button
          onClick={() => window.history.back()}
          className="btn-back-quiztest"
        >
          ← Back
        </button>
        <h1 style={{ marginTop: "30px" }}>{mockTest.title}</h1>
        <p>
          <strong>Language:</strong> {"Chinese"}
        </p>
        <p>
          <strong>Type:</strong> {mockTest.type} + READING
        </p>
        <br />
        <div className="test-details">
          <div className="detail-row">
            <div className="detail-item">
              <Globe className="detail-icon" />
              <span className="detail-label">Language:</span>
              <span className="detail-value">Chinese</span>
            </div>
            <div className="detail-item">
              <BookOpen className="detail-icon" />
              <span className="detail-label">Grade:</span>
              <span className="detail-value">All level</span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-item">
              <Clock className="detail-icon" />
              <span className="detail-label">Duration:</span>
              <span className="detail-value">60 mins</span>
            </div>
            <div className="detail-item">
              <RotateCcw className="detail-icon" />
              <span className="detail-label">Attempts:</span>
              <span className="detail-value">1 time</span>
            </div>
          </div>
        </div>
        <button className="btn-start" onClick={handleStartTest}>
          Start
        </button>
      </div>
      <Leaderboard refId={id} />
    </div>
  );
};

export default EventQuiz;
