<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="设备列表"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-form :model="selectLift1" ref="selectLift1" label-width="90px">
      <div style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :sm="6">
            <el-form-item label="所属项目" prop="projectNum">
              <el-select v-model="selectLift1.projectNum" placeholder="请选择项目">
                <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                           :value="item.projectNum"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="电梯类型" prop="type">
              <el-select v-model="selectLift1.type" placeholder="请选择电梯类型">
                <el-option label="日立A1" value="日立A1"></el-option>
                <el-option label="日立A2" value="日立A2"></el-option>
                <el-option label="日立A3" value="日立A3"></el-option>
                <el-option label="日立A4" value="日立A4"></el-option>
                <el-option label="日立A5" value="日立A5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="出厂编号" prop="factoryNum">
              <el-input v-model="selectLift1.factoryNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="3">
            <el-button type="primary" @click="searchLift">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-table :data="installList" border width="650">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column label="所属项目" prop="projectNum"></el-table-column>
      <el-table-column label="电梯类型" prop="type"></el-table-column>
      <el-table-column label="层/站" prop="cz"></el-table-column>
      <el-table-column label="速度" prop="speed"></el-table-column>
      <el-table-column label="载重量" prop="deadWeight"></el-table-column>
      <el-table-column label="出厂编号" prop="factoryNum"></el-table-column>
      <el-table-column label="设备数量" prop="deviceCount"></el-table-column>
      <el-table-column label="安装状态" prop="installStatus"></el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改状态" :visible.sync="dialogFormVisible" width="20%">
      <el-form :model="selectLift" label-width="90px" >
       <el-row >
         <el-col >
           <el-form-item label="项目编号" prop="projectNum">
             <el-input disabled v-model="selectLift.projectNum"></el-input>
           </el-form-item>
         </el-col>
       </el-row>
        <el-row >
          <el-col >
            <el-form-item label="电梯编号" prop="id">
              <el-input disabled v-model="selectLift.id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col >
            <el-form-item label="出厂编号" prop="factoryNum">
              <el-input disabled v-model="selectLift.factoryNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col >
            <el-form-item label="状态" prop="installStatus">
             <el-select v-model="selectLift.installStatus" placeholder="请选择安装状态">
               <el-option label="吊装" value="吊装"></el-option>
               <el-option label="导轨安装" value="导轨安装"></el-option>
               <el-option label="厅门安装" value="厅门安装"></el-option>
               <el-option label="定主机" value="定主机"></el-option>
               <el-option label="放钢丝绳" value="放钢丝绳"></el-option>
               <el-option label="快车调试" value="快车调试"></el-option>
               <el-option label="完成" value="完成"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateState">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "InstallList",
    data() {
      return {
        dialogFormVisible:false,
        installList: [],
        selectLift:{
          id:'',
          projectNum:'',
          installStatus:'',
          factoryNum:''
        },
        selectLift1:{
          projectNum: '',
          type: '',
          factoryNum: ''
        },
        projects:[],
      }
    },
    mounted() {
      this.refreshList()
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    },
    methods:{
      searchLift(){
        axios.post('searchLiftByLift',this.selectLift1).then(res=>{
          this.installList=res.data
          this.$message.success('查询成功')
          this.$refs.selectLift1.resetFields()
        })
      },
      handleEdit(index,row){
        this.dialogFormVisible=true
        this.selectLift=row
      },
      updateState(){
        axios.post('updateState',this.selectLift).then(res=>{
          if(res.data==1){
            this.refreshList()
            this.$message.success('状态保存成功！')
            this.dialogFormVisible=false
          }else{
            this.$message.error('出现意外，请刷新后重试')
          }
        })
      },
      backGo(){
        this.$router.go(-1)
      },
      refreshList(){
        axios.get('findUnFinish').then(res=>{
          this.installList=res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
