import Vue from "vue";
import VueRouter from "vue-router";
// 前台
import Main from "../views/client/main.vue";
import ArticleList from "../views/client/article/list.vue";
import ArticleDetail from "../views/client/article/detail.vue";
// 后台管理
import AdminMain from "../views/admin/main.vue";
import AdminLogin from "../views/admin/adminLogin/adminLogin.vue";
import AddArticle from "../views/admin/article/addArticle.vue";
import ActionArticle from "../views/admin/article/list.vue";
import AdminList from "../views/admin/authorization/adminList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: 'articleList'
  },
  {
    path: "/main",
    name: "main",
    component: Main,
    children: [
      {
        path: "/articleList",
        name: "main.articleList",
        component: ArticleList
      },
      {
        path: "/articleDetail/:id",
        name: "main.articleDetail",
        component: ArticleDetail
      }
    ]
  },
  // 后台管理路由
  {
    path: "/adminLogin",
    name: "admin.login",
    component: AdminLogin
  },
  {
    path: "/adminMain",
    name: "admin.main",
    component: AdminMain,
    children: [
      {
        path: "/addArticle/:id?",
        name: "admin.addArticle",
        component: AddArticle
      },
      {
        path: "/actionArticle",
        name: "admin.actionArticle",
        component: ActionArticle
      },
      {
        path: "/adminList",
        name: "admin.adminList",
        component: AdminList
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
