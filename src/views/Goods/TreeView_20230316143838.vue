<template>
  <div>
    <!-- 
          props:props	配置选项，具体看下表	object
                    label: "name",  abel	指定节点标签为节点对象的某个属性值	string, function(data, node)   
                    children: "zones",children	指定子树为节点对象的某个属性值	string
                    isLeaf: "leaf"   isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        load:  load	加载子树数据的方法，仅当 lazy 属性为true 时生效	function(node, resolve)
        lazy	是否懒加载子节点，需与 load 方法结合使用
        accordion	是否每次只打开一个同级树节点展开	boolean	—	false
        node-click	节点被点击时的回调	共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。

    -->
    <el-tree :props="props" :load="loadNode" lazy accordion @node-click='nodeClick'></el-tree>
  </div>
</template>

<script>
import { getCategory } from "@/api";
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      }
    };
  },
  methods: {
    //load	加载子树数据的方法，仅当 lazy 属性为true 时生效	function(node, resolve)
    // resolve 成功之后的回调
    async loadNode(node, resolve) {
      // console.log("load 加载了。。。", node, resolve);
      if (node.level === 0) {
        //   请求后台，渲染结构
        try {
          const res = await getCategory();
          //   console.log(res);
          return resolve(res.result);
        } catch (error) {
          console.log(error);
        }
      }

      if (node.level >= 1) {
        // 请求后台，渲染结构
        try {
          const res = await getCategory({ id: node.data.cid });
        //   console.log("------------", res);
          if (res.status == 200) {
            return resolve(res.result);
          } else {
            // {status: 500, msg: '暂无数据'}
            return resolve([]);
          }
        } catch (error) {
          console.log(error);
        }

        return resolve([]);
      }
    },
    // 节点被点击时的回调
    nodeClick(data,node,ele){
        // console.log(data,node,ele);
        // 自定义事件，告诉父组件，点击的是哪个节点  
        this.$emit('sendTreeData',data)
    }
  }
};
</script>

<style lang="less" scoped>
</style>