import "antd/dist/antd.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Template from "./layout/layout";
import UserManage from "./component/UserManager/index";
import OwnerRstManager from "./component/OwnerRstManager";
import RstManager from "./component/RstManager";

function App() {
  return (
    <React.Fragment>
      <div>
        {" "}
        <Routes>
          <Route exact={true} path="/" element={<Template></Template>} />
          <Route
            exact={true}
            path="/user"
            element={<UserManage></UserManage>}
          />

          <Route
            exact={true}
            path="/rst"
            element={<RstManager></RstManager>}
          />

          <Route
            exact={true}
            path="/owner-rst"
            element={<OwnerRstManager></OwnerRstManager>}
          />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
