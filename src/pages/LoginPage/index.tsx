import Title from "antd/es/typography/Title";
import BackgroundSpeaking from "../../components/base/BackgroundSpeaking";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
const LoginPage = () => {
  return (
    <BackgroundSpeaking>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(2px)",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "40px 30px",
            borderRadius: 12,
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            width: 320,
          }}
        >
          <Title level={3} style={{ color: "green", marginBottom: 24 }}>
            LOG IN
          </Title>

          <Button
            icon={<GoogleOutlined />}
            size="large"
            block
            style={{ marginBottom: 16 }}
          >
            Log in with your FPT email
          </Button>

          <Button
            size="large"
            type="primary"
            block
            style={{ backgroundColor: "#0066FF" }}
          >
            Log in with FEID (From K19)
          </Button>
        </div>
      </div>
    </BackgroundSpeaking>
  );
};

export default LoginPage;
