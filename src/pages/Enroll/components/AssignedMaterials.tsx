import React from "react";
import "../style.css";
import { PlusCircleOutlined } from "@ant-design/icons";
const materials = [
  {
    icon: "📄",
    type: "Mock Test",
    title: "JPD102 Unit 1 - 2 - 3",
    status: "0/29 turned in",
    due: "28/3/25",
    bg: "#E6EFED",
  },
  {
    icon: "🎤",
    type: "Speaking Practice",
    title: "Introduce Yourself In Japanese",
    status: "8/29 turned in",
    due: "28/3/25",
    bg: "#E6EFED",
  },
];

const AssignedMaterials: React.FC = () => {
  return (
    <div className="materials-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Assigned Materials</h4>
        <button
          style={{
            border: " none",
            background: "var(--primary-color)",
            borderRadius: "48px",
            padding: 12,
            width: 100,
            color: "white",
            fontSize: 18,
            display: "flex",
            gap: 4,
            alignItems: "center"
          }}
        >
          <PlusCircleOutlined />
          <span>Add...</span>
        </button>
      </div>
      <div className="materials-list">
        {materials.map((item, idx) => (
          <div
            className="material-item"
            style={{ backgroundColor: item.bg }}
            key={idx}
          >
            <div className="material-icon">
              <div className="icon">{item.icon}</div>
              <div className="type">{item.type}</div>
            </div>
            <div className="material-content">
              <div className="title">{item.title}</div>
              <div className="bottom">
                <div className="status">{item.status}</div>
                <div className="due">Due: {item.due}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedMaterials;
