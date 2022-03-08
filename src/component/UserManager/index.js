import Template from "../../layout/layout"
import SubUserManager from "./userManager"

const UserManager = () => {
    return (
        <Template content={<SubUserManager/>}></Template>
    )
}

export default UserManager