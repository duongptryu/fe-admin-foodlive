import Template from "../../layout/layout";
import SubUserManager from "./userManager";

const UserManager = () => {
  return (
    <Template content={<SubUserManager />} title="User Management"></Template>
  );
};

export default UserManager;
