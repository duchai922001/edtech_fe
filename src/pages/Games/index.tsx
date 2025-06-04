import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const BoardGame: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 16,
          boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2)",
          padding: "40px 32px",
          textAlign: "center",
          color: "#333",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h1 style={{ marginBottom: 32, fontWeight: 700, fontSize: 32 }}>
          🎮 Chọn trò chơi
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <Button
            type="primary"
            size="large"
            style={{
              minWidth: 180,
              height: 60,
              borderRadius: 12,
              fontWeight: "600",
              fontSize: 18,
              boxShadow: "0 6px 12px rgba(102, 126, 234, 0.5)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onClick={() => navigate("/word-game")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 12px 24px rgba(102, 126, 234, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(102, 126, 234, 0.5)";
            }}
          >
            Word Game
          </Button>

          <Button
            type="primary"
            size="large"
            style={{
              minWidth: 180,
              height: 60,
              borderRadius: 12,
              fontWeight: "600",
              fontSize: 18,
              boxShadow: "0 6px 12px rgba(118, 75, 162, 0.5)",
              backgroundColor: "#764ba2",
              borderColor: "#764ba2",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onClick={() => navigate("/word-cross-game")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 12px 24px rgba(118, 75, 162, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(118, 75, 162, 0.5)";
            }}
          >
            Word Cross Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoardGame;
