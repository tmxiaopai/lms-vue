<template>
  <div>

    <div class="page-title">
      <el-page-header @back="backGo" content="用户列表"></el-page-header>
    </div>

    <el-divider></el-divider>
    <el-form ref="sl" :model="selectUser" label-width="70px">
      <el-row :gutter="20">
        <el-col :sm="5">
          <el-form-item label="工号">
            <el-input clearable @blur="searchUser" @keyup.enter.native="searchUser" style="width: 200px" v-model="selectUser1.userNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="5">
          <el-form-item label="姓名">
            <el-input clearable @blur="searchUser" @keyup.enter.native="searchUser"  style="width: 200px" v-model="selectUser1.userName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="users" height="650" border>
      <el-table-column label="序号" type="index" width="50" fixed></el-table-column>
      <el-table-column label="工号" prop="userNum" fixed sortable></el-table-column>
      <el-table-column label="员工名" prop="userName" fixed sortable></el-table-column>
      <el-table-column label="手机" prop="userPhone"></el-table-column>
      <el-table-column label="邮箱" prop="userEmail"></el-table-column>
      <el-table-column label="身份" prop="roleName"></el-table-column>
      <el-table-column label="最后登录时间" prop="userLastLoginTime" sortable>
        <template slot-scope="scope">{{scope.row.userLastLoginTime|dateFormat}}</template>
      </el-table-column>
      <!--      <el-table-column label="用户状态" prop="userStatus"></el-table-column>-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="EditUser(scope.$index,scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="DeleteUser(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="create-btn">
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button type="info" @click="saveUser">新建用户</el-button>
        </el-col>

      </el-row>
    </div>


    <el-drawer
      title="新建用户"
      :before-close="saveClose"
      :visible="saveF"
      direction="ltr"
      ref="SaveD">
      <div class="drawer-body">
        <el-form ref="saveForm" :rules="rules" :model="selectUser">
          <el-form-item label="工号" prop="userNum">
            <el-input v-model.number="selectUser.userNum"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="selectUser.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPassword">
            <el-input type="password" v-model="selectUser.userPassword"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="userPhone">
            <el-input v-model="selectUser.userPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input v-model="selectUser.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="角色设置" prop="roleName">
            <el-select v-model="selectUser.roleName" placeholder="请选择用户角色">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="销售人员" value="2"></el-option>
              <el-option label="客服人员" value="3"></el-option>
              <el-option label="维保人员" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancelSave">取消</el-button>
            <el-button @click="$refs.SaveD.closeDrawer()" type="primary" :loading="loadingS">{{loadingS === true ?
              "提交中..." : "保存"}}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <el-drawer
      title="修改用户"
      :before-close="updateClose"
      :visible="updateF"
      direction="rtl"
      ref="UpdateD">
      <div class="drawer-body">
        <el-form ref="saveForm" :rules="rules" :model="selectUser">
          <el-form-item label="工号">
            <el-input disabled v-model.number="selectUser.userNum"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input disabled v-model="selectUser.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPassword1">
            <el-input type="password" show-password v-model="selectUser.userPassword"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="userPhone">
            <el-input v-model="selectUser.userPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input v-model="selectUser.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="角色设置" prop="roleName">
            <el-select v-model="selectUser.roleName" placeholder="请选择用户角色">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="销售人员" value="2"></el-option>
              <el-option label="客服人员" value="3"></el-option>
              <el-option label="维保人员" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancelUpdate">取消</el-button>
            <el-button @click="$refs.UpdateD.closeDrawer()" type="primary" :loading="loadingU">{{loadingU === true ?
              "提交中..." : "保存"}}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

  </div>
</template>

<script>
  export default {
    name: "UserList",
    data() {
      return {
        saveF: false,
        updateF: false,
        loadingS: false,
        loadingU: false,
        timerS: null,
        timerU: null,
        roleId: '',
        users: [],
        selectUser1: {
          userName: '',
          userNum: ''
        },
        selectUser: {
          userId: '',
          userNum: '',
          userName: '',
          userPassword: '',
          userSalt: '',
          userPhone: '',
          userEmail: '',
          userCreateTime: '',
          userLastLoginTime: '',
          userUpdateTime: '',
          userStatus: '',
          roleName: ''
        },
        rules: {
          userName: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          userNum: [
            {required: true, message: '工号不能为空', trigger: 'blur'},
            {type: 'number', message: '工号为数字', trigger: 'blur'}
          ],
          userPassword: [
            {required: true, message: '密码不为空', trigger: 'blur'},
            {min: 6, max: 10, message: '长度为6-10位', trigger: 'blur'}
          ],
          userPassword1: [
            {min: 6, max: 10, message: '长度为6-10位', trigger: 'blur'}
          ],
          userPhone: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {min: 11, max: 11, message: '长度不符', trigger: 'blur'}
          ],
          userEmail: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          roleName: [
            {required: true, message: '请选择角色', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      backGo() {
        this.$router.go(-1)
      },
      searchUser() {
        axios.post('searchUser', this.selectUser1).then(res => {
          this.users = res.data;
          this.$message.success('查询成功')
        })
        this.$refs.sl.resetFields()
      },
      refreshUserList() {
        axios({
          method: 'get',
          url: 'findAllUserInfo',
        }).then(res => {
          this.users = res.data;
          console.log(res.data);
        })
      },
      saveUser: function () {
        this.saveF = true
      },
      EditUser(index, row) {
        this.selectUser = row;
        this.updateF = true
      },
      DeleteUser(index, row) {
        this.selectUser = row;
        this.$confirm('此操作将删除该记录，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('deleteUser', this.selectUser.userNum).then(res => {
            this.users.splice(index, 1);
            this.$message({
              type: "success",
              message: res.data
            })
          }).catch(_ => {
            this.$message({
              type: "error",
              message: '删除失败'
            })
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: '已取消删除'
          })
        })
      },
      saveClose(done) {
        console.log(this.selectUser.roleName);
        if (this.loadingS) {
          return;
        }
        this.$confirm('确定提交表单吗？', '提示').then(_ => {
          this.loadingS = true;
          let saveMes = null;
          axios.post('insertUser', this.selectUser).then(res => {
            saveMes = res.data;
            this.$message({
              type: "success",
              message: saveMes
            });
            this.refreshUserList()
            this.$refs.saveForm.resetFields()
          });
          this.loadingS = false;
          this.saveF = false;

        }).catch(_ => {
        })

      },
      updateClose(done) {
        if (this.loadingU) {
          return;
        }
        this.$confirm('确定提交表单吗？', '提示').then(_ => {
          this.loadingU = true;
          let saveMes = null;
          axios.post('updateUserByUserId', this.selectUser).then(res => {
            this.$message.success(res.data);
            this.refreshUserList()
            done()
          }).catch(err => {
            console.log(err);
          });
          this.updateF = false
        }).catch(_=>{
          this.$refs.saveForm.resetFields()
        })
      },
      cancelSave() {
        this.loadingS = false;
        this.saveF = false;
        clearTimeout(this.timerS);
        this.$refs.saveForm.resetFields()
      },
      cancelUpdate() {
        this.loadingU = false;
        this.updateF = false;
        clearTimeout(this.timerU)
        this.$refs.saveForm.resetFields()
      }
    },
    mounted() {
      this.refreshUserList()
    },
  }
</script>

<style lang="stylus" scoped>
  .el-input {
    width 400px
  }
</style>
