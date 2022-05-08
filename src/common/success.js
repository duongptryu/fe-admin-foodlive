import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigator = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const order_id = queryParams.get("orderId");
  if (order_id == undefined) {
    navigator("/404");
  }

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
        <Button
          type="primary"
          key="console"
          onClick={() => {
            window.location.href = `food://success?orderId=${order_id}&orderType=crypto_payment&resultCode=0`;
          }}
        >
          Go to app
        </Button>,
      ]}
    ></Result>
  );
};

export default Success;
