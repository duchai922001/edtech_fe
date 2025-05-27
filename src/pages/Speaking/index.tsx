import { Avatar, Col, Row, Select, Typography } from "antd";
import BackgroundSpeaking from "../../components/base/BackgroundSpeaking";
import Container from "../../components/base/Container";
import AvatarChatBox from "../../assets/avatarchat.png";
const Speaking = () => {
  const speakingData = [
    {
      title: "Entrance Test",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7uvDUo1x285fKKjT_qblu9lZrDhEDnEugig&s",
    },
    {
      title: "Jap1 Flashcard",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbQUpMsyLd0Lgzc_3Q8deMvZAGB3WNDK0xqP4OY7Pen4Awi2sw-5XexMwSEqnKPuzN9Ps&usqp=CAU",
    },
    {
      title: "Game: Word Bash",
      img: "https://snacknation.com/wp-content/uploads/2022/09/5-minute-team-building-activities-e1662484078287.png",
    },
  ];
  return (
    <BackgroundSpeaking>
      <Container>
        <div>
          <Typography className="body-md-white">SPEAKING PRACTICE</Typography>
          <Typography className="body-des-white">
            Practice speaking with our AI Chatbot
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            flexDirection: "column",
            marginTop: 48,
            cursor: "pointer"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar src={AvatarChatBox} />
            <div
              style={{
                width: "500px",
                background: "#fff",
                border: "1px solid black",
                borderRadius: 4,
                padding: 12,
              }}
            >
              Hello, I’m FLP’s AI Chatbot, what would you like to practice
              today?
            </div>
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Select
              allowClear
              style={{ width: "200px" }}
              placeholder="Please select language"
            />
            <span>Choose your prefered language</span>
          </div>

          <Row style={{marginBottom: 400}}>
            {speakingData.map((item) => (
              <Col
                span={6}
                style={{
                  background: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: 12,
                    marginRight: 12
                }}
              >
                <img
                  src={item.img}
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: 12, }}
                />
                <div style={{padding: 24}}>
                <Typography className="title-sm-black">{item.title}</Typography>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </BackgroundSpeaking>
  );
};

export default Speaking;
