import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  List,
  Card,
  Space,
  Row,
  Col,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetLanguages } from "../../hooks/useLanguage";
import { useCreateFlashCards } from "../../hooks/useFlashCard";

const { Option } = Select;

interface FlashCard {
  title: string;
  question: string;
  answer: string;
  image?: string;
  createBy: number;
  language: { id: number };
}

const CreateFlashCardPage: React.FC = () => {
  const { data: languages, isLoading: loadingLanguages } = useGetLanguages();
  const userIdString = localStorage.getItem("userID");
  const userId = userIdString ? JSON.parse(userIdString) : null;
  const { mutate: createFlashCards, isPending: submitting } =
    useCreateFlashCards();
  const [form] = Form.useForm();
  const [flashcardsCreated, setFlashcardsCreated] = React.useState<FlashCard[]>(
    []
  );

  const onFinish = (values: any) => {
    const { title, languageId, purpose, flashcards } = values;

    if (!flashcards || flashcards.length === 0) {
      message.error("Vui lòng thêm ít nhất 1 flashcard");
      return;
    }

    const payload: FlashCard[] = flashcards.map((fc: any) => ({
      title,
      purpose,
      question: fc.question,
      answer: fc.answer,
      image: fc.image || "",
      createBy: userId?.ID,
      language: { id: languageId },
    }));

    createFlashCards(payload, {
      onSuccess: (response, variables) => {
        console.log({ variables });
        const newFlashCards = response.data as FlashCard[];
        setFlashcardsCreated(newFlashCards);
        message.success("Tạo flashcards thành công");
        form.resetFields();
      },
      onError: () => {
        message.error("Tạo flashcards thất bại");
      },
    });
  };

  const styleInput = {
    height: 60,
    background: "#2E3856",
    color: "white",
  };

  return (
    <div style={{ maxWidth: 1200, margin: "40px auto", padding: 16 }}>
      <h1>Tạo một học phần mới</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row>
          <Col span={8}>
            {" "}
            <Form.Item
              label="Tiêu đề học phần"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input style={styleInput} />
            </Form.Item>
          </Col>

          <Col span={8}>
            {" "}
            <Form.Item
              label="Ngôn ngữ"
              name="languageId"
              rules={[{ required: true, message: "Chọn ngôn ngữ" }]}
            >
              <Select
                loading={loadingLanguages}
                style={{ height: 60 }}
                dropdownStyle={{
                  backgroundColor: "#2E3856",
                  color: "white",
                }}
              >
                {languages?.map((lang: any) => (
                  <Option key={lang.id} value={lang.id}>
                    {lang.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Mục đích"
              name="purpose"
              rules={[{ required: true, message: "Vui lòng chọn mục đích" }]}
            >
              <Select style={{ height: 60 }}>
                <Option value="Learn">Học từ vựng</Option>
                <Option value="Review">Ôn tập</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.List name="flashcards" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    alignItems: "baseline",
                    flexWrap: "wrap",
                  }}
                  align="start"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "question"]}
                    label="Thuật ngữ"
                    rules={[
                      { required: true, message: "Vui lòng nhập thuật ngữ" },
                    ]}
                  >
                    <Input style={styleInput} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "answer"]}
                    label="Định nghĩa"
                    rules={[
                      { required: true, message: "Vui lòng nhập định nghĩa" },
                    ]}
                  >
                    <Input style={styleInput} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "image"]}
                    label="Hình ảnh (URL)"
                  >
                    <Input style={{ ...styleInput, width: 810 }} />
                  </Form.Item>

                  {fields.length > 1 && (
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{ marginTop: 30, fontSize: 20, color: "red" }}
                    />
                  )}
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm flashcard
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            block
            style={{ background: "#1D4E3A", height: 50 }}
          >
            Tạo tất cả flashcard
          </Button>
        </Form.Item>
      </Form>

      {flashcardsCreated.length > 0 && (
        <>
          <h2>Flashcards đã tạo</h2>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={flashcardsCreated}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={item.title}
                  size="small"
                  extra={`Lang ID: ${item.language.id}`}
                >
                  <p>
                    <b>Câu hỏi:</b> {item.question}
                  </p>
                  <p>
                    <b>Trả lời:</b> {item.answer}
                  </p>
                  {item.image && (
                    <img
                      src={item.image}
                      alt="Flashcard"
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                  )}
                </Card>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default CreateFlashCardPage;
