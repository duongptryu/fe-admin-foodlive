var common = {};

common.formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

common.formatDatetime = (datetime) => {
  var m = new Date(datetime);
  return (
    m.getUTCFullYear() +
    "/" +
    (m.getUTCMonth() + 1) +
    "/" +
    m.getUTCDate() +
    " " +
    m.getUTCHours() +
    ":" +
    m.getUTCMinutes() +
    ":" +
    m.getUTCSeconds()
  );
};

export default common;
