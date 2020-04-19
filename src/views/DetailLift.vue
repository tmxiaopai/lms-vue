<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="销售合同"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-table :data="lifts" border height="650">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="所属项目" prop="projectNum"></el-table-column>
      <el-table-column label="电梯类型" prop=""></el-table-column>
      <el-table-column label="层/站" prop=""></el-table-column>
      <el-table-column label="速度" prop=""></el-table-column>
      <el-table-column label="载重量" prop=""></el-table-column>
      <el-table-column label="单价" prop=""></el-table-column>
      <el-table-column label="出厂编号" prop=""></el-table-column>
      <el-table-column label="设备数量" prop=""></el-table-column>
      <el-table-column label="安装状态" prop=""></el-table-column>
      <el-table-column label="备注" prop=""></el-table-column>
      <el-table-column label="年检日期" prop=""></el-table-column>
      <el-table-column label="" prop=""></el-table-column>
      <el-table-column label="" prop=""></el-table-column>
      <el-table-column label="" prop=""></el-table-column>
      <el-table-column label="" prop=""></el-table-column>
      <el-table-column label="" prop=""></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "DetailLift",
    data(){
      return{
        lifts:[]
      }
    }
  }
</script>

<style scoped>

</style>
