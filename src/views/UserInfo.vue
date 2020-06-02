<template>
  <div>
    <el-dialog title="用户信息" :visible.sync="dialogVisible">
      <el-form :model="selectUser" label-width="90px">
        <el-row :gutter="20">
          <el-col :sm="6">
            <el-form-item label="工号" prop="userNum">
              <el-input v-model="selectUser.userNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="6">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="selectUser.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="6">
            <el-form-item label="手机" prop="userPhone">
              <el-input v-model="selectUser.userPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :sm="6">
            <el-form-item label="邮箱" prop="userEmail">
              <el-input v-model="selectUser.userEmail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
      </span>
    </el-dialog>

    <el-button @click="userInfoFlag = true">open</el-button>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    data() {
      return {
        userInfoFlag:false,
        selectUser: {
          userNum: '',
          userName: '',
          userPhone: '',
          userEmail: ''
        }
      }
    },
    methods:{
      changeFlag:function(){
        this.user=true
      },
      open(){
        this.$alert('<div><input type="text" /><br><input type="text"/> </div>','用户信息',{
          dangerouslyUseHTMLString: true
        })
      }
    }
  }
</script>

<style scoped>

</style>
