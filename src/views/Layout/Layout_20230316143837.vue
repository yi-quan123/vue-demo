

<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <MyMenu class="menu" :isCollapse='isCollapse'/>

    <!-- 右侧内容 -->
    <MyContent class="content" :class="{active:isCollapse}" @changeCollapse='changeMenu' :isCollapse='isCollapse'/>
  </div>
</template>

<script>
import MyMenu from "./MyMenu.vue";
import MyContent from "./MyContent.vue";

export default {
  components: {
    MyMenu,
    MyContent
  },
  data() {
    return {
      isCollapse:false
    }
  },
  methods: {
    // 父组件监听自定义事件
    changeMenu(){
      this.isCollapse=!this.isCollapse;
    }
  },
};
</script>

<style lang="less" scoped>
.layout{
    // display: flex;
    .menu{
        position: fixed;
        top: 0;
        bottom: 0;
        // width: 200px;
        background-color: #4a73be;
    }
    .content{
        // flex: 1;
        margin-left: 200px;
        height: 1000px;
        // background-color: pink;
        transition: all .3s;
    }

    .active{
      margin-left: 64px;
    }
}
</style>