import React from 'react';
import '../style.css';

const students = [
  { name: 'Nguyễn Văn Tài (you)', id: 'SE171234', color: '#2D6CDF' },
  { name: 'Nguyễn Minh Nhật', id: 'SE172780', color: '#387A3D' },
  { name: 'Đỗ Văn Đạt', id: 'SE193120', color: '#CA5454' },
  { name: 'Lâm Thiên Trúc', id: 'SE191232', color: '#2D6CDF' },
  { name: 'Ngô Ngọc Bích', id: 'SE194215', color: '#40C1AC' },
  { name: 'Nguyễn Thành Sơn', id: 'SE183582', color: '#5E2A1E' },
  { name: 'Nguyễn Thanh Bình', id: 'SE192012', color: '#B97E2D' },
  { name: 'Trần Hải My', id: 'SE201913', color: '#42C1DE' },
];

const EnrolledStudentsList: React.FC = () => {
  return (
    <div className="students-card">
      <h4>Enrolled Students</h4>
      <ul className="students-list">
        {students.slice(0, 8).map((student, idx) => (
          <li key={idx}>
            <div className="avatar" style={{ backgroundColor: student.color }}>
              {student.name.charAt(0)}
            </div>
            <div>
              <div className={`name ${student.name.includes('(you)') ? 'you' : ''}`}>{student.name}</div>
              <div className="id">{student.id}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="see-more">See more…</div>
    </div>
  );
};

export default EnrolledStudentsList;
