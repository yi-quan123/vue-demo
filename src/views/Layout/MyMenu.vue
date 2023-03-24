

<template>
  <div>
    <!-- router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转	boolean 
      collapse	是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）	boolean
    -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#4a73be"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title">易购管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <!-- <span slot="title">首页</span> -->
        <span slot="title">{{$t("menu.home")}}</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-s-goods"></i>
        <!-- <span slot="title">商品管理</span> -->
        <span slot="title">{{$t('menu.goods')}}</span>
      </el-menu-item>

      <el-submenu index="/params">
        <template slot="title">
          <i class="el-icon-document"></i>
          <!-- <span slot="title">规格与包装</span> -->
          <span slot="title">{{$t('menu.params')}}</span>
        </template>
        <el-menu-item index="/params/rule">
          <i class="el-icon-document"></i>
          <span slot="title">规格管理</span>
        </el-menu-item>

        <el-menu-item index="/params/package">
          <i class="el-icon-document"></i>
          <span slot="title">包装管理</span>
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="/order">
        <i class="el-icon-s-order"></i>
        <!-- <span slot="title">订单管理</span> -->
        <span slot="title">{{$t('menu.order')}}</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <!-- <span slot="title">用户管理</span> -->
        <span slot="title">{{$t('menu.user')}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  data() {
    return {
      // isCollapse:false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;
  .el-menu-item.is-active {
    background-color: #054476 !important;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>