
<template>
  <div id="main">
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  data() {
    return {
      editor: {} //实例
    };
  },
  mounted() {
    //   创建实例
    this.editor = new E("#main");
    // 配置 onchange 回调函数
    this.editor.config.onchange = newHtml => {
      //   console.log("change 之后最新的 html", newHtml);
      //自定义事件，把富文本框里输入的内容，发送给父组件
      this.$emit("sendTxt", newHtml);
    };
    // 配置触发 onchange 的时间频率，默认为 200ms
    this.editor.config.onchangeTimeout = 5000; // 修改为 500ms

    // 取消自动 focus
    this.editor.config.focus = false;
    this.editor.config.menus = [
      // 默认情况下，显示所有菜单
      "head",
      "bold",
      "fontSize",
      "fontName",
      //   "italic",
      //   "underline",
      //   "strikeThrough",
      //   "indent",
      //   "lineHeight",
      //   "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo"
    ];

    this.editor.create();
    // this.editor.txt.html('<p>用 JS 设置的内容</p>') // 重新设置编辑器内容
    // console.log(this.editor.txt.html());  //获取富文本框里的内容
    // this.editor.txt.clear() // 清空编辑器内容。
  }
};
</script>

<style lang="less" scoped>
</style>