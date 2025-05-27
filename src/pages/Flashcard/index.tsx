import { Col, Row, Select, Typography } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import CardCourse from "../../components/base/CardCourse";
import Search from "antd/es/input/Search";

const Flashcard = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <Background style={{ height: 300 }}>
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
            <Typography className="body-md-white">FLASHCARD</Typography>
          </Col>
          <Col span={24}>
            <Typography className="body-des-white">
              Flashcards to increase your vocabulary
            </Typography>
          </Col>
        </Row>
      </Background>
      <Container>
      <Row justify={"space-between"} style={{marginTop: "24px", width: "100%"}}>
        <Col span={12}>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select language"
                defaultValue={["language"]}
              />
            </Col>
            <Col span={12}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select difficult"
                defaultValue={["difficult"]}
              />
            </Col>
          </Row>
        </Col>
        <Col span={6}  style={{display: "flex", justifyContent: "flex-end"}}>
          <Search placeholder="input search text" style={{ width: 200 }} />
        </Col>
      </Row>
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {data.map((item) => (
            <Col span={6}>
              <CardCourse />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Flashcard;
