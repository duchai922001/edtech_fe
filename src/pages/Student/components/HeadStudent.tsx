import { FormOutlined } from "@ant-design/icons";
import Background from "../../../components/base/Background";
import Container from "../../../components/base/Container";
import { Col, Row, Typography } from "antd";
import CardItem from "../../../components/base/CardItem";
import { FaGamepad } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { SiQuizlet } from "react-icons/si";
import { useNavigate } from "react-router-dom";
const HeadStudent = () => {
  const styleIcon = {
    fontSize: 35,
    color: "var(--primary-color)",
  };
  const navigate = useNavigate();
  const data = [
    {
      icon: <FormOutlined style={styleIcon} />,
      label: "Mock Test",
      url: "/mocktest",
    },
    // {
    //   icon: <CopyOutlined style={styleIcon} />,
    //   label: "Speaking Practice",
    //   url: "/speaking-practice",
    // },
    {
      icon: <SiQuizlet style={styleIcon} />,
      label: "Flashcard",
      url: "/flashcard",
    },
    {
      icon: <FaGamepad style={styleIcon} />,
      label: "Language Games",
      url: "/games",
    },
    {
      icon: <GrResources style={styleIcon} />,
      label: "Resources",
      url: "/classes",
    },
  ];
  return (
    <Background>
      <Container>
        <Row
          style={{ padding: "48px 0", width: "100%" }}
          className="flex-column"
        >
          <Col span={24} className="flex-column">
            <Typography className="body-md-white">WELCOME TO</Typography>
            <Typography className="title-xl-white">
              FPTU Language Platform
            </Typography>
          </Col>
          <Col span={24}>
            <Typography className="body-des-white">
              for FPT Lecturers to share resources & help students further their
              language studies.
            </Typography>
          </Col>
          <Col span={24}>
            <button
              style={{
                border: "none",
                outline: "none",
                padding: "12px 12px",
                width: "438px",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: "300px",
                marginTop: 48,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              STARTED NOW
            </button>
          </Col>
          <Col span={24} style={{ width: "100%", marginTop: 48 }}>
            <Row gutter={[24, 0]} justify={"center"}>
              {data.map((item) => (
                <Col span={4} onClick={() => navigate(item.url)}>
                  <CardItem icon={item.icon} label={item.label} type="column" />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Background>
  );
};

export default HeadStudent;
