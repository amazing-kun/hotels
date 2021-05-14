import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/Login";
import Home from "../views/Home";

Vue.use(VueRouter);

// const routes = [
//
// ]

const router = new VueRouter({
  routes:[
    {
      path:'/login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/',
      redirect:Home
    },
    {
      path: '/home',
      component:Home,
      name:'Home',
    }
  ]
});

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to将要访问的路径
  //from从哪个路径跳转
  //next()放行   , next('/login')强制跳转
  if(to.path === '/login') return next();
  //获取token
  let tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();

});

export default router
