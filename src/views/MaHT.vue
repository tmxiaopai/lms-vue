<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="维保合同"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-form ref="searchForm" :model="selectHt" :ref="selectHt" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="5">
          <el-form-item label="所属项目" prop="projectNum">
            <el-select clearable v-model="selectHt.pNum" placeholder="请选择项目">
              <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                         :value="item.projectNum"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="5">
          <el-form-item label="合同编号" prop="htSaleNum">
            <el-input clearable v-model="selectHt.htMNum" placeholder="请输入合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="合同状态" prop="htSaleIsFinish">
            <el-select clearable v-model="selectHt.htMStatus" placeholder="请选择状态">
              <el-option value="0" label="有效"></el-option>
              <el-option value="1" label="无效"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="2">
          <el-button type="primary" @click="searchHt">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="Ma" border height="650">
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
      <el-table-column fixed prop="pNum" label="项目编号"></el-table-column>
      <el-table-column label="合同编号" prop="htMNum"></el-table-column>
      <el-table-column label="使用单位" prop="htMCustomer"></el-table-column>
      <el-table-column label="电梯数量" prop="htMLiftCount"></el-table-column>
      <el-table-column label="合同金额" prop="htMMoney"></el-table-column>
      <el-table-column label="结算方式" prop="htMPayDateStyle"></el-table-column>
      <el-table-column label="支付方式" prop="htMPayStyle"></el-table-column>
      <el-table-column label="保养类型" prop="htMStyle"></el-table-column>
      <el-table-column label="维保月数" prop="htMMonth"></el-table-column>
      <el-table-column label="合同生效期" prop="htMStartDate">
        <template slot-scope="scope">
          {{scope.row.htMStartDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column label="合同失效期" prop="htMEndDate">
        <template slot-scope="scope">
          {{scope.row.htMEndDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column label="签订日期" prop="htMSignDate">
        <template slot-scope="scope">
          {{scope.row.htMSignDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="htMDesc"></el-table-column>
      <el-table-column label="状态" prop="htMStatus">
        <template slot-scope="scope">
          {{scope.row.htMStatus===0 ? '有效':'无效'}}
        </template>
      </el-table-column>
    </el-table>
    <div class="create-btn">
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button type="info" @click="createHT">新建合同</el-button>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "WBHT",
    data() {
      return {
        Ma: [],
        projects:[],
        selectHt:{
          pNum:'',
          htMNum:'',
          htMStatus:''
        }
      }
    },
    mounted() {
      this.refreshHtList()
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    },
    methods:{
      searchHt(){
        axios.post('searchHtMaByE',this.selectHt).then(res=>{
          this.Ma=res.data
          this.$message.success('查询成功')
          this.$refs.selectHt.resetFields()
        })
      },
      backGo() {
        this.$router.go(-1)
      },
      createHT(){
        this.$router.push('/createMaHT')
      },
      refreshHtList(){
        axios.get("findAllMaHt").then(res=>{
          this.Ma=res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
