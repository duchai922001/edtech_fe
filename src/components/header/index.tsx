import { Col, Row } from "antd";
import Container from "../base/Container";
import "./style.css";
import LOGO from "../../assets/LOGO.png";
import { MenuTabItem, type IMenuTab } from "../base/config/configMenu";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "../../common/configMenu";
const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="header-wrapper">
      <Container>
        <Row>
          <Col span={4}>
            <img
              src={LOGO}
              onClick={() => navigate("/")}
              style={{ width: "50px", height: "auto", marginLeft: "-24px" }}
            />
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 64,
              alignItems: "center",
            }}
          >
            {MenuTabItem.map((menu: IMenuTab) => (
              <Link to={menu.to} style={{ color: "white", fontSize: "18px" }}>
                {menu.label}
              </Link>
            ))}
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 48,
              alignItems: "center",
            }}
          >
            <SearchOutlined className="icon" />
            <UserOutlined className="icon" onClick={() => navigate(Menu.URL_LOGIN_PAGE)}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
