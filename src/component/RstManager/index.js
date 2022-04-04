import Template from "../../layout/layout";
import SubRstManager from "./rstManager";

const RstManager = () => {
  return (
    <Template
      content={<SubRstManager />}
      title="Restaurant Management"
    ></Template>
  );
};

export default RstManager;
