/**
 * 全局过滤器
 */

 const install = Vue =>{
  //  格式化时间
   Vue.filter('formatTime',(val)=>{
     if(!val) return '';
     let dateObj = new Date(val);
     let y = dateObj.getFullYear();
     let m = dateObj.getMonth()+1;
     let d = dateObj.getDate();
     let h = dateObj.getHours();
     let mi = dateObj.getMinutes();
     let s = dateObj.getSeconds();
     return `${y}-${String(m).padStart(2,0)}-${String(d).padStart(2,0)} ${String(h).padStart(2,0)}:${String(mi).padStart(2,0)}:${String(s).padStart(2,0)}`;
   });
   //  过滤文章摘要字数
   Vue.filter('formatAbstract',(val)=>{
    if (!val) return '';
    let strLen = 200;//限制字符数
    return val.length > strLen ? val.slice(0, strLen) + '...' : val;
  });
 }

 export default { install }