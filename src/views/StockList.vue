<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="库存列表"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-table :data="stocks" border height="650">
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
      <el-table-column label="配件名称" prop="sName" width="200"></el-table-column>
      <el-table-column label="型号" prop="sType" width="100"></el-table-column>
      <el-table-column label="代码" prop="sNum" width="100"></el-table-column>
      <el-table-column label="规格" prop="sSpece" width="100"></el-table-column>
      <el-table-column label="单价" prop="sUnitPrice" width="100"></el-table-column>
      <el-table-column label="库存" prop="sIn" width="100"></el-table-column>
      <el-table-column label="销售量" prop="sOut" width="100"></el-table-column>
      <!--<el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">入库
          </el-button>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "StockList",
    data() {
      return {
        stocks: []
      }
    },
    mounted() {
      this.refreshStockList()
    },
    methods:{
      refreshStockList(){
        axios.get('findAllStock').then(res=>{
          this.stocks=res.data
        }).catch(err=>{
          console.log(err);
          this.$message.error('请重新操作')
        })
      },
      handleEdit(index,row){

      },
      backGo(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
