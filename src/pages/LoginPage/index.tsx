import Title from "antd/es/typography/Title";
import BackgroundSpeaking from "../../components/base/BackgroundSpeaking";
import { Card, Form, Input, Button, Tabs, Typography } from "antd";
import toast from "react-hot-toast";
import { useState } from "react";
import { useLogin, useRegister } from "../../hooks/useUser";

const { TabPane } = Tabs;

const LoginPage = () => {
  const [form] = Form.useForm();
  const [tabKey, setTabKey] = useState("login");

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleSubmit = (values: any) => {
    const { username, password } = values;
    if (tabKey === "login") {
      loginMutation.mutate(
        { username, password },
        {
          onSuccess: (data: any) => {
            toast.success("Đăng nhập thành công");
            localStorage.setItem("token", data.token);
          },
          onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Đăng nhập thất bại");
          },
        }
      );
    } else {
      registerMutation.mutate(
        { username, password },
        {
          onSuccess: (data: any) => {
            form.resetFields();
            localStorage.setItem("token", data.token);
          },
          onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Đăng ký thất bại");
          },
        }
      );
    }
  };

  return (
    <BackgroundSpeaking>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8f9fa",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "90%",
            maxWidth: 1000,
            background: "#fff",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1607746882042-944635dfe10e)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              padding: 24,
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Title style={{ color: "white", fontSize: 32 }}>
              Chào mừng đến với FlashcardApp
            </Title>
            <p style={{ fontSize: 16, maxWidth: 300 }}>
              Học nhanh hơn, ghi nhớ tốt hơn – quản lý flashcard của bạn dễ
              dàng.
            </p>
          </div>

          {/* Right - Form */}
          <div style={{ flex: 1, padding: 32 }}>
            <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
              {tabKey === "login" ? "Đăng nhập" : "Đăng ký"}
            </Title>

            <Tabs
              defaultActiveKey="login"
              centered
              onChange={(key) => {
                setTabKey(key);
                form.resetFields();
              }}
            >
              <TabPane tab="Đăng nhập" key="login" />
              <TabPane tab="Đăng ký" key="register" />
            </Tabs>

            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              style={{ marginTop: 16 }}
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập username" }]}
              >
                <Input placeholder="username" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password placeholder="username123" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={
                    loginMutation.isLoading || registerMutation.isLoading
                  }
                >
                  {tabKey === "login" ? "Đăng nhập" : "Đăng ký"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </BackgroundSpeaking>
  );
};

export default LoginPage;
