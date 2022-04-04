import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Template from "./layout/layout";
import UserManage from "./component/UserManager/index";
import OwnerRstManager from "./component/OwnerRstManager";
import RstManager from "./component/RstManager";
import CategoryManager from "./component/CategoryManager";
import DetailRst from "./component/RstDetail";
import PaymentScreen from "./component/Payment/payment";
import PageNotFound from "./common/404";
import Success from "./common/success";
import PageFail from "./common/fail";
import Dashboard from "./component/Dashboard";
import SignIn from "./component/Signin/signin";

function App() {
  return (
    <React.Fragment>
      <div>
        {" "}
        <Routes>
          <Route exact={true} path="/" element={<Dashboard></Dashboard>} />
          <Route exact={true} path="/sign-in" element={<SignIn></SignIn>} />

          <Route
            exact={true}
            path="/dashboard"
            element={<Dashboard></Dashboard>}
          />
          <Route
            exact={true}
            path="/user"
            element={<UserManage></UserManage>}
          />

          <Route exact={true} path="/rst" element={<RstManager></RstManager>} />

          <Route
            exact={true}
            path="/rst/:id"
            element={<DetailRst></DetailRst>}
          />

          <Route
            exact={true}
            path="/owner-rst"
            element={<OwnerRstManager></OwnerRstManager>}
          />
          <Route
            exact={true}
            path="/category"
            element={<CategoryManager></CategoryManager>}
          />

          <Route
            exact={true}
            path="/order/:id"
            element={<PaymentScreen></PaymentScreen>}
          />

          <Route path="/success" element={<Success></Success>} />

          <Route path="/fail" element={<PageFail></PageFail>} />

          <Route path="/404" element={<PageNotFound></PageNotFound>} />
          <Route path="*" element={<PageNotFound></PageNotFound>} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
