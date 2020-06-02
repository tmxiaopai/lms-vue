<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="拜访计划"></el-page-header>
    </div>
    <el-divider></el-divider>
    <div style="margin-bottom: 20px">
      <el-row :gutter="20">
        <el-col :sm="6" :offset="18">
          <el-select clearable v-model="projectNum" placeholder="请选择要查询的项目">
            <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                       :value="item.projectNum"></el-option>
          </el-select>
          <el-button @click="searchByProject" type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="visits" style="width: 100%;text-align: center" height="650" border>
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
      <el-table-column fixed prop="pNum" width="150" label="项目编号" sortable></el-table-column>
      <el-table-column fixed prop="sendMan" width="200" label="业务员" sortable></el-table-column>
      <el-table-column prop="visitDate" width="120" label="采访时间">
        <template slot-scope="scope">{{scope.row.visitDate | dateFormat1}}</template>
      </el-table-column>
      <el-table-column prop="receiveMan" label="受访人员"></el-table-column>
      <el-table-column prop="content" label="采访内容"></el-table-column>
      <el-table-column prop="result" label="采访结果"></el-table-column>
      <el-table-column prop="degree" sortable label="项目进度"></el-table-column>
      <el-table-column prop="mans" label="陪同人员"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.result == ''"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">执行计划
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="create-btn">
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button type="info" @click="createPlan">新建计划</el-button>
        </el-col>
      </el-row>
    </div>

    <el-drawer
      title="新建计划"
      :before-close="createClose"
      :visible.sync="createF"
      direction="ltr"
      ref="DrawerC"
    >
      <div class="drawer-body">
        <el-form ref="myForm" :model="selectVis" label-width="80px">
          <el-form-item label="选择项目">
            <el-select v-model="selectVis.pnum" placeholder="请选择项目">
              <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName" :value="item.projectNum"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拜访内容">
            <el-input type="textarea" :rows="3" style="width: 300px" v-model="selectVis.content"></el-input>
          </el-form-item>
          <el-form-item label="拜访时间">
            <el-date-picker
              v-model="selectVis.visitDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div class="demo-drawer__footer">
          <el-button @click="cancelCreate">取 消</el-button>
          <el-button type="primary" @click="$refs.DrawerC.closeDrawer()" :loading="loadingC">{{ loadingC === true ?
            "提交中..." : "新建" }}
          </el-button>
        </div>
      </div>
    </el-drawer>

    <el-drawer
      title="执行计划"
      :before-close="updateClose"
      :visible.sync="updateF"
      direction="rtl"
      ref="DrawerU"
    >
      <div class="drawer-body">
        <el-form ref="myForm" :model="selectVis" label-width="80px">
          <el-form-item label="受访人">
            <el-input v-model="selectVis.receiveMan"></el-input>
          </el-form-item>
          <el-form-item label="拜访结果">
            <el-input type="textarea" style="width: 300px" v-model="selectVis.result"></el-input>
          </el-form-item>
          <el-form-item label="项目进度">
            <el-select v-model="selectVis.degree">
              <el-option label="初步沟通" value="初步沟通"></el-option>
              <el-option label="现场勘察" value="现场勘察"></el-option>
              <el-option label="协商洽谈" value="协商洽谈"></el-option>
              <el-option label="合同签订" value="合同签订"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="陪同人员">
            <el-input v-model="selectVis.mans"></el-input>
          </el-form-item>
        </el-form>

        <div class="demo-drawer__footer">
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="$refs.DrawerU.closeDrawer()" :loading="loadingF">{{ loadingF === true ?
            "提交中..." : "执行" }}
          </el-button>
        </div>
      </div>
    </el-drawer>


  </div>
</template>

<script>

  export default {
    name: "VisitPlan",
    data() {
      return {
        visits: [],
        projectNum:'',
        selectVis: {
          projects:[],
          visitId: '',
          pNum: '',
          sendMan: '',
          visitDate: '',
          receiveMan: '',
          content: '',
          result: '',
          degree: '',
          mans: ''
        },
        projects:{
          projectNum:'',
          projectName:''
        },
        loadingF:false,
        loadingC:false,
        updateF:false,
        createF:false
      }
    },
    methods: {
      searchByProject(){
        if(this.projectNum == null){this.refreshPlan()}
        axios.post('searchVisitByProject',this.projectNum).then(res=>{
          this.visits=res.data
          this.$message.success('查询成功')
          this.projectNum=null
        })
      },
      backGo: function () {
        this.$router.go(-1)
      },
      handleEdit(index,row) {
        this.updateF=true;
        this.selectVis=row
      },
      handleDelete(index,row) {
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_=>{
          axios.post('deletePlan',row.visitId).then(res=>{
            if(res.data===1){
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.visits.splice(index, 1);
            }else {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
            }
          })
        })
      },
      createPlan(){
        this.createF=true;
        axios.get('findAllProjectName').then(res=>{
          this.projects=res.data
        })
      },
      cancelCreate(){
        this.loadingC=false;
        this.createF=false
      },
      cancelUpdate(){
        this.updateF=false;
        this.loadingF=false
      },
      updateClose(done){
        if(this.loadingC)
        {
          return ;
        }
        this.$confirm('确定修改计划？','提示').then(_=>{
          this.loadingF=true;
          axios.post('updatePlan',this.selectVis).then(res=>{
            if(res.data===1){
              this.$message.success('执行成功');
            }else{
              this.$message.error("执行出现错误，请刷新页面后重试")
            }
            done();
            this.loadingF=false
          })
        })
      },
      createClose(done){
        if(this.loadingC)
        {
          return ;
        }
        this.$confirm('确定保存计划？','提示').then(_=>{
          this.loading=true;
          axios.post('insertPlan',this.selectVis).then(res=>{
            if(res.data ===1){
              this.$message.success("保存成功");
              this.refreshPlan()
            }else{
              this.$message.error('保存失败')
            }
            done();
            this.loadingC=false
          })

        })
      },
      refreshPlan(){
        axios.post("findAllPlan").then(res=>{
          this.visits=res.data
        })
      },
    },
    mounted() {
      this.refreshPlan()
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    }
  }
</script>

<style lang="stylus" scoped>

  .el-input {
    width 300px
  }
</style>
