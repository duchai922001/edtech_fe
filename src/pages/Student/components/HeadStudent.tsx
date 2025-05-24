import { CopyOutlined, FormOutlined } from "@ant-design/icons";
import Background from "../../../components/base/Background";
import Container from "../../../components/base/Container";
import { Col, Row, Typography } from "antd";
import CardItem from "../../../components/base/CardItem";
const HeadStudent = () => {
  const styleIcon = {
    fontSize: 35,
    color: "var(--primary-color)",
  };
  const data = [
    {
      icon: <FormOutlined style={styleIcon} />,
      label: "Mock Test",
    },
    {
      icon: <CopyOutlined style={styleIcon} />,
      label: "Speaking Practice",
    },
    {
      icon: <CopyOutlined style={styleIcon} />,
      label: "Flashcard",
    },
    {
      icon: <CopyOutlined style={styleIcon} />,
      label: "Language Games",
    },
    {
      icon: <CopyOutlined style={styleIcon} />,
      label: "Resources",
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
              Enroll Class
            </button>
          </Col>
          <Col span={24} style={{ width: "100%", marginTop: 48 }}>
            <Row gutter={[24, 0]} justify={"center"}>
              {data.map((item) => (
                <Col span={4}>
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
