<template>
  <el-container>
    <el-header>
      <div id="logo-info" @click="this.$router.push('/welcome')">电梯业务管理系统</div>
      <span>您好，{{userName}} 现在的时间为{{currentTime}}</span>
      <el-dropdown @command="handleControl">
        <span class="el-drawer-link" style="color: white">
          {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--      <el-button type="info" @click="logout">退出</el-button>-->
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse()">|||</div>
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="opened"
          :collapse="isCollapse"
          :collapse-transition="isTransition">
          <el-submenu :index="item.permissionId + ''" v-for="item in menuList" :key="item.permissionId">
            <template slot="title">
              <i :class="item.permissionIcon"></i>
              <span>{{item.permissionName}}</span>
            </template>
            <el-menu-item :index="menu.permissionId + ''" v-for="menu in item.children" :key="menu.permissionId"
                          @click="handleMenu(menu)">
              <template slot="title">
                <i :class="item.permissionIcon"></i>
                <span>{{menu.permissionName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

    <el-dialog title="用户信息"
               :visible.sync="changePf"
               width="20%"
               :before-close="handleClose1">
      <el-form :model="passwords" :rules="rules" label-width="70px">
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input type="password" placeholder="请输入旧密码" v-model="passwords.oldPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="新密码" prop="newPassword">
              <el-input type="password" placeholder="请输入新密码" v-model="passwords.newPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input type="password" placeholder="请重复输入新密码" v-model="passwords.confirmPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePf = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog title="用户信息"
               :visible.sync="dialogVisible"
               width="20%"
               ref="cu"
               :before-close="handleClose">
      <el-form :model="selectUser" label-width="40px">
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="工号" prop="userNum">
              <el-input disabled v-model="selectUser.userNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="姓名" prop="userName">
              <el-input disabled v-model="selectUser.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="手机" prop="userPhone">
              <el-input v-model="selectUser.userPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="邮箱" prop="userEmail">
              <el-input v-model="selectUser.userEmail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo">保存</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        rules: {
          oldPassword: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
            {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}
          ]
        },
        changePf: false,
        passwords: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        selectUser: {
          userNum: '',
          userName: '',
          userPhone: '',
          userEmail: ''
        },
        dialogVisible: false,
        currentTime: new Date(),
        timer: null,
        opened: true,
        isCollapse: false,
        isTransition: false,
        menuList: [],
        userName: ''
      }
    },
    created() {
      this.getMenuList()
      this.userName = sessionStorage.getItem('userName')
      const that = this;
      this.timer = setInterval(function () {
        that.currentTime = new Date()
      }, 1000)
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    mounted() {
      let userNum = sessionStorage.getItem('userNum')
      axios.post('findMyInfo', userNum).then(res => {
        this.selectUser = res.data
      })
    },
    methods: {
      handleClose1(done) {
        done()
      },
      updatePassword() {
        axios.post('updatePassword', this.passwords).then(res => {
          if (res.data == 1) {
            this.$message.success("密码保存成功！")
            this.changePf=false
          } else if (res.data == 0) {
            this.$message.error("原始密码错误！")
          }else if(res.data==2){
            this.$message.error("两次密码输入不同！")
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      updateUserInfo() {
        axios.post('updateUserInfo', this.selectUser).then(res => {
          if (res.data == 1) {
            this.dialogVisible = false
            this.$message.success("用户信息保存成功")
          } else {
            this.dialogVisible = false
            this.$message.error("保存失败")
          }
        })
      },
      handleClose(done) {
        console.log('执行逻辑')
        done()
      },
      handleControl(command) {
        if (command != 'logout') {
          if (command == 'userInfo') {
            this.dialogVisible = true
          } else {
            this.changePf = true
          }
          //this.$router.push(command)
        } else {
          this.logout()
        }
      },
      logout() {
        sessionStorage.clear()
        this.$router.push("/")
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      getMenuList() {
        axios.get('/findNavTree', {
          params: {
            userNum: sessionStorage.getItem('userNum')
          }
        }).then(res => {
          console.log(res.data);
          this.menuList = res.data
        })
      },
      handleMenu(menu) {
        this.$router.push(menu.permissionUrl)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .home-container {
    height 100%
  }

  .toggle-button {
    background-color rgb(84, 92, 100)
    font-size 10px
    line-height 24px
    text-align center
    letter-spacing 0.2em
    cursor pointer
  }

  .el-header {
    background-color: rgb(84, 92, 100);
    display: flex;
    justify-content: space-between;
    align-items center;
    color white
  }

  #logo-info {
    font-size: larger;
  }

  .el-aside {
    background-color: rgb(84, 92, 100);
    height 890px;
    width 300px

    .el-menu {
      border-right none
    }
  }

  .el-main {
    background-color: #eaeaea;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 400px;
  }

</style>
