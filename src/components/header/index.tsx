import { Avatar, Col, Dropdown, Row, type MenuProps } from "antd";
import Container from "../base/Container";
import "./style.css";
import LOGO from "../../assets/LOGO.png";
import { MenuTabItem, type IMenuTab } from "../base/config/configMenu";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "../../common/configMenu";
import toast from "react-hot-toast";
const Header = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("jwt");
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    toast.success("Đăng xuất");
    navigate("/login");
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p onClick={() => navigate("/profile-user")}>Thông tin cá nhân</p>,
    },
    {
      key: "2",
      label: <p onClick={handleLogout}>Đăng xuất</p>,
    },
  ];
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
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT18iwsdCCbBfpa50-5BmNa_m_BX087_x1oWQ&s" />
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
