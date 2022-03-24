import "antd/dist/antd.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Template from "./layout/layout";
import UserManage from "./component/UserManager/index";
import OwnerRstManager from "./component/OwnerRstManager";
import RstManager from "./component/RstManager";
import CategoryManager from "./component/CategoryManager";
import DetailRst from "./component/RstDetail";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import PaymentScreen from "./component/Payment/payment";

const beamsClient = new PusherPushNotifications.Client({
  instanceId: "d1a00704-2838-48a8-984d-a3cd63dafce7",
});

const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
  url: "http://localhost:8080/api/v1/beams",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOjM2LCJyb2xlIjoiU1RBRkYifSwiZXhwIjoxNjUwMTg1NjA0LCJpYXQiOjE2NDc1OTM2MDR9.BPafNMzKH6HpdDE6SiqUxIKmGH0hb8rG_oq9abL8oBc", // Headers your auth endpoint needs
  },
});

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
            path="/order"
            element={<PaymentScreen></PaymentScreen>}
          />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
