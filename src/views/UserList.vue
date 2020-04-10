<template>
  <div>
    <div class="createBtn">
      <el-row>
        <el-button type="info" @click="saveUser">新建用户</el-button>
      </el-row>
    </div>
    <el-table :data="users" height="650" border>
      <el-table-column label="序号" type="index" width="50" fixed></el-table-column>
      <el-table-column label="工号" prop="userNum" fixed sortable></el-table-column>
      <el-table-column label="员工名" prop="userName" fixed sortable></el-table-column>
      <el-table-column label="手机" prop="userPhone"></el-table-column>
      <el-table-column label="邮箱" prop="userEmail"></el-table-column>
      <el-table-column label="最后登录时间" prop="userLastLoginTime" sortable></el-table-column>
<!--      <el-table-column label="用户状态" prop="userStatus"></el-table-column>-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="EditUser(scope.$index,scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="DeleteUser(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="新建用户"
      :before-close="saveClose"
      :visible="saveF"
      direction="ltr"
      ref="SaveD">
      <div class="drawer-body">
        <el-form ref="saveForm" :rules="rules" :model="selectUser">
          <el-form-item label="工号">
            <el-input v-model.number="selectUser.userNum"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="selectUser.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="selectUser.userPassword"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="selectUser.userPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="selectUser.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="角色设置">
            <el-select v-model="roleId" placeholder="请选择用户角色">
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
      title="新建用户"
      :before-close="updateClose"
      :visible="updateF"
      direction="rtl"
      ref="SaveU">
      <div class="drawer-body">
        <el-form ref="saveForm" :rules="rules" :model="selectUser">
          <el-form-item label="工号">
            <el-input v-model.number="selectUser.userNum"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="selectUser.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="selectUser.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="selectUser.userName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="selectUser.userName"></el-input>
          </el-form-item>
          <el-form-item label="角色设置">
            <el-select v-model="roleId" placeholder="请选择用户角色">
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
        roles: [
          {
            roleId: '1',
            roleName: '你好'
          },
          {
            roleId: '2',
            roleName: '你好'
          }
        ],
        users: [],
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
          userStatus: ''
        },
        rules: {}
      }
    },
    methods: {
      refreshUserList() {
        axios({
          method: 'get',
          url: 'findAllUser',
        }).then(res => {
          this.users = res.data;
          console.log(res.data);
        })
      },
      saveUser: function () {
        this.saveF = true
      },
      EditUser(index, row) {
        this.selectUser=row;
        this.updateF=true
      },
      DeleteUser(index, row) {
        this.selectUser=row;
        this.$confirm('此操作将删除该记录，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          axios.post('deleteUser',this.selectUser.userId).then(res=>{
            this.users.splice(index,1);
            this.$message({
              type:"success",
              message:res.data
            })
          }).catch(_=>{
            this.$message({
              type:"error",
              message:'删除失败'
            })
          })
        }).catch(()=>{
          this.$message({
            type:"info",
            message:'已取消删除'
          })
        })
      },
      saveClose(done) {
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
            if (saveMes != null || saveMes.equal('')) {
              axios.post('insertUserRole', {
                userNum: this.selectUser.userNum,
                roleId: this.roleId
              }).then(res => {
                this.$message({
                  type: "success",
                  message: res.data
                });
              }).catch(err => {
                console.log(err);
              })
            }
          });
          this.loadingS = false;
          this.saveF=false;
          this.refreshUserList()
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
            saveMes = res.data;
          }).catch(err => {
            console.log(err);
          });
          axios.post('updateUserRoleByUserNum',{
            userId: this.selectUser.userId,
            roleId: this.roleId
          }).then(res=>{
            this.loadingU = false;
            this.$message({
              type: "success",
              message: res.data
            });
          });
          this.refreshUserList()
        })
      },
      cancelSave() {
        this.loadingS = false;
        this.saveF = false;
        clearTimeout(this.timerS)
      },
      cancelUpdate() {
        this.loadingU=false;
        this.updateF=false;
        clearTimeout(this.timerU)
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
