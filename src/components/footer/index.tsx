import { Col, Row } from "antd";
import Container from "../base/Container";
import {
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
  PinterestFilled,
} from "@ant-design/icons";
import "./style.css";
import LOGO from "../../assets/LOGO.png";
import { Link } from "react-router-dom";
import { MenuTabItem, type IMenuTab } from "../base/config/configMenu";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <Container>
        <Row gutter={[16, 24]}>
          {/* Logo + Contact Info */}
          <Col xs={24} md={8}>
            <img src={LOGO} style={{ width: "50px" }} alt="logo" />
            <div className="footer-title">CONTACT INFO.</div>
            <ul className="footer-list">
              <li>Phone</li>
              <li>Email</li>
              <li>Address</li>
            </ul>
          </Col>

          {/* Menu */}
          <Col xs={24} md={8}>
            <ul className="footer-menu">
              <li>
                <Link to="/" className="active">
                  Home
                </Link>
              </li>
              {MenuTabItem.map((menu: IMenuTab) => (
                <li>
                  <Link to={menu.to}>{menu.label}</Link>
                </li>
              ))}
            </ul>
            <div className="back-to-top">Back to top</div>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <div className="footer-social">
              <FacebookFilled />
              <InstagramFilled />
              <PinterestFilled />
              <YoutubeFilled />
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">© All rights reserved</div>
      </Container>
    </div>
  );
};

export default Footer;
