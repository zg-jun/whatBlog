// 前台
import Main from "../views/client/main.vue";
import ArticleList from "../views/client/article/list.vue";
import ArticleDetail from "../views/client/article/detail.vue";
import friendshipChainList from "../views/client/friendshipChain/list.vue";
// 后台管理
import AdminMain from "../views/admin/main.vue";
import AdminLogin from "../views/admin/adminLogin/adminLogin.vue";
import AddArticle from "../views/admin/article/addArticle.vue";
import ActionArticle from "../views/admin/article/list.vue";
import AdminList from "../views/admin/authorization/adminList.vue";

const routes = [
  {
    path: "/",
    redirect: { name: 'main.articleList' }
  },
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      {
        path: "/",
        name: "main.articleList",
        component: ArticleList
      },
      {
        path: "/articleDetail/:id",
        name: "main.articleDetail",
        component: ArticleDetail
      },
      {
        path: "/friendshipChainList",
        name: "main.friendshipChainList",
        component: friendshipChainList
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

export default routes;