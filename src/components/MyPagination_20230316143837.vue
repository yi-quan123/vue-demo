


<template>
  <div class="pagination">
    <!-- current-change	currentPage 改变时会触发 -->
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :total="total"
      :pageSize="pageSize"
      @current-change="change"
      :current-page="currentPage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 10
    },
    pageSize: {
      type: Number,
      default: 1
    },
    currentPage:{
      type:Number,
      default:1
    }
  },
  methods: {
    change(num) {
      // 自定义事件
      this.$emit("changePage", num);
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  padding: 30px auto;
}
</style>