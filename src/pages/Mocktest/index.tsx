import { Col, Row, Typography, Pagination } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import Courses from "./courses";
import { useParams } from "react-router-dom";
import { useGetMocktestLanguage } from "../../hooks/useMocktest";
import Loading from "../../components/base/Loading";
import { useState } from "react";

const MockTest = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetMocktestLanguage(id ?? "", currentPage);

  if (isLoading) {
    return <Loading />;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        <Courses data={data?.content} />
        <Row justify="center" style={{ marginTop: "24px" }}>
          <Col>
            <Pagination
              current={currentPage}
              pageSize={5}
              total={data?.totalPages || 0}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MockTest;
