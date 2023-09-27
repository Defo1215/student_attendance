const timeUtils = {}

timeUtils.timestampToTime = function (time) {
  let date = new Date(time);
  let len = time.toString().length;
  if (len < 13) {
    let sub = 13 - len;
    sub = Math.pow(10, sub);
    date = new Date(time * sub);
  }
  let y = date.getFullYear() + "-";
  let M = date.getMonth() + 1;
  M = (M < 10 ? "0" + M : M) + "-";
  let d = date.getDate();
  d = (d < 10 ? "0" + d : d)
  // var h = date.getHours();
  // h = (h < 10 ? '0' + h : h) + ':';
  // var m = date.getMinutes();
  // m = (m < 10 ? '0' + m : m);
  return y + M + d;
};

export default timeUtils;
