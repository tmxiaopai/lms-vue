<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="维保合同登记"></el-page-header>
    </div>

    <el-divider></el-divider>


    <el-form :model="selectMa" ref="selectMaHT" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="合同编号"  prop="htMNum">
            <el-input v-model="selectMa.htMNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="所属项目" prop="pNum">
            <el-select v-model="selectMa.pNum" placeholder="请选择项目">
              <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                         :value="item.projectNum"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="合同金额" prop="htMMoney">
            <el-input v-model="selectMa.htMMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="电梯数量" prop="htMLiftCount">
            <el-input-number v-model="selectMa.htMLiftCount" :min="1"></el-input-number>
            (台)
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="结算方式" prop="htMPayDateStyle">
            <el-select v-model="selectMa.htMPayDateStyle" placeholder="请选择结算方式">
              <el-option label="季结" value="季结"></el-option>
              <el-option label="月结" value="月结"></el-option>
              <el-option label="次结" value="次结"></el-option>
              <el-option label="半年结" value="半年结"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="支付方式" prop="htMPayStyle">
            <el-select placeholder="请选择支付方式" v-model="selectMa.htMPayStyle">
              <el-option label="现金" value="现金"></el-option>
              <el-option label="公司转账" value="公司转账"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="保养类型" prop="htMStyle">
            <el-select placeholder="请选择保养类型" v-model="selectMa.htMStyle">
              <el-option label="半包" value="半包"></el-option>
              <el-option label="全包" value="全包"></el-option>
              <el-option label="免保" value="免保"></el-option>
              <el-option label="标保" value="标保"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="签订日期" prop="htMSignDate">
            <el-date-picker
              v-model="selectMa.htMSignDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="生效期" prop="htMStartDate">
            <el-date-picker
              v-model="selectMa.htMStartDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="失效期" prop="htMEndDate">
            <el-date-picker
              v-model="selectMa.htMEndDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="维保月数" prop="htMMonth">
            <el-input-number :min="6" v-model="selectMa.htMMonth"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="12">
          <el-form-item label="备注" prop="">
            <el-input v-model="selectMa.htMDesc"></el-input>
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
    name: "CreateMaHT",
    data() {
      return {
        projects: {
          projectNum: '',
          projectName: ''
        },
        selectMa: {
          pNum: '',
          htMNum: '',
          htMCustomer: '',
          htMLiftCount: '',
          htMMoney: '',
          htMPayDateStyle: '',
          htMPayStyle: '',
          htMStyle: '',
          htMStartDate: '',
          htMEndDate: '',
          htMSignDate: '',
          htMDesc: '',
          htMStatus: '0',
          htMMonth:''
        }
      }
    },
    mounted() {
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    },
    methods:{
      backGo() {
        this.$router.go(-1)
      },
      keepSave(){
        console.log(this.selectMa);
        this.$confirm('确认保存该合同信息吗？','提示').then(_=>{
          axios.post('insertMaHT',this.selectMa).then(res=>{
            if(res.data==1){
              this.$message.success('保存成功');
              this.$router.go(-1)
            }else{
              this.$message.error('出现意外，请刷新页面后重试')
            }
          })
        })
      },
      cancelSave(){}
    }

  }
</script>

<style scoped>

</style>
