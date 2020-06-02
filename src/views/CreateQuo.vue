<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="新建报价"></el-page-header>
    </div>
    <el-divider></el-divider>
    <div style="margin-bottom: 20px">
      <el-row :gutter="20">
        <el-col :sm="6" :offset="18">
          <el-select clearable v-model="projectNum" placeholder="请选择要新建的项目">
            <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                       :value="item.projectNum"></el-option>
          </el-select>
          <el-button @click="searchLiftByProNum" type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-form v-model="selectQuo1" label-width="90px">
        <el-row :gutter="20">
          <el-col :sm="6">
            <el-form-item label="报价书编号" prop="qNum">
              <el-input v-model="selectQuo1.qnum" placeholder="请输入报价书编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="项目编号" prop="qNum">
              <el-input disabled v-model="selectQuo1.qproject" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      <el-table :data="lifts" border height="400" show-summary :summary-method="getSummaries">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="电梯类型" prop="type"></el-table-column>
        <el-table-column label="层/站" prop="cz"></el-table-column>
        <el-table-column label="速度" prop="speed"></el-table-column>
        <el-table-column label="载重量" prop="deadWeight"></el-table-column>
        <el-table-column label="单价(元)" prop="unitPrice">
          <template slot-scope="scope">
            <el-input @blur="computedP(scope.$index, scope.row)" v-model="scope.row.unitPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="安装费(元)" prop="liftInstall">
          <template slot-scope="scope">
            <el-input @blur="computedP(scope.$index, scope.row)" v-model="scope.row.liftInstall"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="调试费(元)" prop="liftTs">
          <template slot-scope="scope">
            <el-input @blur="computedP(scope.$index, scope.row)" v-model="scope.row.liftTs"></el-input>
          </template>
        </el-table-column>
<!--        <el-table-column label="小计(元)" prop="subTotal">-->
<!--          <template slot-scope="scope">-->
<!--            {{Number(scope.row.unitPrice) + Number(scope.row.liftInstall) + Number(scope.row.liftTs)}}-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column label="设备数量" prop="deviceCount"></el-table-column>
        <el-table-column label="总计(元)" prop="total">
          <template slot-scope="scope">
            {{ Number(scope.row.deviceCount)*(Number(scope.row.unitPrice) + Number(scope.row.liftInstall) +
            Number(scope.row.liftTs))}}
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :sm="6">
          <el-form-item label="生效日期" prop="qStart">
            <el-date-picker
              v-model="selectQuo1.qstart"
              type="date"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="失效日期" prop="qEnd">
            <el-date-picker
              v-model="selectQuo1.qend"
              type="date"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="报价书金额" prop="qPrice">
            <el-input v-model="selectQuo1.qprice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="2">
          <el-button type="primary" @click="insertQuos">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "CreateQuo",
    data() {
      return {
        projects: [],
        projectNum: '',
        lifts: [],
        priceAll: '',
        selectQuo1: {
          qnum: '',
          qprice: '',
          qstart: '',
          qend: '',
          qproject: ''
        }
      }
    },
    mounted() {
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    },
    methods: {
      insertQuos(){
        console.log(this.selectQuo1)

        // axios.post('insertQuo',this.selectQuo).then(res=>{
        //   this.$message.success('保存成功')
        // })
        this.$confirm('确定保存吗？','提示').then(_=>{
          axios.post('insertQuo',this.selectQuo1).then(res=>{
            this.$message.success('保存成功')
            this.backGo()
          })
        })
      },
      getSummaries(param){
        console.log(param)
        const { columns, data } = param;
        data.forEach(res=>{
          axios.post('updateLift',res).then(res=>{
            console.log(res.data)
          })
        })
      },
      backGo() {
        this.$router.go(-1)
      },
      searchLiftByProNum() {
        axios.post('searchLiftByProNum', this.projectNum).then(res => {
          this.lifts = res.data
          this.selectQuo1.qproject=this.projectNum
        })
      },
      computedP(index, row) {
        this.priceAll=Number(this.priceAll)+(Number(row.unitPrice) + Number(row.liftInstall) + Number(row.liftTs)) * Number(row.deviceCount)
        this.selectQuo.qPrice=Number(this.priceAll)
      }
    }
  }
</script>

<style scoped>

</style>
