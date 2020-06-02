<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="安装合同"></el-page-header>
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
            <el-input clearable v-model="selectHt.htInstallNum" placeholder="请输入合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="合同状态" prop="htSaleIsFinish">
            <el-select clearable v-model="selectHt.htInstallState" placeholder="请选择状态">
              <el-option value="false" label="有效"></el-option>
              <el-option value="true" label="无效"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="2">
          <el-button type="primary" @click="searchHt">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="install" border height="650">
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
      <el-table-column fixed prop="pNum" label="项目编号" width="100"></el-table-column>
      <el-table-column fixed prop="htInstallNum" label="合同编号" width="100"></el-table-column>
      <el-table-column prop="htInstallLiftCount" label="电梯数量" width="100"></el-table-column>
      <el-table-column prop="htInstallDate" label="签订日期" width="100">
        <template slot-scope="scope">
          {{scope.row.htInstallDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column prop="htInstallStartDate" label="生效日期" width="100">
        <template slot-scope="scope">
          {{scope.row.htInstallStartDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column prop="htInstallEndDate" label="截止日期" width="100">
        <template slot-scope="scope">
          {{scope.row.htInstallEndDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column prop="htInstallLiftCompany" label="电梯公司" width="100"></el-table-column>
      <el-table-column prop="htInstallMoney" label="合同金额"></el-table-column>
      <el-table-column prop="htInstallState" label="合同状态">
        <template slot-scope="scope">
          {{scope.row.htInstallState === true ? '无效':'有效'}}
        </template>
      </el-table-column>
      <el-table-column prop="htInstallFirstRate" label="入场安装费率" width="110"></el-table-column>
      <el-table-column prop="htInstallFirstM" label="入场安装费" width="100"></el-table-column>
      <el-table-column prop="htInstallSecondRate" label="调试完毕费率" width="110"></el-table-column>
      <el-table-column prop="htInstallSecondM" label="调试完毕费" width="100"></el-table-column>
      <el-table-column prop="htInstallThirdRate" label="质保期满费率" width="110"></el-table-column>
      <el-table-column prop=htInstallThirdM"" label="质保期满费" width="100"></el-table-column>
      <el-table-column prop="htInstallSecondM" label="调试完毕费" width="100"></el-table-column>
      <el-table-column prop="htInstallDesc" label="备注"></el-table-column>
      <el-table-column prop="htInstallZhibaoqi" label="质保期"></el-table-column>
      <el-table-column prop="htInstallFinishDate" label="竣工日期">
        <template slot-scope="scope">
          {{scope.row.htInstallFinishDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column prop="htInstallPlanDate" label="计划竣工日期" width="110">
        <template slot-scope="scope">
          {{scope.row.htInstallPlanDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column prop="htInstallMan" label="甲方"></el-table-column>
      <el-table-column prop="htInstallPhone" label="甲方电话"></el-table-column>
      <el-table-column prop=htInstallAddr"" label="安装地址"></el-table-column>
      <el-table-column prop="htInstallYiMan" label="乙方"></el-table-column>
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
    name: "InstallHT",
    data() {
      return {
        install: [],
        projects:[],
        selectHt: {
          htInstallState:'',
          htInstallNum:'',
          pNum:''
        }
      }
    },
    mounted() {
      this.refreshInstallList()
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    },
    methods: {
      searchHt(){
        axios.post('queryHtInstallByE',this.selectHt).then(res=>{
          this.install=res.data
          this.$message.success('查询成功')
          this.$refs.selectHt.resetFields()
        })
      },
      refreshInstallList() {
        axios.get("findAllInstallHt").then(res => {
          this.install = res.data
        })
      },
      backGo() {
        this.$router.go(-1)
      },
      createHT() {
        this.$router.push('/createInstallHT')
      }
    }
  }
</script>

<style scoped>

</style>
