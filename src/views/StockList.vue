<template>
<div>
  <div class="page-title">
    <el-page-header @back="backGo" content="库存列表"></el-page-header>
  </div>
  <el-divider></el-divider>

  <el-table :data="stock" border height="650">
    <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
    <el-table-column label="配件名称" prop="SName"></el-table-column>
    <el-table-column label="型号" prop="SType"></el-table-column>
    <el-table-column label="代码" prop="SNum"></el-table-column>
    <el-table-column label="规格" prop="SSpece"></el-table-column>
    <el-table-column label="单价" prop="SUnitPrice"></el-table-column>
    <el-table-column label="库存" prop="SIn"></el-table-column>
    <el-table-column label="销售量" prop="SOut"></el-table-column>
  </el-table>
</div>
</template>

<script>
    export default {
        name: "StockList",
      data(){
          return{
            stock:[]
          }
      }
    }
</script>

<style scoped>

</style>
