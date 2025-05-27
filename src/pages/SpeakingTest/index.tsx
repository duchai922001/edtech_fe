import { Avatar, Card, Select, Typography } from "antd";
import BackgroundSpeaking from "../../components/base/BackgroundSpeaking";
import Container from "../../components/base/Container";
import AvatarChatBox from "../../assets/avatarchat.png";
import { AudioOutlined } from "@ant-design/icons";

const ChatBubble = ({ from, children }) => {
  const isBot = from === "bot";
  return (
    <div style={{
      display: "flex",
      justifyContent: isBot ? "flex-start" : "flex-end",
      marginBottom: 12
    }}>
      {isBot && <Avatar src={AvatarChatBox} style={{ marginRight: 12 }} />}
      <div
        style={{
          background: isBot ? "white" : "#0B81FF",
          color: isBot ? "black" : "white",
          padding: 16,
          borderRadius: 12,
          maxWidth: 500,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.15)"
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SpeakingTest = () => {
  return (
    <BackgroundSpeaking>
      <Container>
        <div style={{ paddingTop: 48 }}>
          <Typography className="body-md-white">SPEAKING PRACTICE</Typography>
          <Typography className="body-des-white">
            Practice speaking with our AI Chatbot
          </Typography>

          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
            <ChatBubble from="bot">
              Hello, I’m FLP’s AI Chatbot, what would you like to practice today?
            </ChatBubble>

            <ChatBubble from="user">
              <Select
                allowClear
                style={{ width: 200 }}
                placeholder="Please select language"
                options={[
                  { label: "Japanese", value: "jp" },
                  { label: "Vietnamese", value: "vi" }
                ]}
              />
            </ChatBubble>

            <ChatBubble from="bot">
              <Card
                title="Introduce Yourself In Japanese"
                extra={<span>Due: 28/3/25</span>}
                style={{ width: 300 }}
              >
                <p>8/29 turned in</p>
              </Card>
            </ChatBubble>

            <ChatBubble from="bot">
              <Typography.Text strong>Here is an example introduction speech from TANAKA:</Typography.Text>
              <div style={{ marginTop: 8, marginBottom: 8 }}>
                <AudioOutlined style={{ fontSize: 24 }} /> [Waveform audio + reload]
              </div>
              <p style={{ marginBottom: 4 }}>
                はじめまして。私の名前は田中、さくら大学の学生です。私の趣味はスポーツをすることです。よろしくお願いします。
              </p>
              <p style={{ fontStyle: "italic", color: "#555" }}>
                Xin chào, tôi tên Tanaka, là học sinh của trường đại học Sakura. Sở thích của tôi là chơi thể thao. Mong được bạn giúp đỡ.
              </p>
            </ChatBubble>

            <ChatBubble from="bot">
              Now, you will practice speaking:
            </ChatBubble>

            <ChatBubble from="user">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <AudioOutlined style={{ fontSize: 24 }} /> [Your speech waveform here]
              </div>
            </ChatBubble>
          </div>
        </div>
      </Container>
    </BackgroundSpeaking>
  );
};

export default SpeakingTest;