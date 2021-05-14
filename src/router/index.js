import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/components/HelloWorld'
// 引入
import index from '@/views/login/index'


Vue.use(Router)

export default new Router({
  routes: [
    // 登录路由
    {
      path: '/',
      name: 'index',
      component: index
    }
  ]
})
