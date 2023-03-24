
<template>
  <div>
    <!-- 
          title :标题
          visible  控制显示隐藏  
    -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">
      <!-- 表单 -->
      <!-- 2、表单 -->
      <div class="myForm">
        <el-form
          :model="goodsForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="类目选择" prop="category">
            <el-button type="primary" @click="innerVisible=true">类目选择</el-button>
            <span>{{goodsForm.category}}</span>
          </el-form-item>
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="goodsForm.title"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="goodsForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="goodsForm.num"></el-input>
          </el-form-item>

          <el-form-item label="发布时间">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="goodsForm.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" v-model="goodsForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="商品卖点" prop="sellPoint">
            <el-input v-model="goodsForm.sellPoint"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="image">
            <el-button type="primary" @click="innerVisibleImg=true">上传图片</el-button>
            <img :src="goodsForm.image" style="width:100px" alt />
          </el-form-item>

          <el-form-item label="商品描述" prop="descs">
            <!-- 富文本编辑器 -->
            <WangEditor ref="myEditor" @sendTxt="getTxt" />
          </el-form-item>

          <el-form-item label="规格参数" prop="descs" v-show="isShowParams">
            <!-- el-form ================================================ -->
            <el-form ref="dynForm" label-width="120px" class="demo-dynamic">
              <el-form-item
                v-for="(item, index) in paramInfo"
                :label="item.title"
                :key="index"
                :prop="item.value"
              >
                <div class="buttons">
                  <el-input v-model="item.value"></el-input>
                </div>

                <!-- 内层表单项 -->
                <el-form-item
                  v-for="(ele, i) in item.children"
                  :label="ele.title"
                  :key="i"
                  :prop="ele.value"
                >
                  <div class="buttons">
                    <el-input v-model="ele.value"></el-input>
                  </div>
                </el-form-item>
              </el-form-item>
            </el-form>
            <!-- el-form ================================================ -->
          </el-form-item>
        </el-form>
      </div>

      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>

        <!-- <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>-->
      </span>

      <!-- 1、内层 Dialog  ----类目选择   -->
      <el-dialog width="40%" title="类目选择" :visible.sync="innerVisible" append-to-body>
        <!-- 树形结构 -->
        <TreeView @sendTreeData="getTreeData" />
        <!-- 确定、取消 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible=false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 12、内层 Dialog  ----上传图片   -->
      <el-dialog width="40%" title="上传图片" :visible.sync="innerVisibleImg" append-to-body>
        <!-- 上传图片 -->
        <UploadImg @sengImgUrl="getImgUrl" />

        <!-- 确定、取消 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg=false">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { addGoods, updateGoods, getCategoryData } from "@/api";
import TreeView from "./TreeView.vue";
import UploadImg from "./UploadImg.vue";
import WangEditor from "./WangEditor.vue";
export default {
  //   props: ["dialogVisible"],
  props: {
    title: {
      type: String,
      default: "商品添加"
    },
    // 商品列表中，当行的数据
    rowData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  components: {
    TreeView,
    UploadImg,
    WangEditor
  },
  data() {
    return {
      // 显示隐藏 定义在子组件里， 父组件通过$ref修改dialogVisible属性
      dialogVisible: false, //外层 弹窗
      innerVisible: false, //内层弹窗  类目选择
      innerVisibleImg: false, //内层弹窗 上传图片
      treeData: {}, //tree
      isShowParams: false, //是否显示规格参数 默认隐藏
      paramInfo: [], //规格参数数组
      imgUrl: "", //图片路径
      // 表单数据对象
      goodsForm: {
        id: "", // 商品id
        cid: "", //类目id
        category: "", //类目
        title: "", //商品名称
        price: "", //价格
        num: "", //数量
        date1: "",
        date2: "",
        sellPoint: "", //商品卖点
        image: "", //图片
        descs: "" //描述
      },
      //   验证规则
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }]
      }
    };
  },
  created() {
    // console.log('------------------',this.rowData);
    // this.goodsForm=this.rowData;
  },
  // 侦听器:侦听到属性的变化之后，
  watch: {
    rowData(val) {
      // console.log('侦听到rowData 变化啦。。。。',val);
      this.goodsForm = this.rowData;
      // 单独给富文本框赋值
      // watch、computed、data、method  Object.defineproprty()  是在挂载之前，所以，此时到不到DOM 元素
      //console.log(this.$refs.myEditor);//undefined
      // 延迟操作DOM
      this.$nextTick(() => {
        this.$refs.myEditor.editor.txt.html(val.descs);
      });

      //===》两次点击同一条数据，修改商品表单，第二次没数据==》原因：侦听器没有侦听到rowData值的变化

      // 是否显示规格参数配置
      if(val.paramsInfo){
        // 显示
        this.isShowParams=true;
        this.paramInfo=JSON.parse(val.paramsInfo);
      }
    
    
    }
  },
  mounted() {},
  methods: {
    // 获取WangEditor 传递过来的数据
    getTxt(txt) {
      this.goodsForm.descs = txt;
    },
    // 点击确定，关闭上传图片弹窗，展示图片
    showImg() {
      // 关闭上传图片弹窗
      this.innerVisibleImg = false;
      // 展示图片
      this.goodsForm.image = this.imgUrl;
    },
    // 监听子组件传递过来的图片路径
    getImgUrl(url) {
      this.imgUrl = url;
    },
    // 监听子组件传递过来的数据，选择的是哪个节点
    getTreeData(val) {
      // console.log(val);
      this.treeData = val;
    },
    // 展示点击的tree节点
    async showTreeData() {
      //1、隐藏内弹窗
      this.innerVisible = false;
      // 展示 类目  {id:'',cid:'',name:''}
      this.goodsForm.category = this.treeData.name;
      this.goodsForm.cid = this.treeData.cid;

      // 是否显示规格参数，请求后台
      try {
        const res = await getCategoryData({ cid: this.treeData.cid });
        console.log(res);
        if (res.status === 200) {
          // 显示规格参数
          this.isShowParams = true;
          let info = res.result[res.result.length - 1];
          // console.log(info);
          this.paramInfo = JSON.parse(info.paramData);
          console.log(this.paramInfo);
        } else {
          // 没有配置，隐藏
          this.isShowParams = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          // 重置表单
          this.resetForm();
        })
        .catch(_ => {});
    },
    // 关闭
    close() {
      // 自定义事件，通知父组件修改属性
      this.$emit("close");
    },
    /**
     * 提交表单
     * 参数： title cid  category sellPoint price num descs paramsInfo image
     */
    submitForm() {
      // 商品添加
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          // 对象合并  let obj1 = Object.assign(obj1, obj2);
          Object.assign(this.goodsForm, {
            paramsInfo: JSON.stringify(this.paramInfo)
          });
          console.log(this.goodsForm); //{cid:'',}   goodsForm   paramInfo

          if (this.title === "商品添加") {
            // 添加数据
            try {
              const res = await addGoods(this.goodsForm);
              // console.log(res);
              if (res.status === 200) {
                // 1、 成功提醒
                this.$message({
                  type: "success",
                  message: "恭喜你，添加商品成功！"
                });

                // 3、刷新 ，重新加载第一页数据
                this.$parent.getGoods(1);
                // 重置表单
                this.resetForm();
              } else {
                //  失败
                this.$message.error("错了哦，这是一条错误消息");
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            // 商品编辑  多一个 id
            console.log("商品编辑");
            try {
              const res = await updateGoods(this.goodsForm);
              console.log(res);
              if (res.status === 200) {
                // 修改成功了
                // 1、 成功提醒
                this.$message({
                  type: "success",
                  message: "恭喜你，修改商品成功！"
                });

                // 3、刷新 ，重新加载第一页数据
                this.$parent.getGoods(1);
                // 重置表单
                this.resetForm();
              } else {
                // 修改失败了
                this.$message.error("错了哦，这是一条错误消息");
              }
            } catch (error) {
              console.log(error);
            }
          }
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      // 2、关闭弹窗
      this.dialogVisible = false;
      //4、清空表单
      this.goodsForm = {
        cid: "", //类目id
        category: "", //类目
        title: "", //商品名称
        price: "", //价格
        num: "", //数量
        date1: "",
        date2: "",
        sellPoint: "", //商品卖点
        image: "", //图片
        descs: "" //描述
      };
      // 单独处理富文本框的清空
      // console.log(this.$refs.myEditor);
      this.$refs.myEditor.editor.txt.clear(); // 清空编辑器内容。
      //清空规格参数
      this.paramInfo=[];
      this.isShowParams=false;
    }
  }
};
</script>

<style lang="less" scoped>
// .myForm {
//   margin: 30px 0;
//   padding: 10px;
// }
</style>