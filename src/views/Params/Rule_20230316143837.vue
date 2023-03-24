
<template>
  <div class="params">
    <!-- 1、面包屑 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/params' }">规格与包装</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 2、搜索 -->
    <div class="search">
      <el-input placeholder="请输入搜索内容"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>

    <!-- 3、表格 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="规格参数ID" width="100"></el-table-column>
        <el-table-column prop="itemCatId" label="类目ID" width="100"></el-table-column>
        <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 4、分页 -->
    <MyPagination :total="total" :pageSize="pageSize" @changePage="getParamsByPage" />

    <!-- 5、弹窗 -->
    <ParamsDialog ref="dialog" />
  </div>
</template>

<script>
import { getParamsList } from "@/api";
import MyPagination from "@/components/MyPagination.vue";
import ParamsDialog from "./ParamsDialog.vue";
export default {
  components: {
    MyPagination,
    ParamsDialog
  },
  data() {
    return {
      tableData: [],
      total: 10, //总条目数
      pageSize: 1 //一页显示大小
    };
  },
  created() {
    this.getParamsByPage(1);
  },
  methods: {
    /**
     *规格参数列表  参数 page
     */
    async getParamsByPage(page) {
      try {
        const res = await getParamsList({ page });
        // console.log(res);
        if (res.status === 200) {
          this.tableData = res.data;
          this.total = res.total;
          this.pageSize = res.pageSize;
        } else {
          // 无数据处理
          this.tableData = [];
          this.total = 1;
          this.pageSize = 1;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // getPage(page) {
    //   console.log(page);
    // },
    /**
     * 显示弹窗
     */
    showDialog() {
      this.$refs.dialog.dialogVisible = true; //显示
    },
    
  }
};
</script>

<style lang="less" scoped>
.params {
  padding: 10px;
  .nav {
    padding: 7px;
    background-color: #fff;
    margin: 10px 0;
  }
  .search {
    display: flex;
    input {
      flex: 1;
    }
    button {
      margin-left: 10px;
    }
  }
  .table {
    padding: 20px 0;
  }
}
</style>