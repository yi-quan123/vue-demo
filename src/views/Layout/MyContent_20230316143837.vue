



<template>
  <div class="wrap">
    <!-- 头部 -->
    <div class="header">
      <i v-if="isCollapse" class="iconfont icon-zhankai" @click="changeMenu"></i>
      <i v-else class="iconfont icon-zhedie" @click="changeMenu"></i>

      <div class="header-right">
        <!-- command	点击菜单项触发的事件回调	dropdown-item 的指令 -->
        <el-dropdown @command='changLang'>
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='zh'>中文</el-dropdown-item>
            <el-dropdown-item command='en'>英文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="user">
          <span>欢迎，xxxx</span>
          <i class="el-icon-switch-button" @click="loginout"></i>
        </div>
      </div>
    </div>
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  props: ["isCollapse"],
  methods: {
    ...mapMutations('LoginModule',['clearUser']),
    //
    changeMenu() {
      // 自定义事件，通知父组件修改属性
      this.$emit("changeCollapse");
    },
    // 切换语言
    changLang(command){
      // console.log(command); // zh  en
      this.$i18n.locale=command;
    },
    // 退出登录
    loginout(){
      // 第一种方式：
      // this.$store.commit('LoginModule/clearUser')
      // 第二种方式：辅助函数
      this.clearUser();
      // 清空持久化
      localStorage.removeItem('userinfo');
      // 刷新当前页面
      this.$router.go(0);
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  .header {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #1e78bf;
    .iconfont {
      font-size: 25px;
    }

    .header-right {
      float: right;
      margin-right: 20px;
      .user {
        float: right;
        margin-left: 20px;
        font-size: 16px;
        i {
          margin-left: 20px;
        }
      }
    }
  }
}

.el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 16px;
  }
</style>