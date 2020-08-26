const formatDt = (num) => {
  return num >= 10 ? num : '0' + num;
}
export const runTime = (startTime) => {
  let dt = Date.now() - new Date(startTime).getTime();
  let d = parseInt(dt / (1000 * 60 * 60 * 24));
  let h = parseInt((dt % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let m = parseInt((dt % (1000 * 60 * 60)) / (1000 * 60));
  let s = parseInt((dt % (1000 * 60)) / 1000);
  return `${formatDt(d)}天${formatDt(h)}时${formatDt(m)}分${formatDt(s)}秒`;
}