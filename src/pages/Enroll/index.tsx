import { Col, Row, Typography } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import EnrolledStudentsList from "./components/EnrolledStudentList";
import AssignedMaterials from "./components/AssignedMaterials";
import './style.css'
const Enroll = () => {
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
              <Typography className="body-md-white">
                JPD102 - GD1901 - Wed/Sat
              </Typography>
            </Col>
          </Row>
        </Container>
      </Background>
      <Container>
        <div className="class-overview">
          <EnrolledStudentsList />
          <AssignedMaterials />
        </div>
      </Container>
    </div>
  );
};

export default Enroll;
