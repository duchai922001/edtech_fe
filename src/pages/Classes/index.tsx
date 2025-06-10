import { Col, Row, Typography } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import CardClass from "../../components/base/CardClass";
import { useState } from "react";
import ModalCustom from "../../components/base/Modal";
import { useGetResources } from "../../hooks/useResource";
import Loading from "../../components/base/Loading";

const Classes = () => {
  const { data: resources, isLoading } = useGetResources();
  const [choosePdf, setChoosePdf] = useState<string | null>(null);
  const [openModal, setOpenMdal] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  const handleDownload = () => {
    if (choosePdf) {
      const link = document.createElement("a");
      link.href = choosePdf.endsWith(".pdf") ? choosePdf : `${choosePdf}.pdf`;
      link.download = "tai_lieu.pdf"; // bạn có thể đặt tên khác nếu muốn
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
          {resources?.map((item: any, index: number) => (
            <Col
              key={index}
              span={6}
              onClick={() => {
                setOpenMdal(true);
                const pdfUrl = item.pdfFile;
                const validPdfUrl = pdfUrl.endsWith(".pdf")
                  ? pdfUrl
                  : `${pdfUrl}.pdf`;
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
        onOk={handleDownload}
        title="Tải tài liệu PDF"
      >
        <div style={{ textAlign: "center" }}>
          <Typography className="body-sm-black">
            Bạn có muốn tải tài liệu này về máy không?
          </Typography>
        </div>
      </ModalCustom>
    </div>
  );
};

export default Classes;
