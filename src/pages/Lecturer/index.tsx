import { Col, Row, Typography } from "antd";
import Container from "../../components/base/Container";
import "./style.css";
import CardItem from "../../components/base/CardItem";
import { BarChartOutlined, CloudUploadOutlined } from "@ant-design/icons";
import Background from "../../components/base/Background";
const Lecture = () => {
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
          <Col span={24} style={{ width: "100%", marginTop: 24 }}>
            <Row gutter={[48, 0]}>
              <Col span={12}>
                <CardItem
                  icon={
                    <BarChartOutlined
                      style={{ fontSize: 35, color: "var(--primary-color)" }}
                    />
                  }
                  label="Students’ Progress"
                  type="row"
                />
              </Col>
              <Col span={12}>
                <CardItem
                  icon={
                    <CloudUploadOutlined
                      style={{ fontSize: 35, color: "var(--primary-color)" }}
                    />
                  }
                  label="Upload Resources"
                  type="row"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Background>
  );
};

export default Lecture;
