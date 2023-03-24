import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout/Layout.vue'
import Login from '@/views/Login/Login.vue'
import Home from '@/views/Home/Home.vue'
const Goods = () => import('@/views/Goods/Goods.vue')
const AddGoods = () => import('@/views/Goods/AddGoods.vue')
const Params = () => import('@/views/Params/Params.vue')
const Order = () => import('@/views/Order/Order.vue')
const User = () => import('@/views/User/User.vue')

const Rule = () => import('@/views/Params/Rule.vue')
const Package = () => import('@/views/Params/Package.vue')


//我是测试的注释
Vue.use(VueRouter)

const routes = [{
    path: '',
    component: Layout,
    // 路由元信息，配置给父路由，就回拦截下面的路由组件
    meta: {
      isLogin: true
    },
    children: [{
      path: '/',
      component: Home,
    }, {
      path: '/goods',
      component: Goods,
    },{
      path: '/add-goods',
      component: AddGoods,
    }, {
      path: '/params',
      component: Params,
      redirect: '/params/rule',
      children: [{
        path: 'rule',
        component: Rule,
      }, {
        path: 'package',
        component: Package,
      }]
    }, {
      path: '/order',
      component: Order,
    }, {
      path: '/user',
      component: User,
    }]
  }, {
    path: '/login',
    component: Login
  }

]

const router = new VueRouter({
  routes
})

export default router