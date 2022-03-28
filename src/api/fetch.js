import axios from "axios";
import storage from "../utils/storage";

const fetch = axios.create({ baseURL: "http://localhost:8080/api/v1" });
fetch.defaults.headers.common["authorization"] = storage.getToken();
// fetch.defaults.timeout = 3000;
fetch.defaults.timeoutErrorMessage = "timeout";
fetch.interceptors.request.use((request) => {
  // request.headers.authorization = window.localStorage.getItem("token");
  request.headers.authorization = storage.getToken();
  return request;
});
fetch.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // window.localStorage.removeItem("token");
      storage.logout();

      // if (!window.location.href.includes("login")) {
      //   window.location.href = "/";
      // }
      //toastr.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
    }

    if (error.response && error.response.status === 403) {
      // toastr.error("Bạn không có quyền thực hiện thao tác này");
    }
    if (error.response && error.response.status >= 500) {
      // toastr.error(
      //   "Đã xảy ra lỗi trên hệ thống, vui lòng thử lại sau ít phút."
      // );
    }
    return Promise.reject(error);
  }
);

export default fetch;
