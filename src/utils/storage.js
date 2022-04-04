export default {
  getToken: function () {
    return `Bearer ${localStorage.getItem("tokenAccess")}`;
  },
  logout: function () {
    return `Bearer ${localStorage.removeItem("tokenAccess")}`;
  },
  setToken: function (value) {
    window.localStorage.setItem("tokenAccess", value);
  },
};
