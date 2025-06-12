import React from "react";
import "./style.css";
import Container from "../../components/base/Container";

const UserProfile: React.FC = () => {
  return (
    <Container>
      <div className="card-container">
        <div className="card-left">
          <img
            src="https://i.pravatar.cc/100?img=32"
            alt="avatar"
            className="avatar"
          />
          <h2 className="name">Hembo Tingor</h2>
          <p className="role">Web Designer</p>
          <a href="#" className="icon-link">
            ✎
          </a>
        </div>
        <div className="card-right">
          <div className="section">
            <h3>Information</h3>
            <div className="row">
              <div>
                <p className="label">Email</p>
                <p className="value">rntng@gmail.com</p>
              </div>
              <div>
                <p className="label">Phone</p>
                <p className="value">98979989898</p>
              </div>
            </div>
          </div>
          <div className="section">
            <h3>Projects</h3>
            <div className="row">
              <div>
                <p className="label">Recent</p>
                <p className="value">Sam Disuja</p>
              </div>
              <div>
                <p className="label">Most Viewed</p>
                <p className="value">Dinoter husainm</p>
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
