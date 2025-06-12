import React from "react";
import "./style.css";
import Container from "../../components/base/Container";
import { decodeToken } from "../../utils/decode";

const UserProfile: React.FC = () => {
  const token = localStorage.getItem("jwt");
  const user = decodeToken(token);
  return (
    <Container>
      <div className="card-container">
        <div className="card-left">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT18iwsdCCbBfpa50-5BmNa_m_BX087_x1oWQ&s"
            alt="avatar"
            className="avatar"
          />
          <h2 className="name">{user?.sub.split("@")?.[0]}</h2>
        </div>
        <div className="card-right">
          <div className="section">
            <h3>Information</h3>
            <div className="row">
              <div>
                <p className="label">Email</p>
                <p className="value">{user?.sub}</p>
              </div>
            </div>
          </div>
          <div className="section">
            <h3>Address</h3>
            <div className="row">
              <div>
                <p className="value">Empty</p>
              </div>
            </div>
          </div>
          <div className="social">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
