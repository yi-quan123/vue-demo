import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 路由拦截
import './router/permision'


import store from './store'
// 导出 语言配置
import i18n  from './lang/index'
import './plugins/element.js'
// 引入初始化样式
import '@/assets/css/reset.css'

Vue.config.productionTip = false

// 本地存储 读取登录信息
let userinfo=localStorage.getItem('userinfo');
if(userinfo){
  let obj=JSON.parse(userinfo);
  // 本地存储有用户信息，存到vuex
  store.commit("LoginModule/setUserInfo", obj);
}



new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
