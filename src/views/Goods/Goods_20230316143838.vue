

<template>
  <div class="goods">
    <!-- 1、头部区域 -->
    <div class="header">
      <!-- 搜索 -->
      <!-- change	仅在输入框失去焦点或用户按下回车时触发 -->
      <el-input v-model="keyword" placeholder="请输入搜索内容" @change="toSearch"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="addGoods">页面添加</el-button>
      <el-button type="primary" @click="addDialog">弹窗添加</el-button>
    </div>

    <!-- 2、表格展示 -->
    <!-- prop	对应列内容的字段名，也可以使用 property 属性	string -->
    <div class="wrap">
      <el-table :data="goodsData" border style="width: 100%">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="70"></el-table-column>
        <el-table-column prop="title" label="商品名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="商品价格" width="100"></el-table-column>
        <el-table-column prop="num" label="商品数量" width="100"></el-table-column>
        <el-table-column prop="category" label="规格类目" width="100"></el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="商品操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              <!-- 编辑 -->
              {{$t("content.edit")}}
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 3、分页 -->
    <MyPagination
      :total="total"
      :pageSize="pageSize"
      @changePage="getPageNum"
      :currentPage="currentPage"
    />

    <!-- 4、弹窗 -->
    <GoodsDialog ref="dialog" :title="title" :rowData="rowData" />

    <!-- <GoodsDialog ref="dialog" :dialogVisible="dialogVisible" @close="changeVisible" /> -->
  </div>
</template>
<script>
import { getGoodsList, getSearch, delGoods } from "@/api";
import MyPagination from "@/components/MyPagination.vue";
import GoodsDialog from "./GoodsDialog.vue";
export default {
  components: {
    MyPagination,
    GoodsDialog
  },
  created() {
    this.getGoods(1);
  },
  data() {
    return {
      keyword: "",
      goodsData: [], //表格数据
      total: 1, //总条目数
      pageSize: 1, //每页显示的条目数
      type: 1, //分页类型 1 所有商品分页  2：搜索出来的商品分页
      searchList: [], //存搜索出来的数组，假设是上千条
      currentPage: 1, //当前高亮页码
      // dialogVisible: false //显示隐藏 定义在父组件里，
      title: "商品添加",
      rowData: {} //列表中一行的数据对象
    };
  },
  methods: {
    // 去搜索
    async toSearch() {
      this.currentPage = 1; //让第一页页码高亮
      // 不输入内容，搜索情况
      if (!this.keyword) {
        // 列表的第一页数据
        this.getGoods(1);
        return;
      }
      try {
        const res = await getSearch({ search: this.keyword });
        // console.log(res);
        // {status: 500, msg: '暂无数据'}
        if (res.status == 200 && res.result.length != 0) {
          this.searchList = res.result; //拿到数据之后，保存
          // this.goodsData=res.result;
          // 前端自己模拟分页  []=====》数组切割  slice(0,3)  0,1,2, 3,4,5, 6,7,8, 9
          this.goodsData = res.result.slice(0, 3); //显示前三条
          this.total = res.result.length; //总数据条目数
          this.pageSize = 3; //每页显示3条
          this.type = 2; //设置为搜索分页
        } else {
          // 无数据处理
          this.goodsData = [];
          this.total = 1;
          this.pageSize = 1;
          this.type = 1;
        }
      } catch (error) {
        // 无数据处理
        this.goodsData = [];
        this.total = 1;
        this.pageSize = 1;
        this.type = 1;
        console.log(error);
      }
    },
    // 去添加
    addGoods() {
      this.$router.push("/add-goods");
    },

    // 父组件监听到子组件发送过来的自定义事件close,父组件自己修改属性
    // changeVisible() {
    //   this.dialogVisible = false;
    // },
    // 加载商品列表
    getGoods(page) {
      getGoodsList({ page })
        .then(res => {
          console.log(res);
          this.goodsData = res.data;
          this.total = res.total;
          this.pageSize = res.pageSize;
          this.type = 1;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 父组件监听子组件传递过来的页码
    async getPageNum(page) {
      // 让点击的页码高亮
      this.currentPage = page;

      if (this.type == 1) {
        this.getGoods(page); //所有商品分页
      } else {
        // 搜索商品分页
        console.log("搜索商品分页");
        // 数组切割  slice(0,3)  0,1,2, 3,4,5, 6,7,8,9     1(0,3)   2(3,6)   3(7,9)  pageSize 3
        // ((page-1)*3  page
        this.goodsData = this.searchList.slice((page - 1) * 3, page * 3);
      }
    },
    // 弹窗添加功能
    addDialog() {
      // 方式一：$ref 直接操作DOM
      this.$refs.dialog.dialogVisible = true;
      this.title = "商品添加";
      // this.dialogVisible = true;
    },
    /**
     * 编辑
     * 1、点编辑，显示弹框
     * 2、弹框回显当行的数据
     */
    handleEdit(index, row) {
      // console.log(index, row);
      this.$refs.dialog.dialogVisible = true;
      this.title = "商品编辑";
      // 方法一：获取DOM 元素，直接给子组件属性赋值
      // this.$refs.dialog.goodsForm=row;

      // 原因： 两次点击同一条数据，row 没变，row 对象类型，地址，
      this.rowData = { ...row };
    },
    /**
     * 删除
     */
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // =====================
          try {
            const res = await delGoods({ id: row.id });
            console.log(res);
            if (res.status === 200) {
              // 删除成功
              // 1、视图更新
              this.getGoods(1);
              // 2、成功提醒
              this.$message({
                type: "success",
                message: "删除成功"
              });
            } else {
              // 删除失败
              this.$message.error("错了哦，这是一条错误消息");
            }
          } catch (error) {
            console.log(error);
          }

          // =================================
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  padding: 20px;
  .header {
    display: flex;
    input {
      flex: 1;
    }
    button {
      margin-left: 20px;
    }
  }
  .wrap {
    padding: 20px 0;
  }
}
</style>