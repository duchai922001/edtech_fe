import { Col, Row, Select } from "antd";
import Search from "antd/es/input/Search";
import { useGetMocktests } from "../../hooks/useMocktest";
import CardMocktest from "../../components/base/CardMocktest";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { data } = useGetMocktests();
  const navigate = useNavigate();
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
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {data?.map((item: any) => (
          <Col span={6}>
            <CardMocktest
              item={item}
              onClick={() => navigate(`/mocktest/${item.title}`)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Courses;
