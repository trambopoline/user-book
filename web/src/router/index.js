import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import BookDetail from "@/components/BookDetail";
import Books from "@/components/Books";


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/user",
      alias: '/',
      name: "Dashboard",
      component: Dashboard,
      meta: { title: "Home" },
      children: [
        {
          path: "book/:id",
          name: "Book",
          component: BookDetail,
          props: true
        }
      ]
    },
    // {
    //   path: "/user/:id",
    //   name: "User",
    //   component: Users
    // },
    {
      path: "/book",
      name: "Books",
      component: Books,
      props: true
    }
  ]
});
