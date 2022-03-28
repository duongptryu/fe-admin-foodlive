import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const PageFail = () => {
  const navigator = useNavigate();
  return (
    <Result
      status="error"
      title="Payment order fail"
      subTitle="Please check and modify the following information before resubmitting."
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigator("/");
          }}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default PageFail;
