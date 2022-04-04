import Template from "../../layout/layout";
import SubOwnerRstManager from "./ownerRstManager";

const OwnerRstManager = () => {
  return (
    <Template
      content={<SubOwnerRstManager />}
      title="Owner Restaurant Management"
    ></Template>
  );
};

export default OwnerRstManager;
