


<template>
  <!-- 
    action: action	必选参数，上传的地址	string
    on-preview	点击文件列表中已上传的文件时的钩子	function(file)
    on-remove	文件列表移除文件时的钩子	function(file, fileList)
    file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array
    auto-upload	是否在选取文件后立即进行上传


    on-success	文件上传成功时的钩子	function(response, file, fileList)	
  -->
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="onSuccess"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </el-upload>
</template>

<script>
import base from "@/api/base.js";
export default {
  data() {
    return {
      url: base.uploadUrl, // 存储图片的地址   /upload
      fileList: []
    };
  },
  methods: {
    // 文件上传成功时的钩子
    onSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.$message({
        message: "上传图片成功！",
        type: "success"
      });
      //   url: "upload\\1653289820586-无标题.png"  http://localhost:7878/1653289820586-无标题.png
      let url = base.host + "/" + response.url.slice(7);
      //自定义事件，向父组件传递图片路径
      this.$emit("sengImgUrl", url);
    },
    // 上传到服务器
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

<style lang="less" scoped>
</style>