


<template>
  <div>
    <el-dialog title="查看合同" :visible.sync="dialogVisible" width="50%">
      <span slot="footer" class="dialog-footer">
        <!-- 
                page：显示的页码
                :rotate 选择  90的倍数
                pageCount： 总页数
                currentPage：当前页

        -->
        <!-- 使用 -->

        <!-- 第一种方式:单页加载 -->
        <el-button type="primary" @click="changePage(0)">上一页</el-button>
        <el-button type="primary" @click="changePage(1)">下一页</el-button>
        <el-button type="primary" @click='$refs.myPDF.print()'>打印合同</el-button>
        {{currentPage}} / {{pageCount}}
        <hr />
        <pdf
          ref='myPDF'
          src="./sxt.pdf"
          :page="num"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
        ></pdf>

        <!-- 第二种方式：预览效果 -->
        <!-- <pdf
          v-for="i in numPages"
          :key="i"
          :src="src"
          :page="i"
          style="display: inline-block; width: 25%"
        ></pdf> -->

        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pdf from "vue-pdf";
var loadingTask = pdf.createLoadingTask(
  "./sxt.pdf"
);
export default {
  components: {
    pdf
  },
  data() {
    return {
      dialogVisible: false,
      currentPage: 0,
      pageCount: 0,
      num: 1, //页码
      src: loadingTask,
      numPages: undefined,  //总页码
    };
  },
  mounted() {
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages;
    });
  },
  methods: {
    changePage(flag) {
      // 上一页
      if (flag === 0 && this.currentPage > 1) {
        this.num--;
      }
      // 下一页
      if (flag === 1 && this.currentPage < this.pageCount) {
        this.num++;
      }
    }
  }
};
</script>

<style lang="less" scoped>
hr {
  margin: 20px;
}
</style>