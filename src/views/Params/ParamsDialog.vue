<template>
  <div>
    <el-dialog title="添加规格参数" :visible.sync="dialogVisible" width="50%">
      <!-- TreeView -->
      <TreeView @sendTreeData="getTreeData" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="isDisabled" @click="innerVisible = true">确定并添加分组</el-button>
      </span>

      <!-- 内层弹窗 start-->
      <el-dialog width="45%" title="商品规格参数配置" :visible.sync="innerVisible" append-to-body :before-close="closeInner">
        <div class="title">当前选中的商品：{{treeData.name}}</div>
        <el-button @click="addDomain">新增规格列表</el-button>

        <hr />

        <!-- [{title:'',value:'',children:[title:'',value:'']},{}] -->
        <el-form :model="dyForm" ref="dynForm" label-width="120px" class="demo-dynamic" >
          <el-form-item
            v-for="(domain, index) in dyForm.domains"
            :label="domain.title"
            :key="index"
            :prop="domain.title"
            :rules="{
      required: true, message: '不能为空', trigger: 'blur'
    }"
          >
            <div class="buttons">
              <el-input v-model="domain.title"></el-input>
              <el-button @click.prevent="addChildDomain(index)">添加子项</el-button>
              <el-button @click.prevent="removeDomain(index)">删除</el-button>
            </div>

            <!-- 内层表单项 -->
            <el-form-item
              v-for="(item, i) in domain.children"
              :label="item.title"
              :key="i"
              :prop="item.title"
              
            >
              <div class="buttons">
                <el-input v-model="item.title"></el-input>
                <el-button @click.prevent="removeChildDomain(index,i)">删除子项</el-button>
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="closeInner">取 消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </el-dialog>
      <!-- 内层弹窗 end-->
    </el-dialog>
  </div>
</template>

<script>
import TreeView from "@/views/Goods/TreeView.vue";
import { addParams } from "@/api";
export default {
  components: {
    TreeView
  },
  data() {
    return {
      dialogVisible: false, //外弹窗
      innerVisible: false, //内弹窗
      isDisabled: true, //默认不可点击状态，点过节点之后，才可以点击
      treeData: {}, //节点对象
      dyForm: {
        domains: []
      }
    };
  },
  methods: {
    /**
     * 监听TreeView 点击的节点，并且获取数据
     */
    getTreeData(data) {
      console.log(data);
      this.isDisabled = false; //【确定并添加分组】变成可点击
      this.treeData = data; //保存
    },
    /**
     * 提交表单
     */
    submitForm(formName) {
      this.$refs.dynForm.validate(async valid => {
        if (valid) {
          try {
            // itemCatId  类目ID,content,specsName
            const res = await addParams({
              itemCatId: this.treeData.cid,
              content: JSON.stringify(this.dyForm.domains),
              specsName: this.treeData.name
            });
            console.log(res);
            if (res.status === 200) {
              // 1、友好提醒
              this.$message.success("添加成功！");
              // 2、关闭内外弹窗
              this.dialogVisible = false;
              this.innerVisible = false;
              // 3、清空
              this.dyForm.domains = [];
              // 4、刷新规格参数列表数据
              this.$parent.getParamsByPage(1);
            } else {
              this.$message.error("添加成功！");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("添加失败!!");
          return false;
        }
      });
    },
    
    /**
     * 取消表单提交
     */
    closeInner() {
      this.innerVisible = false;
      this.dyForm.domains = [];
    },
    // 重置
    resetForm() {
      this.$refs.dynForm.resetFields();
    },
    /**
     * 添加子项
     * index:下标，往第几个domains对象上添加
     */
    addChildDomain(index) {
      this.dyForm.domains[index].children.push({ title: "", value: "" });
    },
    /**
     * 删除子项
     * index:父亲的下标
     * i:要删除的下标
     */
    removeChildDomain(index, i) {
      this.dyForm.domains[index].children.splice(i, 1);
    },
    /**
     * 删除父项及子项
     */
    removeDomain(index) {
      this.dyForm.domains.splice(index, 1);
    },
    /**
     * 新增
     */
    addDomain() {
      this.dyForm.domains.push({
        title: "",
        value: "",
        children: []
      });
    }
  }
};
</script>

<style lang="less" scoped>
hr {
  margin: 10px 0;
}
.buttons {
  display: flex;
  input {
    flex: 1;
  }
  button {
    margin-left: 7px;
  }
}
</style>