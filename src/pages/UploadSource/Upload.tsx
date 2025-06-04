import React, { useState } from "react";
import { Upload, Button, Typography, message, Select, Row, Col } from "antd";
import { InboxOutlined, FilePdfOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import "./style.css";
import { UploadSourceService } from "../../services/uploadSource.service";
import toast from "react-hot-toast";

const { Dragger } = Upload;
const { Title } = Typography;
const { Option } = Select;

const UploadCustom: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [language, setLanguage] = useState<string>();
  const [level, setLevel] = useState<string>();
  const [uploadedBy] = useState("system");

  const props: UploadProps = {
    multiple: true,
    accept: ".pdf,.docx",
    beforeUpload: (file) => {
      setFileList((prev) => [...prev, file]);
      return false;
    },
    onRemove: (file) => {
      setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    fileList,
  };

  const handleConfirm = async () => {
    if (fileList.length === 0) {
      toast.error("Please upload at least one file.");
      return;
    }

    // if (!language) {
    //   toast.error("Please select a language.");
    //   return;
    // }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await UploadSourceService.uploadSource(formData);
      if (response.status === 200) {
        toast.success("Upload success!");

        setFileList([]);
      } else {
        const error = await response.text();
        toast.error("Upload failed: " + error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while uploading.");
    }
  };

  return (
    <div className="upload-container" style={{ display: "flex", gap: 32 }}>
      <div style={{ flex: 1 }}>
        <Title level={5}>Type of resource</Title>
        <div className="resource-buttons">
          <Button
            className="btn active"
            type="primary"
            icon={<InboxOutlined />}
            block
          >
            Mock Test
          </Button>
          <Button className="btn" disabled block>
            Speaking Practice
          </Button>
          <Button className="btn" disabled block>
            Flashcard
          </Button>
          <Button className="btn" disabled block>
            Language Games
          </Button>
          <Button className="btn" disabled block>
            Resources
          </Button>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select language"
                  onChange={(value) => setLanguage(value)}
                  value={language}
                >
                  <Option value="en">English</Option>
                  <Option value="jp">Japanese</Option>
                  <Option value="vi">Vietnamese</Option>
                </Select>
              </Col>
              <Col span={12}>
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select level"
                  onChange={(value) => setLevel(value)}
                  value={level}
                >
                  <Option value="beginner">Beginner</Option>
                  <Option value="intermediate">Intermediate</Option>
                  <Option value="advanced">Advanced</Option>
                </Select>
              </Col>
            </Row>
          </div>
          <div style={{ fontSize: 12, color: "green" }}>
            ● Private resource (only available for students of your class)
          </div>
          <div
            style={{
              marginTop: 8,
              padding: 8,
              background: "#eee",
              borderRadius: 4,
            }}
          >
            <b>Class code:</b> JPD102
          </div>
        </div>
      </div>

      <div style={{ flex: 2 }}>
        <Button
          block
          style={{
            marginBottom: 12,
            background: "#F5F5F5",
            border: "none",
            boxShadow: "2px 2px 2px 2px gray",
          }}
          type="link"
          href="https://res.cloudinary.com/didb3lzdt/raw/upload/v1748964832/zfljulzjk0skkonmjs3e.pdf"
          target="_blank"
        >
          DOWNLOAD EXAMPLE FORMAT FILES
        </Button>

        <Dragger {...props} style={{ padding: 12 }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Upload Resources (.docx, .pdf,...)</p>
        </Dragger>

        {fileList.length > 0 && (
          <ul style={{ listStyle: "none", marginTop: 16, padding: 0 }}>
            {fileList.map((file) => (
              <li
                key={file.uid}
                style={{
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <FilePdfOutlined style={{ color: "red" }} />
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        )}

        <Button
          type="primary"
          block
          style={{
            marginTop: 16,
            height: 40,
            backgroundColor: "#134f36",
          }}
          onClick={handleConfirm}
        >
          CONFIRM
        </Button>
      </div>
    </div>
  );
};

export default UploadCustom;
