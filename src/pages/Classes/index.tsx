import { Col, Row, Typography } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import CardClass from "../../components/base/CardClass";

import { useState } from "react";
import ModalCustom from "../../components/base/Modal";
import { useGetResources } from "../../hooks/useResource";

const Classes = () => {
  const { data: resources } = useGetResources();
  const [choosePdf, setChoosePdf] = useState(null);
  const [openModal, setOpenMdal] = useState(false);
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
              <Typography className="body-md-white">RESOURCES</Typography>
            </Col>
          </Row>
        </Container>
      </Background>
      <Container>
        <Row gutter={[24, 24]} style={{ marginTop: 24, marginBottom: 50 }}>
          {resources?.map((item: any) => (
            <Col
              span={6}
              onClick={() => {
                setOpenMdal(true);

                const pdfUrl = item.pdfFile;
                const validPdfUrl = pdfUrl.includes(".pdf")
                  ? pdfUrl.replace(".pdf", "")
                  : pdfUrl;

                setChoosePdf(validPdfUrl);
              }}
            >
              <CardClass item={item} />
            </Col>
          ))}
        </Row>
      </Container>
      <ModalCustom
        isOpen={openModal}
        onClose={() => setOpenMdal(false)}
        onOk={() => {
          if (choosePdf) {
            window.open(choosePdf, "_blank");
          }
        }}
        title="Xem tài liệu PDF"
      >
        <div style={{ textAlign: "center" }}>
          <Typography className="body-sm-black">
            Bạn có muốn mở tài liệu này?
          </Typography>
        </div>
      </ModalCustom>
    </div>
  );
};

export default Classes;
