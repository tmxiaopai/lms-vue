<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="销售合同"></el-page-header>
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
            <el-input clearable v-model="selectHt.htSaleNum" placeholder="请输入合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="合同状态" prop="htSaleIsFinish">
            <el-select clearable v-model="selectHt.htSaleIsFinish" placeholder="请选择状态">
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

    <el-table :data="sales" border height="650">
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="pNum" label="项目编号"></el-table-column>
      <el-table-column prop="htSaleNum" label="合同编号"></el-table-column>
      <el-table-column prop="htSaleMoney" label="合同金额"></el-table-column>
      <el-table-column prop="htSaleStartDate" label="生效日期">
        <template slot-scope="scope">
          {{scope.row.htSaleStartDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column prop="htSaleEndDate" label="截止日期">
        <template slot-scope="scope">
          {{scope.row.htSaleEndDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column prop="htSaleState" label="审核状态">
        <template slot-scope="scope">
          {{scope.row.htSaleState === true ? '已审核':'未审核'}}
        </template>
      </el-table-column>
      <el-table-column prop="htSaleWarranty" label="质保期"></el-table-column>
      <el-table-column prop="htSalePayStyle" label="支付方式"></el-table-column>
      <el-table-column prop="htSaleDingjin" label="定金金额"></el-table-column>
      <el-table-column prop="htSaleDingjinRate" label="定金比率"></el-table-column>
      <el-table-column prop="htSaleTihuokuan" label="提货款"></el-table-column>
      <el-table-column prop="htSaleTihuokuanRate" label="提货款比率"></el-table-column>
      <el-table-column prop="htSaleDesc" label="合同描述"></el-table-column>
      <el-table-column prop="htSaleIsFinish" label="合同状态">
        <template slot-scope="scope">
          {{scope.row.htSaleIsFinish === true ? '无效':'有效'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">

        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="(scope.row.htSaleState && role)"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">
            审核
          </el-button>
          <el-button
            size="mini"
            type="info"
            :disabled="scope.row.htSaleState"
            @click="handleDelete(scope.$index, scope.row)">修改
          </el-button>
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
    name: "SaleHT",
    data() {
      return {
        sales: [],
        projects:[],
        role:'',
        selectHt:{
          pNum:'',
          htSaleNum:'',
          htSaleIsFinish:''
        },
        selectSale: {
          htSaleNum: '',
          htSaleStartDate: '',
          htSaleEndDate: '',
          htSaleWarranty: '',
          htSaleMoney: '',
          htSaleState: '',
          pNum: '',
          htSalePayStyle: '',
          htSaleDingjin: '',
          htSaleDingjinRate: '',
          htSaleTihuokuan: '',
          htSaleTihuokuanRate: '',
          htSaleDesc: '',
          htSaleIsFinish: ''
        }
      }
    },
    created() {
      this.getRole();
    },
    mounted() {
      this.refreshList()
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    },
    methods: {
      searchHt(){
        axios.post('searchHtSaleByE',this.selectHt).then(res=>{
          this.sales=res.data
          this.$message.success('查询成功')
          this.$refs.selectHt.resetFields()
        })
      },
      getRole(){
        const roleFlag = sessionStorage.getItem('role');
        if(roleFlag==1){this.role=true}else {this.role=false}
      },
      handleEdit(index,row){
        this.$confirm('确定通过审核','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_=>{
          axios.post('checkSale',row.htSaleNum).then(res=>{
            if(res.data==1){
              this.$message.success('审核成功');
              this.refreshList()
            }else{
              this.$message.error('审核失败，请刷新页面')
            }
          }).catch(err=>{
            this.$message.error('出现意外')
          })
        })
      },
      handleDelete(index,row){

      },
      refreshList() {
        axios.get('queryAllSale').then(res => {
          this.sales = res.data
        })
      },
      backGo() {
        this.$router.go(-1)
      },
      createHT() {
        this.$router.push('createSaleHT')
      }
    }
  }
</script>

<style scoped>

</style>
