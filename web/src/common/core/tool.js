/**
 * 全局公共方法
 */
export default {
  // 获取网站运行时间
  getRunTime:(startTime) => {
    let dt = Date.now() - new Date(startTime).getTime();
    let d = parseInt(dt / (1000 * 60 * 60 * 24));
    let h = parseInt((dt % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = parseInt((dt % (1000 * 60 * 60)) / (1000 * 60));
    let s = parseInt((dt % (1000 * 60)) / 1000);
    return `${String(d).padStart(2,0)}天${String(h).padStart(2,0)}时${String(m).padStart(2,0)}分${String(s).padStart(2,0)}秒`;
  }
} 