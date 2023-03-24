<template>
  <div class="user">
    <el-button type="primary" @click="viewPDF">查看合同</el-button>
    <ViewPDF ref="pdf"/>
    <hr />
    <div class="table">
      <h2>用户管理</h2>
      <el-button type="primary" @click="exportTable">导出表格</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

  <script>
import { export2Excel } from "../../common/js/util";
import ViewPDF from "./ViewPDF.vue";
export default {
  components: {
    ViewPDF
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      //   表头

      columns: [
        {
          title: "日期",
          key: "date"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "地址",
          key: "address"
        }
      ]
    };
  },
  methods: {
    viewPDF() {
        this.$refs.pdf.dialogVisible=true;
    },
    //   导出表格
    exportTable() {
      export2Excel(this.columns, this.tableData, "用户信息表格");
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  padding: 20px;
  h2 {
    text-align: center;
    margin: 20px;
  }
}
</style>