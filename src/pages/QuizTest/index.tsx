import { Button } from "antd";
import Container from "../../components/base/Container";
import Quiz from "../../components/base/Quizlet";

const quizData = [
  {
    question: "Biểu hiện mới của xuất khẩu tư bản là:",
    options: [
      "Đông tiền ở yên và không di chuyển",
      "Đông tiền chạy qua các nước đang phát triển",
      "Đông tiền chảy qua các nước phát triển",
      "Đông tiền không còn tồn tại",
    ],
    correctAnswer: "1", // Chỉ số của đáp án đúng trong mảng options (bắt đầu từ 0)
  },
  {
    question: "Xuất khẩu tư bản thường diễn ra dưới hình thức nào sau đây?",
    options: [
      "Đầu tư trực tiếp nước ngoài (FDI)",
      "Trao đổi văn hóa giữa các quốc gia",
      "Hỗ trợ nhân đạo quốc tế",
      "Du lịch quốc tế",
    ],
    correctAnswer: "0",
  },
  {
    question: "Mục đích chính của xuất khẩu tư bản là gì?",
    options: [
      "Tăng cường quan hệ ngoại giao",
      "Tối đa hóa lợi nhuận",
      "Phát triển giáo dục quốc tế",
      "Hỗ trợ các nước nghèo",
    ],
    correctAnswer: "1",
  },
  {
    question: "Xuất khẩu tư bản có thể dẫn đến hệ quả nào sau đây?",
    options: [
      "Tăng trưởng kinh tế ở nước nhận đầu tư",
      "Suy giảm kinh tế ở nước xuất khẩu",
      "Giảm sự phụ thuộc kinh tế giữa các quốc gia",
      "Tăng trưởng văn hóa ở nước xuất khẩu",
    ],
    correctAnswer: "0",
  },
  {
    question: "Hình thức nào sau đây không phải là xuất khẩu tư bản?",
    options: [
      "Cho vay quốc tế",
      "Đầu tư xây dựng nhà máy ở nước ngoài",
      "Xuất khẩu hàng hóa tiêu dùng",
      "Mua cổ phần ở công ty nước ngoài",
    ],
    correctAnswer: "2",
  },
  {
    question: "Xuất khẩu tư bản thường được thực hiện bởi ai?",
    options: [
      "Các tổ chức phi chính phủ",
      "Các công ty đa quốc gia",
      "Các cá nhân du lịch",
      "Các trường học quốc tế",
    ],
    correctAnswer: "1",
  },
  {
    question:
      "Xuất khẩu tư bản có thể ảnh hưởng đến nước nhận đầu tư như thế nào?",
    options: [
      "Tạo thêm việc làm",
      "Giảm nguồn tài nguyên thiên nhiên",
      "Tăng sự phụ thuộc vào nước ngoài",
      "Tất cả các đáp án trên",
    ],
    correctAnswer: "3",
  },
  {
    question: "Yếu tố nào thúc đẩy xuất khẩu tư bản?",
    options: [
      "Tỷ lệ lợi nhuận cao ở nước ngoài",
      "Chi phí lao động cao ở nước ngoài",
      "Chính sách hạn chế đầu tư trong nước",
      "Sự suy giảm của thị trường nội địa",
    ],
    correctAnswer: "0",
  },
  {
    question: "Xuất khẩu tư bản có thể dẫn đến hiện tượng nào sau đây?",
    options: [
      "Toàn cầu hóa kinh tế",
      "Cô lập kinh tế",
      "Giảm trao đổi thương mại",
      "Tăng trưởng kinh tế độc lập",
    ],
    correctAnswer: "0",
  },
  {
    question: "Hình thức xuất khẩu tư bản nào phổ biến nhất hiện nay?",
    options: [
      "Cho vay quốc tế",
      "Đầu tư gián tiếp qua chứng khoán",
      "Đầu tư trực tiếp (FDI)",
      "Hỗ trợ kỹ thuật",
    ],
    correctAnswer: "2",
  },
];

const QuizTest: React.FC = () => {
  return (
    <Container>
      <div
        style={{
          margin: "32px 0",
          width: "100%",
          maxWidth: 800,
          marginInline: "auto",
          position: "relative",
          textAlign: "center",
        }}
      >
        {quizData.map((quiz, index) => (
          <Quiz
            key={index}
            question={quiz.question}
            optionB={quiz.correctAnswer}
            options={quiz.options}
            numberQuestion={index + 1}
            totalQuestion={quizData.length}
          />
        ))}
      </div>
      <Button
        style={{
          margin: "0 auto",
          marginBottom: 32,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          background: "var(--primary-color)",
          color: "white",
        }}
      >
        Gửi bài kiếm tra
      </Button>
    </Container>
  );
};

export default QuizTest;
