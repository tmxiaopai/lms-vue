<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="故障工单"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-table :data="orders" height="650" border>
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="faultLift" label="故障电梯"></el-table-column>
      <el-table-column fixed prop="faultDescription" label="故障原因"></el-table-column>
      <el-table-column prop="checkInMan" label="报案人"></el-table-column>
      <el-table-column prop="checkInPhone" width="120" label="报案电话"></el-table-column>
      <el-table-column prop="faultDate" label="报案时间">
        <template slot-scope="scope">
          {{scope.row.faultDate|dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="solveMan" label="维修员"></el-table-column>
      <el-table-column prop="isSolve" label="是否解决"></el-table-column>
      <el-table-column prop="faultReason" label="故障原因"></el-table-column>
      <el-table-column prop="solvePlan" label="解决方案"></el-table-column>
      <el-table-column prop="solveDate" label="解决时间">
        <template slot-scope="scope">
          {{scope.row.solveDate|dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="confirm" label="客户确认">
        <template slot-scope="scope">
          {{scope.row.confirm === true ? '是':'否'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="scope.row.confirm" size="mini" @click="handleOk(scope.row)">客户确认</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="create-btn">
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button @click="keepSave" type="info">新建工单</el-button>
        </el-col>
      </el-row>
    </div>
    <el-drawer
      title="新建工单"
      :before-close="saveClose"
      :visible.sync="drawer"
      direction="ltr"
      ref="Drawer">
      <div class="drawer-body">
        <el-form ref="myForm" :model="selectOrder" label-width="90px">
          <el-form-item label="故障描述">
            <el-input type="textarea" style="width: 300px" placeholder="事发地点、故障描述" v-model="selectOrder.faultDescription"></el-input>
          </el-form-item>
          <el-form-item label="故障电梯">
            <el-input v-model="selectOrder.faultLift"></el-input>
          </el-form-item>
          <el-form-item label="登记日期">
            <el-date-picker
              v-model="selectOrder.faultDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报案人姓名">
            <el-input v-model="selectOrder.checkInMan"></el-input>
          </el-form-item>
          <el-form-item label="报案人电话">
            <el-input v-model="selectOrder.checkInPhone"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="cancelForm">取消</el-button>
        <el-button @click="$refs.Drawer.closeDrawer()" type="primary" :loading="loading">{{loading === true ? "提交中..." :
          "保存"}}
        </el-button>
      </div>
    </el-drawer>


  </div>
</template>

<script>
  export default {
    name: "FaultList",
    data() {
      return {
        orders: [],
        drawer:false,
        loading:false,
        selectOrder: {
          faultId:'',
          faultDescription: '',
          faultLift: '',
          checkInMan: '',
          checkInPhone: '',
          faultDate: '',
          solveMan: '',
          isSolve: '',
          faultReason: '',
          solvePlan: '',
          solveDate: '',
          confirm: false
        }
      }
    },
    methods: {
      refreshOrderList(){
        axios.get('findAllOrder').then(res=>{
          this.orders=res.data
        })
      },
      backGo() {
        this.$router.go(-1)
      },
      handleOk(row){
        axios.post('setConfirm',row.faultId).then(res=>{
          if(res.data===1){
            this.$message.success('成功确认');
            this.refreshOrderList()
          }else{
            this.$message.error('确认出现意外，请刷新页面后重试')
          }
        })
      },
      cancelForm(){
        this.drawer=false;
        this.loading=false
      },
      keepSave(){
        this.drawer=true
      },
      saveClose(done){
        if(this.loading){return;}
        this.$confirm('确认新建工单吗？','提示').then(_=>{
          this.loading=true;
          axios.post('insertOrder',this.selectOrder).then(res=>{
            if(res.data==1){
              this.$message.success('新建成功');
              this.refreshOrderList()
            }else{
              this.$message.error('保存失败，请重新操作')
            }
          })
          done();
          this.loading=false
        })
      }
    },
    mounted() {
      this.refreshOrderList()
    }
  }
</script>

<style lang="stylus" scoped>
 .el-input{
   width 300px
 }
</style>
