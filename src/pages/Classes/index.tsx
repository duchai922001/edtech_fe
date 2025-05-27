import { Col, Row, Select, Typography } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import CardClass from "../../components/base/CardClass";
import Search from "antd/es/input/Search";

const Classes = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <Background style={{ height: 150 }}>
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
              <Typography className="body-md-white">ENROLL CLASS</Typography>
            </Col>
          </Row>
        </Container>
      </Background>
      <Container>
        <Row
          justify={"space-between"}
          style={{ marginTop: "24px", width: "100%" }}
        >
          <Col span={6}>
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select season"
              />
          </Col>
          <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Search placeholder="input search text" style={{ width: 200 }} />
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {data.map((item) => (
            <Col span={6}>
              <CardClass />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Classes;
