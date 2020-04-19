<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="销售合同登记"></el-page-header>
    </div>

    <el-divider></el-divider>


    <el-form :model="selectSale" ref="selectPro" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="合同编号" prop="htSaleNum">
            <el-input v-model="selectSale.htSaleNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="所属项目" prop="pNum">
            <el-select v-model="selectSale.pNum" placeholder="请选择项目">
              <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                         :value="item.projectNum"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :sm="6">
          <el-form-item label="合同金额" prop="htSaleMoney">
            <el-input @blur="computedDPrice" v-model="selectSale.htSaleMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="质保期" prop="htSaleWarranty">
            <el-input-number v-model="selectSale.htSaleWarranty" :min="1" label="质保期"></el-input-number>
            （月）
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="定金比率" prop="htSaleDingjinRate">
            <el-input @blur="computedDPrice" v-model="selectSale.htSaleDingjinRate">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="定金金额" prop="htSaleDingjin">
            <el-input v-model="selectSale.htSaleDingjin">
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="提货款比率" prop="htSaleTihuokuanRate">
            <el-input @blur="computedDPrice" v-model="selectSale.htSaleTihuokuanRate">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="提货款金额" prop="htSaleTihuokuan">
            <el-input v-model="selectSale.htSaleTihuokuan">
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item prop="htSaleStartDate" label="生效日期">
            <el-date-picker
              v-model="selectSale.htSaleStartDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item prop="htSaleEndDate" label="截至日期">
            <el-date-picker
              v-model="selectSale.htSaleEndDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item prop="htSalePayStyle" label="支付方式">
            <el-select v-model="selectSale.htSalePayStyle">
              <el-option label="支票" value="支票"></el-option>
              <el-option label="银行转账" value="银行转账"></el-option>
              <el-option label="现金" value="现金"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="btn-bottom">
        <el-col :span="2" :offset="6">
          <el-button type="primary" @click="keepSave">保存</el-button>
        </el-col>
        <el-col :span="2" :offset="6">
          <el-button type="info" @click="cancelSave">取消</el-button>
        </el-col>
      </el-row>
    </el-form>


  </div>
</template>

<script>
  export default {
    name: "CreateSaleHT",
    data() {
      return {
        projects: {
          projectNum: '',
          projectName: ''
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
          htSaleDingjinRate: '20',
          htSaleTihuokuan: '',
          htSaleTihuokuanRate: '60',
          htSaleDesc: '',
          htSaleIsFinish: ''
        }
      }
    },
    mounted() {
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    },
    methods: {
      backGo() {
        this.$router.go(-1)
      },
      computedDPrice() {
        this.selectSale.htSaleDingjin = this.selectSale.htSaleMoney * this.selectSale.htSaleDingjinRate / 100
        this.selectSale.htSaleTihuokuan = this.selectSale.htSaleMoney * this.selectSale.htSaleTihuokuanRate / 100
      },
      keepSave() {
        axios.post('insertSale', this.selectSale).then(res => {
          if (res.data == 1) {
            this.$message.success('保存成功');
            this.$router.go(-1)
          } else {
            this.$message.error('保存失败，请刷新页面');
          }
        })
      },
      cancelSave() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
