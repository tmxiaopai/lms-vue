<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
             class="login-container">
    <span class="tool-bar">
    </span>
      <h2 class="title" style="padding-left:22px;">系统登录</h2>
      <el-form-item prop="userNum">
        <el-input type="text" v-model="loginForm.userNum" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="captcha">
            <el-input type="test" v-model="loginForm.captcha" placeholder="验证码, 单击图片刷新"
                      style="width: 100%;">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">&nbsp;</el-col>
        <el-col :span="11">
          <el-form-item>
            <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha">
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:48%;" @click="reset">重 置</el-button>
        <el-button type="primary" style="width:48%;" @click="login" :loading="loading" :disabled="false">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        checked: true,
        loginForm: {
          userNum: '',
          password: '',
          captcha: '',
          src:'http://localhost:8005/captcha.jpg'
        },
        rules: {
          userNum: [
            {required: true, message: '请输入工号', trigger: 'blur'},
            {min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      login() {
        this.loading = true
        let userInfo = {
          userNum: this.loginForm.userNum,
          password: this.loginForm.password,
          captcha: this.loginForm.captcha
        }
        axios.post('/login', userInfo).then((res) => {
          console.log(res);
          if (res.data.msg != null) {
            this.loading = false
            this.$message({message: res.data.msg, type: 'error'})
          } else {
            this.$message("登录成功")
            Cookies.set('token', res.data.token) //设置cookie中的token
            sessionStorage.setItem('userNum', res.data.user.userNum)//保存本地内容
            sessionStorage.setItem('userName',res.data.user.userName)
            sessionStorage.setItem('userId',res.data.user.userId)
            sessionStorage.setItem('token',res.data.token)
            this.$store.commit('menuRouteLoaded',false)//重新加载导航菜单
            this.$router.push('/home')
          }
          this.loading = false
        })
      },
      reset() {
        this.$refs.loginForm.resetFields()
      },
      refreshCaptcha: function () {
        this.loginForm.src = "http://localhost:8005/captcha.jpg?t="+ + new Date().getTime()//this.global.baseUrl + "/captcha.jpg?t=" + new Date().getTime();
      }
    }
  }
</script>


<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }
</style>

