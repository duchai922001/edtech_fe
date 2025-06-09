import React from "react";
import { Card, Typography } from "antd";
import "./style.css";

const { Text } = Typography;

interface CardClassProps {
  item: {
    name: string;
    // thêm các field khác nếu có
  };
}

const CardClass: React.FC<CardClassProps> = ({ item }) => {
  return (
    <Card className="schedule-card" bordered={false}>
      <div className="card-image">
        <img
          src="https://smot.bvhttdl.gov.vn/wp-content/uploads/2021/04/1427242000_507f63ecd93d6f77c16bb8b6e0b9fd63tai-lieu-moi.jpg"
          className="image-placeholder"
        />
      </div>

      <div className="card-footer">
        <div className="title-with-flag">
          <Text strong>{item?.name}</Text>
        </div>
      </div>
    </Card>
  );
};

export default CardClass;
