import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigator = useNavigate();
  return (
    <Result
      status="success"
      title="Successfully Purchased order food delivery"
      subTitle="Our service takes 1-2 minutes to confirm transaction, please wait."
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => {
            navigator("/");
          }}
        >
          Go home page
        </Button>,
      ]}
    ></Result>
  );
};

export default Success;
