import { Col, Dropdown, Row, type MenuProps } from "antd";
import Container from "../base/Container";
import "./style.css";
import LOGO from "../../assets/LOGO.png";
import { MenuTabItem, type IMenuTab } from "../base/config/configMenu";
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "../../common/configMenu";
import toast from "react-hot-toast";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout success");
    navigate("/");
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => navigate("/profile-user")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 16px",
            fontSize: "16px",
          }}
        >
          <UserOutlined style={{ fontSize: "18px" }} />
          <span>Profile</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 16px",
            fontSize: "16px",
          }}
        >
          <LogoutOutlined style={{ fontSize: "18px" }} />
          <span>Log Out</span>
        </div>
      ),
    },
  ];

  const name = localStorage.getItem("name");

  function getFirstLetterOfLastName(fullName: string): string {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    const lastName = parts[parts.length - 1];
    return lastName.charAt(0).toUpperCase();
  }

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
            {isAuth ? (
              <Dropdown menu={{ items }} placement="bottomRight">
                <Avatar>{getFirstLetterOfLastName(name || "")}</Avatar>
              </Dropdown>
            ) : (
              <UserOutlined
                className="icon"
                onClick={() => navigate(Menu.URL_LOGIN_PAGE)}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
