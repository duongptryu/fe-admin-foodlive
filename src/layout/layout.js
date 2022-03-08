import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import Logo from "../logo.svg";
import "./layout.css";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const Template = (props) => {
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
        <div className="logo">
          <img src={Logo} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <NavLink to="/notification">Notification Manage</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Device Manage
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <NavLink to="/user">User Manage</NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
          <NavLink to="/rst"> Restaurant Manage</NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<CloudOutlined />}>
            <NavLink to="/owner-rst">Owner Restaurant</NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined />}>
            Category Manage
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            {props.content}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Foodlive ©2022 DuongPT & HuongNTT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Template;
