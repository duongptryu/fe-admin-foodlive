import { Avatar, Image, PageHeader, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./header.css";
import storage from "../utils/storage";
import { useEffect } from "react";

function Header(props) {
  let navigate = useNavigate();

  // const checkLogin = () => {
  //   const token = storage.getToken();
  //   console.log(token);
  //   if (token == undefined || token == "Bearer null") {
  //     return navigate("/sign-in");
  //   }
  // };

  // useEffect(() => {
  //   checkLogin();
  // }, []);
  return (
    <PageHeader
      className="site-page-header"
      onBack={() => window.history.back()}
      title={props.title}
      // subTitle="This is a subtitle"
      extra={[
        <Avatar
          src={
            <Image
              src="https://joeschmoe.io/api/v1/random"
              style={{ width: 32 }}
            />
          }
        />,
        <Tag color="green">Admin</Tag>,
        <Button
          type="primary"
          danger
          onClick={() => {
            storage.logout();
            navigate("/sign-in");
          }}
        >
          Logout
        </Button>,
      ]}
    />
  );
}

export default Header;
