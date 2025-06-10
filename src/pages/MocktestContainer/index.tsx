import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useGetLanguages } from "../../hooks/useLanguage";
import Loading from "../../components/base/Loading";

const MocktestContainer = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetLanguages();

  const handleNavigate = (code: string, id: string) => {
    navigate(`/mocktest/${code}/${id}`);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mocktest-wrapper">
      <div className="mocktest-container">
        <h2 className="title">📝 Chọn ngôn ngữ bài thi</h2>
        <div className="language-options">
          {data?.map((lang: any) => (
            <div
              key={lang.code}
              className="language-card"
              onClick={() => handleNavigate(lang?.name?.toLowerCase(), lang.id)}
            >
              <div className="lang-name">{lang.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MocktestContainer;
