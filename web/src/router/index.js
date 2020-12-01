import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if(!sessionStorage.token){
    if(to.name.split('.')[0] !== 'admin' || to.name.split('.')[1] === 'login'){
      return next();
    }
    return next({name:'admin.login'});
  };
  next();
});


export default router;
