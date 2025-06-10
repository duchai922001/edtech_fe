import { Col, Row, Select } from "antd";
import Search from "antd/es/input/Search";
import CardMocktest from "../../components/base/CardMocktest";
import { useNavigate } from "react-router-dom";
import Container from "../../components/base/Container";
import { useGetMocktestsChinese } from "../../hooks/useMocktestChinese";
import Loading from "../../components/base/Loading";

const MocktestChinese = () => {
  const { data, isLoading } = useGetMocktestsChinese();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <Row justify={"space-between"} style={{ margin: "50px 0" }}>
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
      <Row gutter={[24, 24]} style={{ marginTop: 24, marginBottom: 60 }}>
        {data?.map((item: any) => (
          <Col span={6}>
            <CardMocktest
              item={item}
              onClick={() => navigate(`/practice/chinese/${item.title}`)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MocktestChinese;
