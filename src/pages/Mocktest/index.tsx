import { Col, Row, Typography } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import Courses from "./courses";
import { useParams } from "react-router-dom";
import { useGetMocktestLanguage } from "../../hooks/useMocktest";
import Loading from "../../components/base/Loading";
const MockTest = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMocktestLanguage(id ?? "");
  if (isLoading) {
    return <Loading />;
  }
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
          </Row>
        </Container>
      </Background>
      <Container>
        <Courses data={data} />
      </Container>
    </>
  );
};

export default MockTest;
