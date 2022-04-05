import { Layout, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../logo.png";
import "./layout.css";
import {
  BarChartOutlined,
  UserOutlined,
  NotificationOutlined,
  BarsOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import Header from "./header";
import FoodterCustom from "./foodter";

const { Content, Footer, Sider } = Layout;

const Template = (props) => {
  let navigate = useNavigate();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logoCustom" style={{ marginBottom: "20px" }}>
          <img src={Logo} />
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="1"
            icon={<BarChartOutlined />}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </Menu.Item>
          {/* <Menu.Item
            key="2"
            icon={<NotificationOutlined />}
            onClick={() => {
              navigate("/notification");
            }}
          >
            Notification Manage
          </Menu.Item> */}
          <Menu.Item
            key="3"
            icon={<UserOutlined />}
            onClick={() => {
              navigate("/user");
            }}
          >
            User Manage
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<ShopOutlined />}
            onClick={() => {
              navigate("/rst");
            }}
          >
            Restaurant Manage
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<UserOutlined />}
            onClick={() => {
              navigate("/owner-rst");
            }}
          >
            Owner Restaurant Manage
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<BarsOutlined />}
            onClick={() => {
              navigate("/category");
            }}
          >
            Category Manage
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Header title={props.title}></Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            backgroundColor: "#F0F2F5",
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center", minHeight: "70vh" }}
          >
            {props.content}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Foodlive ©2022 DuongPT & HuongNTT
        </Footer> */}
        <FoodterCustom></FoodterCustom>
      </Layout>
    </Layout>
  );
};

export default Template;
