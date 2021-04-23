const routes = [
  {
    path: "/",
    redirect: { name: 'articleList' }
  },
  {
    path: "*",
    redirect: "/404"
  }
  //其余路由index.js自动配置...
];

export default routes;