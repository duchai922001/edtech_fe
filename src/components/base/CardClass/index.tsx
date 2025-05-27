import React from 'react';
import { Card, Typography } from 'antd';
import './style.css';

const { Text } = Typography;

const CardClass: React.FC = () => {
  return (
    <Card className="schedule-card" bordered={false}>
      <div className="card-image">
        <img
          src="https://via.placeholder.com/300x160?text=No+Image"
          alt="class"
          className="image-placeholder"
        />
      </div>

      <div className="card-footer">
        <div className="title-with-flag">
          <Text strong>JPD102 - GD1909 - Wed/Sat</Text>
          <img
            src="https://flagcdn.com/jp.svg"
            alt="JP"
            width={16}
            height={16}
            className="flag-icon"
          />
        </div>
        <Text type="secondary">29 students</Text>
      </div>
    </Card>
  );
};

export default CardClass;
