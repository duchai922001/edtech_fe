import React, { useState } from "react";
import { Upload, Button, Typography, Select, Input } from "antd";
import { InboxOutlined, FileAddOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { UploadSourceService } from "../../services/uploadSource.service";
import toast from "react-hot-toast";
import { useCreateResouce } from "../../hooks/useResource";
import { useGetLanguages } from "../../hooks/useLanguage";

const { Dragger } = Upload;
const { Title } = Typography;
const { Option } = Select;

const UploadCustom: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [language, setLanguage] = useState<string>();
  const [name, setName] = useState<string>("");

  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const { mutate: createResource } = useCreateResouce();
  const { data: languages = [] } = useGetLanguages();

  const props: UploadProps = {
    multiple: false,
    accept: ".pdf,.docx",
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    onRemove: (file) => {
      console.log({ file });
      setFileList([]);
      setUploadedFileUrl(null);
    },
    fileList,
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      toast.error("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0]);

    try {
      const response = await UploadSourceService.uploadSource(formData);
      if (response.data) {
        toast.success("File uploaded successfully!");
        setUploadedFileUrl(response.data);
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Upload error.");
    }
  };

  const handleCreateResource = () => {
    console.log({ name, language, uploadedFileUrl });
    if (!name || !language || !uploadedFileUrl) {
      toast.error("Please fill in all required fields and upload a file.");
      return;
    }

    const payload = {
      name,
      language: {
        id: language,
      },
      pdfFile: uploadedFileUrl,
    };

    createResource(payload, {
      onSuccess: () => {
        toast.success("Resource created successfully!");
        setFileList([]);
        setUploadedFileUrl(null);
        setName("");
        setLanguage(undefined);
      },
      onError: () => {
        toast.error("Failed to create resource.");
      },
    });
  };

  return (
    <div
      className="upload-container"
      style={{ display: "flex", gap: 32, margin: "100px 0" }}
    >
      <div style={{ flex: 1 }}>
        <Title level={5}>Resource Info</Title>

        <Input
          placeholder="Enter resource name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        <Select
          allowClear
          placeholder="Select language"
          style={{ width: "100%", marginBottom: 12 }}
          value={language}
          onChange={(val) => setLanguage(val)}
        >
          {languages.map((lang: any) => (
            <Option key={lang.code} value={lang.id}>
              {lang.name}
            </Option>
          ))}
        </Select>

        <Button
          icon={<FileAddOutlined />}
          block
          type="primary"
          onClick={handleCreateResource}
          disabled={!uploadedFileUrl}
        >
          Create Resource
        </Button>
      </div>

      <div style={{ flex: 2 }}>
        <Dragger {...props} style={{ padding: 12 }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Upload PDF or DOCX</p>
        </Dragger>

        {fileList.length > 0 && (
          <Button
            type="primary"
            style={{ marginTop: 12 }}
            onClick={handleUpload}
          >
            Upload File
          </Button>
        )}

        {uploadedFileUrl && (
          <p style={{ marginTop: 10, color: "green" }}>
            ✅ File uploaded:{" "}
            <a href={uploadedFileUrl} target="_blank" rel="noreferrer">
              View File
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadCustom;
