import { Col, Row, Typography } from "antd";
import Container from "../../../components/base/Container";
import learn1 from "../../../assets/learn1.png";
import learn2 from "../../../assets/learn2.png";
import { useNavigate } from "react-router-dom";

const Learnmore = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row style={{ padding: "48px 0" }} gutter={[48, 0]}>
        <Col span={12}>
          <div style={{ position: "relative", width: "100%", height: "400px" }}>
            <img
              src={learn1}
              alt="Language Learning 1"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "70%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <img
              src={learn2}
              alt="Language Learning 2"
              style={{
                position: "absolute",
                top: "20px",
                right: 0,
                width: "70%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </Col>
        <Col
          span={12}
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <Typography className="title-lg-black">
            LEARN LANGUAGES EFFORTLESSLY THROUGH QUIZZES, GAMES, AND MOCK TESTS
          </Typography>
          <Typography className="body-sm-black">
            Exclusive for FPT University students, boost your language skills
            through interactive challenges, engaging quizzes. With integrated
            game-based learning and mock exams, studying becomes more effective
            and enjoyable.
          </Typography>
          <button
            style={{
              color: "white",
              background: "var(--second-color)",
              outline: "none",
              border: "none",
              padding: 24,
              width: 188,
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/classes");
            }}
          >
            LEARN MORE
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Learnmore;
