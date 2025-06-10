import { useParams } from "react-router-dom";
import { useGetMocktestsChineseDetail } from "../../hooks/useMocktestChinese";
import "./styles.css";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Form4 from "./components/Form4";
import FormRead1 from "./components/FormRead1";
import FormRead4 from "./components/FormRead4";
import Loading from "../../components/base/Loading";
const QuizTestChinese = () => {
  const { title } = useParams();
  const { data, isLoading } = useGetMocktestsChineseDetail(title ?? "");
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <header className="header">
          <div>Bắt đầu vào lúc: Chủ Nhật, 8 tháng 6 2025, 10:18 AM</div>
          <div>Trạng thái: Đang thi</div>
          <div>Phần hiện tại: Bài thi HSK 1</div>
        </header>
        <div>Luyện đề</div>
      </div>
      <div>
        <h3>Phần thi nghe</h3>
        {data?.questionGroups?.questionListen && (
          <div style={{ margin: "10px 0" }}>
            <audio controls style={{ width: "100%" }}>
              <source
                src={data?.questionGroups?.questionListen?.shareListenUrl}
                type="audio/mpeg"
              />
              Trình duyệt không hỗ trợ phần tử audio.
            </audio>
          </div>
        )}
        {data?.questionGroups?.questionListen?.forms?.form1 &&
          data?.questionGroups?.questionListen?.forms?.form1?.questionsAll.map(
            (item: any) => <Form1 item={item} />
          )}
        {data?.questionGroups?.questionListen?.forms?.form2 && (
          <Form2
            questions={
              data?.questionGroups?.questionListen?.forms?.form2?.questionsAll
            }
          />
        )}

        {data?.questionGroups?.questionListen?.forms?.form4 &&
          data?.questionGroups?.questionListen?.forms?.form4?.questionsAll.map(
            (item: any, index: any) => <Form4 item={item} index={index} />
          )}
      </div>
      <div>
        {data?.questionGroups?.questionRead?.forms?.form1 &&
          data?.questionGroups?.questionRead?.forms?.form1?.questionsAll.map(
            (item: any, index: any) => <FormRead1 item={item} index={index} />
          )}

        {data?.questionGroups?.questionRead?.forms?.form4 && (
          <FormRead4
            questions={
              data?.questionGroups?.questionRead?.forms?.form4?.questionsAll
            }
          />
        )}
      </div>
    </div>
  );
};

export default QuizTestChinese;
