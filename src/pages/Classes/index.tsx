import { Col, Row, Select, Typography } from "antd";
import Background from "../../components/base/Background";
import Container from "../../components/base/Container";
import CardClass from "../../components/base/CardClass";
import { useState } from "react";
import ModalCustom from "../../components/base/Modal";
import { useGetResources } from "../../hooks/useResource";
import Loading from "../../components/base/Loading";
import { useGetLanguages } from "../../hooks/useLanguage";

const Classes = () => {
  const [choosePdf, setChoosePdf] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState(null);
  const { data: resources, isLoading } = useGetResources(selectLanguage ?? "");
  const { data: languages } = useGetLanguages();
  if (isLoading) {
    return <Loading />;
  }
  const handleDownload = async () => {
    if (!choosePdf) return;

    try {
      const response = await fetch(choosePdf, {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch the PDF: ${response.statusText}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (!contentType?.includes("application/pdf")) {
        console.warn("Unexpected Content-Type:", contentType);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "tai_lieu.pdf"; // Force download with .pdf extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up
      setOpenModal(false); // Close modal
    } catch (error) {
      console.error("Download failed:", error);
      alert("Không thể tải tài liệu. Vui lòng thử lại hoặc kiểm tra URL.");
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
        <Row justify="space-between" style={{ marginTop: 24, width: "100%" }}>
          <Col span={12}>
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select language"
                  onChange={(value) => setSelectLanguage(value)}
                  value={selectLanguage}
                  options={languages?.map((item: any) => ({
                    label: item.name,
                    value: String(item.id),
                  }))}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{ marginTop: 24, marginBottom: 50 }}>
          {resources?.map((item: any, index: number) => (
            <Col
              key={index}
              span={6}
              onClick={() => {
                setOpenModal(true);
                const pdfUrl = item.pdfFile;
                setChoosePdf(pdfUrl);
              }}
            >
              <CardClass item={item} />
            </Col>
          ))}
        </Row>
      </Container>

      <ModalCustom
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
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
