import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Books from '@/components/Books'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/:content?",
      name: "Dashboard",
      component: Dashboard,
      meta: {title: 'Home'},
    },
    // {
    //   path: "/user/:id",
    //   name: "User",
    //   component: Users
    // },
    {
      path: "/book/:id",
      name: "Book",
      component: Books,
      props: true
    }
  ]
});
