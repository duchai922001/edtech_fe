import { Col, Row, Typography } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import CardCourse from "../../components/base/CardCourse";
import Courses from "./courses";
const MockTest = () => {
  const data = [1, 2, 3, 4];
  return (
    <>
      <Background>
        <Container>
          <Row
            style={{
              padding: "48px 0",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              position: "relative",
            }}
          >
            <Col span={24}>
              <Typography className="body-md-white">MOCK TEST</Typography>
            </Col>
            <Col span={24}>
              <Typography className="body-des-white">
                Take our mock tests and discover your current language level.
              </Typography>
            </Col>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                position: "absolute",
                left: "-30%",
                top: "90%",
              }}
            >
              <div
                style={{
                  marginTop: 52,
                  background: "var(--second-color)",
                  width: 500,
                  height: 100,
                  borderRadius: "0 24px 24px 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 24,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Recommended: Take these entrance tests to understand better your
                current language level.
              </div>
              <div style={{ width: "100%", marginTop: 54, marginLeft: 24 }}>
                <Row gutter={[24, 0]} justify={"center"}>
                  {data.map((item) => (
                    <Col span={6}>
                      <CardCourse />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Row>
        </Container>
      </Background>
      <Container>
        <Courses />
      </Container>
    </>
  );
};

export default MockTest;
