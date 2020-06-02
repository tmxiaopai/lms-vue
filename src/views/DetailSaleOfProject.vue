<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="销售清单"></el-page-header>
    </div>
    <el-divider></el-divider>
    <div style="margin-bottom: 20px">
      <el-row :gutter="20">
        <el-col :sm="6" :offset="18">
          <el-select clearable v-model="project" placeholder="请选择要查询记录的项目">
            <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                       :value="item.projectNum"></el-option>
          </el-select>
          <el-button @click="searchSaleOfProject" type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </div>


    <el-tabs type="border-card">
      <el-tab-pane label="待收款">
        <el-table style="margin-top: 20px" :data="detailsOut" border width="500">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column width="200" label="收款编号" prop="detailSaleNum"></el-table-column>
          <el-table-column label="款项" prop="detailSaleName"></el-table-column>
          <el-table-column label="预付款日期" prop="detailSalePreDate">
            <template slot-scope="scope">{{scope.row.detailSalePreDate|dateFormat1}}</template>
          </el-table-column>
          <el-table-column label="单价" prop="detailSalePrice"></el-table-column>
          <el-table-column label="数量" prop="detailSaleCount"></el-table-column>
          <el-table-column label="总计" prop="detailSaleTotal"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已收款">
        <el-table style="margin-top: 20px" :data="detailsIn" border width="300">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column width="200" label="收款编号" prop="detailSaleNum"></el-table-column>
          <el-table-column label="款项" prop="detailSaleName"></el-table-column>
          <el-table-column label="收款人" prop="detailSaleUser"></el-table-column>
          <el-table-column label="单价" prop="detailSalePrice"></el-table-column>
          <el-table-column label="数量" prop="detailSaleCount"></el-table-column>
          <el-table-column label="总计" prop="detailSaleTotal"></el-table-column>
          <el-table-column label="收款日期" prop="detailSaleOkDate">
            <template slot-scope="scope">{{scope.row.datailSaleOkDate|dateFormat1}}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>



  </div>
</template>

<script>
  export default {
    name: "DetailSaleOfProject",
    data() {
      return {
        project:'',
        projects: [],
        detailsOut:[],
        detailsIn:[]
      }
    },
    mounted() {
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    },
    methods: {
      backGo(){
        this.$router.go(-1)
      },
      searchSaleOfProject(){
        if(this.project!=null){
          axios.post('searchSaleOfProject',this.project).then(res=>{
            this.detailsIn=res.data.InDetail;
            this.detailsOut=res.data.OutDetail;
            this.$message.success('查询成功')
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
