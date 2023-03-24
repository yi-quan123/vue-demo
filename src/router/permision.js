import Router from './index'
import store  from '@/store/index'

// 路由拦截
Router.beforeEach((to, from, next) => {
    // let isLogin = to.meta.isLogin; //是否有登录信息
    // matched 父路由和当前路由组成的数组,  遍历父级所有路由，符合条件的返回true
    let isLogin=to.matched.some(item=>item.meta.isLogin);
    if(isLogin){
        // 需要登录才可以进入==>判断用户此时是否已经登录
        let token=store.state.LoginModule.userinfo.token;
        if(token){
            // 已经登录了
            next();
        }else{
            next('/login')
        }

    }else{
        // 不需要登录
        next();
    }

})