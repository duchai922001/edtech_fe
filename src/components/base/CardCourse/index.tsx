// CardCourse.tsx
import React from 'react';
import { Card, Tag, Rate, Typography } from 'antd';
import './style.css'; // CSS riêng nếu cần thêm style tùy chỉnh

const { Title, Text } = Typography;

const CardCourse: React.FC = () => {
  return (
    <Card
      className="course-card"
      cover={
        <div className="course-image-placeholder">
          <img
            src="https://via.placeholder.com/300x160?text=No+Image"
            alt="course"
            className="course-image"
          />
        </div>
      }
      bordered={false}
    >
      <Tag color="orange" className="recommended-tag">
        Recommended
      </Tag>

      <div className="course-content">
        <Text type="secondary" style={{ marginBottom: 4 }}>Difficulty</Text>
        <Rate disabled defaultValue={3} style={{ fontSize: 16 }} />

        <div className="course-title-row">
          <Title level={5} style={{ margin: '8px 0 0' }}>ENTRANCE TEST</Title>
          <img
            src="https://flagcdn.com/gb.svg"
            alt="English"
            width={24}
            height={16}
            style={{ marginLeft: 8, borderRadius: 2 }}
          />
        </div>

        <Text type="secondary">A quick test to determine your current language level</Text>
      </div>
    </Card>
  );
};

export default CardCourse;
