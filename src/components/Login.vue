<template>
  <div class="login_container">
    <!--背景-->
    <div class="background">
      <img src="../assets/img/miku02.jpg" alt />
    </div>
    <!-- 登录 -->
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/img/miku01.jpg" alt />
      </div>
      <!--表单区域-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_form" label-width="0px">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="账号" prefix-icon="iconfont icon-yonghu"></el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input v-model="loginForm.passwd" placeholder="密码" type="password" prefix-icon="iconfont icon-mima"
            suffix-icon="iconfont icon-yanjing_yincang"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      loginForm: {
        userName: "admin",
        passwd: "12345",
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 12, message: "密码为 5 ~ 12 位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //重置表单内容
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      //this.$router.push({ path: "/home" });// 页面路由跳转
      console.log(this.loginForm.userName);
      console.log(this.loginForm.passwd);
      this.$refs.loginFormRef.validate(async valid => {

        if (!valid) return;//验证失败则结束
        // 访问后台
        const loginUrl = 'http://localhost:9000/user/login';

        const formData = new FormData();
        formData.append('userName', this.loginForm.userName);
        formData.append('passwd', this.loginForm.passwd);

        fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // or 'application/json' depending on your server implementation
          },
          body: new URLSearchParams(formData),
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response data here
            this.$router.push({ path: "/home" });// 页面路由跳转
            console.log(data);
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error);
          });

          /*
        const { data: res } = await this.$http.post("user/login", this.loginForm.userName, this.loginForm.passwd);

        if (res.resultCode == 200) {
          this.$message.success("登陆成功！");

          window.sessionStorage.setItem("user", res.data.list);//存储user对象
          console.log(res.user);

          this.$router.push({ path: "/home" });// 页面路由跳转
        } else {
          console.log(res.user);
          this.$message.error("登录失败！");
        }
*/
      });

    }
  }
};
</script>
  
<style lang="less" scoped>
// 根节点样式
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    // 头像
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #0ee;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .btns {
    display: flex; // 弹性布局
    //justify-content: flex-end; // 尾部对齐
    justify-content: center;
  }

  .login_form {
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box; // 设置边框
  }

  .background {
    width: 100%; //大小设置为100%
    height: 100%; //大小设置为100%
    position: fixed;
    background-size: 100% 100%;
  }

}
</style>