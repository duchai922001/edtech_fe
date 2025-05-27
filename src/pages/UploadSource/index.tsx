import { Col, Row, Typography } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import UploadCustom from "./Upload";

const UploadSource = () => {
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
              <Typography className="body-md-white">UPLOAD</Typography>
            </Col>
          </Row>
        </Container>
      </Background>
      <Container>
        <UploadCustom />
      </Container>
    </div>
  );
};

export default UploadSource;
