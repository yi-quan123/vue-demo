export default {
    namespaced:true,
    // state
    state:{
        userinfo:{
            token:'',
            username:''
        }
    },
    // 修改state数据的唯一方式
    mutations:{
        /**
         * 设置用户名
         * @param {*} state 
         * @param {*} payload 
         */
        setUserInfo(state,payload){
            state.userinfo=payload;
        },
        /**
         * 清空用户信息
         * @param {*} state 
         */
        clearUser(state){
            state.userinfo={
                token:'',
                username:''
            }
        }
    },
    // 异步
    actions:{
        setUserInfoAsync({commit},payload){
            setTimeout(() => {
                commit('setUserInfo',payload)
            }, 2000);
        }
    },
    // 包装数据，不修改state
    getters:{
        newName:(state)=>{
            return state.userinfo.username+',你好啊！'
        }
    },
    modules:{}
}