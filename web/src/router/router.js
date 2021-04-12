// 前台
import ClintMain from "../views/client/main.vue";
import ArticleList from "../views/client/article/articleList.vue";
import ArticleDetail from "../views/client/article/articleDetail.vue";
import FriendsList from "../views/client/friends/friendsList.vue";
// 后台管理
import AdminMain from "../views/admin/main.vue";
import AdminLogin from "../views/admin/login/login.vue";
import AddArticle from "../views/admin/article/addArticle.vue";
import ArticlesManage from "../views/admin/article/articlesManage.vue";
import AuthAdmin from "../views/admin/auth/authAdmin.vue";
import FriendsManage from "../views/admin/site/friendsManage.vue";

const routes = [
  {
    path: "/",
    redirect: { name: 'client.articleList' }
  },
  // 前台路由
  {
    path: "/",
    name: "main",
    component: ClintMain,
    children: [
      {
        path: "/",
        name: "client.articleList",
        component: ArticleList
      },
      {
        path: "/articleDetail/:id",
        name: "client.articleDetail",
        component: ArticleDetail
      },
      {
        path: "/friendsList",
        name: "client.friendsList",
        component: FriendsList
      }
    ]
  },
  // 后台路由
  {
    path: "/adminLogin",
    name: "admin.login",
    component: AdminLogin
  },
  {
    path: "/main",
    name: "admin.main",
    component: AdminMain,
    children: [
      {
        path: "/addArticle/:id?",
        name: "admin.addArticle",
        component: AddArticle
      },
      {
        path: "/articlesManage",
        name: "admin.articlesManage",
        component: ArticlesManage
      },
      {
        path: "/authAdmin",
        name: "admin.authAdmin",
        component: AuthAdmin
      },
      {
        path: "/friendsManage",
        name: "admin.friendsManage",
        component: FriendsManage
      }
    ]
  }
];

export default routes;