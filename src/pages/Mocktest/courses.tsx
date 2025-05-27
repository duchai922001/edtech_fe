import { Col, Row, Select } from "antd";
import Search from "antd/es/input/Search";
import CardCourse from "../../components/base/CardCourse";

const Courses = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div style={{ margin: "24px 0" }}>
      <Row justify={"space-between"}>
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
        <Col span={6}>
          <Search placeholder="input search text" style={{ width: 200 }} />
        </Col>
      </Row>
      <Row gutter={[24,24]} style={{marginTop: 24}}>
        {data.map((item) => (
          <Col span={8}>
            <CardCourse />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Courses;
