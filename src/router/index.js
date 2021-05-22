import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../views/Login";
import Home from "../views/Home";
import EmptyRoom from "../views/common/EmptyRoom.vue"
import Register from "../views/Register";
import OrderPage from "../views/h_order/OrderPage";
import TypeStatistics from "../views/search/TypeStatistics";
import CheckIn from "../views/registerRecord/CheckIn";
import CheckOut from "../views/registerRecord/CheckOut";
import RoomManage from "../views/common/RoomManage";
import OrderManage from "../views/common/orderManage.vue"




Vue.use(VueRouter);

// const routes = [
//
// ]

const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path:'/login',
      component: Login,
      name: 'Login'
    },
    {
      path: '/',
      redirect: RoomManage,
    },
    {
      path: '/home',
      component:Home,
      name:'Home',
    },
    {
      path: '/emptyroom',
      component: EmptyRoom,
      name: 'EmptyRoom'
    },
    {
      path: '/register',
      component: Register,
      name: 'Register',
    },
    {
      path:'/orderPage',
      component: OrderPage,
      name: 'OrderPage'
    },
    {
      path:'/orderManage',
      component: OrderManage,
      name: 'OrderManage'
    },
    {
      path:'/typeStatistics',
      component: TypeStatistics,
      name: 'TypeStatistics'
    },
    {
      path:'/checkIn',
      component: CheckIn,
      name: 'CheckIn'
    },
    {
      path:'/checkOut',
      component: CheckOut,
      name: 'CheckOut'
    },
    {
      path:'/roomManage',
      component: RoomManage,
      name: 'RoomManage'
    },


  ]
});

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to将要访问的路径
  //from从哪个路径跳转
  //next()放行   , next('/login')强制跳转
  if(to.path === '/login') return next();
  else if (to.path === '/register') return next();
  // else if (to.path === '/orderPage') return next();
  // else if (to.path === '/checkIn') return next();
  // else if (to.path === '/checkOut') return next();
  // else if (to.path === '/typeStatistics') return next();
  //获取token
  let tokenStr = window.sessionStorage.getItem('token');
  // if(!tokenStr) return next('/login');
  next();

});

export default router
