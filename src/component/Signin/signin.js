import React from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  notification,
} from "antd";
import signinbg from "../../assets/images/img-signin.jpg";
import FoodterCustom from "../../layout/foodter";
import { useState, useEffect } from "react";
import storage from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import API from "../../api/fetch";

const { Title } = Typography;
const { Header, Content } = Layout;

const SignIn = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    API.post(`admin-login`, {
      phone: values.username,
      password: values.password,
    })
      .then((result) => {
        console.log(result);
        notification["success"]({
          message: "Login success",
        });
        storage.setToken(result.data.data.access_token.token);
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log(e);
        notification["error"]({
          message: "Error server",
          description: e.response.data.message,
        });
      });
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    document.title = "Sign In";
    const token = storage.getToken();
    if (token != "Bearer null") {
      navigate("/dashboard");
    }
  });
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>Foodlive admin</h5>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your username and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                ></Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    loading={loading}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <FoodterCustom></FoodterCustom>
      </Layout>
    </>
  );
};

export default SignIn;
