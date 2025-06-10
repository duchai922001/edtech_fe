import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Container from "../../components/base/Container";
import { useGetMyFlashcards } from "../../hooks/useFlashCard";

const MyFlashcards = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");
  const userId = localStorage.getItem("userId");
  const { data } = useGetMyFlashcards(userId ?? "");
  const handleCreate = () => {
    navigate("/create-flashcards");
  };

  return (
    <Container>
      <div style={{ margin: "50px 0" }}>
        <Typography.Title level={3}>Flashcard của tôi</Typography.Title>
        {token ? (
          <Button type="primary" onClick={handleCreate}>
            Tạo flashcard
          </Button>
        ) : (
          <Typography.Text type="warning">
            Bạn cần đăng nhập để tạo flashcard
          </Typography.Text>
        )}
      </div>
      <div>{data?.length ? <>Flashcard</> : <>Không có data nào</>}</div>
    </Container>
  );
};

export default MyFlashcards;
