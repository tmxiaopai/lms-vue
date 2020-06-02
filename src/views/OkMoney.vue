<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="已结明细"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-table style="margin-top: 20px" :data="rms" border width="300">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="收款编号" prop="detailSaleNum"></el-table-column>
      <el-table-column label="项目编号" prop="detailSaleProject" sortable></el-table-column>
      <el-table-column label="款项" prop="detailSaleName"></el-table-column>
      <el-table-column label="收款人" prop="detailSaleUser"></el-table-column>
      <el-table-column label="单价" prop="detailSalePrice"></el-table-column>
      <el-table-column label="数量" prop="detailSaleCount"></el-table-column>
      <el-table-column label="总计" prop="detailSaleTotal"></el-table-column>
      <el-table-column label="收款日期" prop="detailSaleOkDate">
        <template slot-scope="scope">{{scope.row.datailSaleOkDate|dateFormat1}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.detailSaleStateInvoice"
            size="mini"
            @click="handleIn(scope.$index, scope.row)">开票
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "OkMoney",
    data() {
      return {
        rms: []
      }
    },
    mounted() {
      this.refreshOkList()
    },
    methods: {
      refreshOkList() {
        axios.get('findAllOkMoney').then(res => {
          this.rms = res.data
        })
      },
      backGo() {
        this.$router.go(-1)
      },
      handleIn(index, row) {
        this.$confirm('确认开票？', '提示').then(_ => {
          axios.post('invoice', row.detailSaleNum).then(res => {
            if (res.data == 1) {
              this.$message.success('成功开票')
              this.refreshOkList()
            } else {
              this.$message.error('出现错误，请重试')
            }
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
