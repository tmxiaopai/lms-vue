<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="维保合同"></el-page-header>
    </div>
    <el-divider></el-divider>

    <el-table :data="install" border height="650">
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
      <el-table-column fixed prop="pNum" label="项目编号"></el-table-column>
      <el-table-column label="合同编号" prop="htMNum"></el-table-column>
      <el-table-column label="使用单位" prop="htMCustomer"></el-table-column>
      <el-table-column label="电梯数量" prop="htMLiftCount"></el-table-column>
      <el-table-column label="合同金额" prop="htMMoney"></el-table-column>
      <el-table-column label="结算方式" prop="htMPayDateStyle"></el-table-column>
      <el-table-column label="支付方式" prop="htMPayStyle"></el-table-column>
      <el-table-column label="保养类型" prop="htMStyle"></el-table-column>
      <el-table-column label="合同生效期" prop="htMStartDate"></el-table-column>
      <el-table-column label="合同失效期" prop="htMEndDate"></el-table-column>
      <el-table-column label="签订日期" prop="htMSignDate"></el-table-column>
      <el-table-column label="备注" prop="htMDesc"></el-table-column>
      <el-table-column label="状态" prop="htMStatus"></el-table-column>
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
        install: []
      }
    },
    methods:{
      createHT(){
        this.$router.push('/createMaHT')
      }
    }
  }
</script>

<style scoped>

</style>
