<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="收款计划"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-form :model="selectRM" ref="selectRM" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="款项" prop="detailSaleName">
            <el-input v-model="selectRM.detailSaleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="所属项目" prop="detailSaleProject">
            <el-select v-model="selectRM.detailSaleProject" placeholder="请选择项目">
              <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                         :value="item.projectNum"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="预付款日期" prop="detailSalePreDate">
            <el-date-picker v-model="selectRM.detailSalePreDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="单价" prop="detailSalePrice">
            <el-input @blur="computedPrice" v-model="selectRM.detailSalePrice">
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="数量" prop="detailSaleCount">
            <el-input @blur="computedPrice" v-model="selectRM.detailSaleCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="总计" prop="detailSaleTotal">
            <el-input v-model="selectRM.detailSaleTotal">
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="2" :offset="7">
          <el-button type="primary" @click="keepSave">生成</el-button>
        </el-col>
        <el-col :sm="2">
          <el-button type="info" @click="resetSave">重置</el-button>
        </el-col>
      </el-row>

    </el-form>


    <el-table style="margin-top: 20px" :data="rms" border width="300" height="600">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="收款编号" prop="detailSaleNum"></el-table-column>
      <el-table-column label="项目编号" prop="detailSaleProject"></el-table-column>
      <el-table-column label="款项" prop="detailSaleName"></el-table-column>
      <el-table-column label="预付款日期" prop="detailSalePreDate">
        <template slot-scope="scope">{{scope.row.detailSalePreDate|dateFormat1}}</template>
      </el-table-column>
      <el-table-column label="单价" prop="detailSalePrice"></el-table-column>
      <el-table-column label="数量" prop="detailSaleCount"></el-table-column>
      <el-table-column label="总计" prop="detailSaleTotal"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleIn(scope.$index, scope.row)">收款
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "CreateReceiveMoney",
    data() {
      return {
        projects: {
          projectNum: '',
          projectName: ''
        },
        selectRM: {
          detailSaleNum: '',
          detailSaleUser: '',
          detailSaleDate: '',
          detailSaleMoney: '',
          detailSaleProject: '',
          detailSaleName: '',
          detailSalePrice: '',
          detailSaleCount: '1',
          detailSaleTotal: '',
          detailSaleInvoice: '',
          detailSaleStateMoney: false,
          detailSaleStateInvoice: false,
          detailSalePreDate: '',
          detailSaleOkDate: ''
        },
        rms: []
      }
    },
    mounted() {
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
      this.refreshRMList()
    },
    methods: {
      computedPrice() {
        this.selectRM.detailSaleTotal = this.selectRM.detailSalePrice * this.selectRM.detailSaleCount
      },
      backGo() {
        this.$router.go(-1)
      },
      refreshRMList() {
        axios.get('findAllUnReceive').then(res => {
          this.rms = res.data
          console.log(res.data);
        })
      },
      handleIn(index,row) {
        this.$confirm('确认收款？', '提示').then(_ => {
          axios.post('receiveMoney', row.detailSaleNum).then(res => {
            if (res.data == 1) {
              this.$message.success('收款成功')
              this.refreshRMList()
            } else {
              this.$message.error('收款失败')
            }
          })
        })
      },
      keepSave() {
        this.selectRM.detailSaleUser = sessionStorage.getItem('userNum')
        this.$confirm('确认新建收款信息？此操作不可撤销。', '提示').then(_ => {
          axios.post('insertRM', this.selectRM).then(res => {
            if (res.data == 1) {
              this.$message.success('新建成功')
              this.refreshRMList()
            } else {
              this.$message.error('请重试')
            }
          })
        })
      },
      resetSave() {
        this.$refs.selectRM.resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
