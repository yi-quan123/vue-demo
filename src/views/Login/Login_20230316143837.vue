<template>
  <div class="contaner">
    <div class="login">
      <div class="logo">
        <img src="../../assets/logo.png" height="120px" alt />
      </div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api";
import jwt from "jwt-decode"; //解密
import { mapMutations } from "vuex";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        // 不往外抛错
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据对象
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations("LoginModule", ["setUserInfo"]),

    // 提交表单 ，登录
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          console.log(this.loginForm);
          //调用后台登录接口
          try {
            const res = await login(this.loginForm);
            console.log(res);
            // 解密token
            let obj = {
              username: jwt(res.data).username,
              token: res.data
            };

            // 1、存用户信息  vuex
            // 第一种方式：
            // this.$store.commit("LoginModule/setUserInfo", obj);
            // 第二种方式：
            this.setUserInfo(obj);
            // 2、数据持久化
            localStorage.setItem("userinfo", JSON.stringify(obj));
            // 3、友好提醒
            this.$message({
              type: "success",
              message: "登录成功！"
            });
            // 4、路由跳转到首页
            this.$router.push("/");
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("校验失败");
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.contaner {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #104468;
  .login {
    width: 400px;
    height: 260px;
    padding: 30px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    margin: 0 auto;
    margin-top: 200px;
    margin-left: -200px;
    .logo {
      position: absolute;
      width: 120px;
      height: 120px;
      background: #f5f5f5;
      border-radius: 50%;
      overflow: hidden;
      top: -80px;
      left: 50%;
      margin-left: -60px;
      padding: 8px;
      img {
        border-radius: 50%;
        background: #fff;
      }
    }
  }
}
.el-form {
  margin-top: 60px;
}
.el-form-item--feedback {
  margin-bottom: 33px;
  text-align: center;
}
.el-button {
  margin-right: 10px;
}
</style>