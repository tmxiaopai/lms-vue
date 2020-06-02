<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="报价列表"></el-page-header>
    </div>
    <el-divider></el-divider>
    <div style="margin-bottom: 20px">
      <el-row :gutter="20">
        <el-col :sm="2">
          <el-button type="info" @click="newQuo">新建</el-button>
        </el-col>
        <el-col :sm="6" :offset="16">
          <el-select clearable v-model="projectNum" placeholder="请选择要查询记录的项目">
            <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                       :value="item.projectNum"></el-option>
          </el-select>
          <el-button @click="searchProjectQuotation" type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="quotations" border height="650">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="报价书编号" prop="qNum"></el-table-column>
      <el-table-column label="所属项目" prop="qProject"></el-table-column>
      <el-table-column label="登记日期" prop="qDate">
        <template slot-scope="scope">
          {{scope.row.qDate | dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column label="生效期" prop="qStart">
        <template slot-scope="scope">
          {{scope.row.qDate | dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column label="失效期" prop="aEnd">
        <template slot-scope="scope">
          {{scope.row.qDate | dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column label="总价" prop="qPrice"></el-table-column>
      <el-table-column label="备注" prop="qDescription"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Quotation",
    data() {
      return {
        projectNum: '',
        quotations: [],
        projects: [],
      }
    },
    mounted() {
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
      this.refreshQuoList()
    },
    methods: {
      newQuo() {
        this.$router.push('/createQuo')
      },
      refreshQuoList() {
        axios.get('findAllQuo').then(res => {
          this.quotations = res.data
        })
      },
      backGo: function () {
        this.$router.go(-1)
      },
      searchProjectQuotation() {
        axios.post('findQuoByPNUm', this.projectNum).then(res => {
          this.quotations = res.data
          this.$message.success('查询成功')
        })
      }
    }
  }
</script>

<style scoped>

</style>
