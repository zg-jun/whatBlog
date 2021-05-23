import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";

Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

// 递归检测是否包含同级目录
const findRoute = (routeItem, routeName) => {
  for (let item of routeItem) {
    if (item.path.replace(/\//g, "") === routeName) {
      return item;
    } else {
      if (item.children && item.children.length) findRoute(item.children, routeName);
    }
  }
};

// 自动化配置路由
const requireContext = require.context("@views/", true, /\.vue$/);

requireContext.keys().forEach(fileName => {
  //获取路由配置
  const routerModule = requireContext(fileName);
  // 路由命名
  let filePath = fileName.replace(/(\.\/|\.vue)/g, "");
  // 根据/拆分路由层级
  let routeArr = filePath.split("/");
  // 记录父级路由
  let parentName = null;
  // 按照层级查找
  routeArr.forEach(item => {
    let result = findRoute(routes, item);
    result
      ? (parentName = result)
      : parentName
      ? parentName.children.push({
          path: item,
          name: routerModule.default.name || item,
          component: routerModule.default,
          children: []
        })
      : routes.push({
          path: `/${item}`,
          name: routerModule.default.name || item,
          component: routerModule.default,
          children: []
        });
  });
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if(!sessionStorage.token){
    if(!to.path.split('/').includes('back')) return next();
    return next({name:'adminLogin'});
  };
  next();
});


export default router;
