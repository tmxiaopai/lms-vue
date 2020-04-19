<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="安装合同"></el-page-header>
    </div>
    <el-divider></el-divider>
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
      <el-table-column prop="htInstallState" label="合同状态"></el-table-column>
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

      }
    },
    methods: {
      backGo() {
        this.$router.go(-1)
      },
      createHT(){
        this.$router.push('/createInstallHT')
      }
    }
  }
</script>

<style scoped>

</style>
