<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="安装合同登记"></el-page-header>
    </div>

    <el-divider></el-divider>

    <el-form :model="selectInstall" ref="selectInstallHT" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="合同编号" prop="htInstallNum">
            <el-input v-model="selectInstall.htInstallNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="所属项目" prop="pNum">
            <el-select v-model="selectInstall.pNum" placeholder="请选择项目">
              <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                         :value="item.projectNum"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="合同金额" prop="htInstallMoney">
            <el-input v-model="selectInstall.htInstallMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="电梯数量" prop="htInstallLiftCount">
            <el-input-number v-model="selectInstall.htInstallLiftCount" :min="1"></el-input-number>(台)
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="电梯品牌" prop="htInstallLiftCompany">
            <el-input v-model="selectInstall.htInstallLiftCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item prop="htInstallDate" label="签订日期">
            <el-date-picker
              v-model="selectInstall.htInstallDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item prop="htInstallStartDate" label="生效日期">
            <el-date-picker
              v-model="selectInstall.htInstallStartDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item prop="htInstallEndDate" label="截至日期">
            <el-date-picker
              v-model="selectInstall.htInstallEndDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="安装费率" prop="htInstallFirstRate">
            <el-input @blur="computedDPrice" v-model="selectInstall.htInstallFirstRate">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="安装费" prop="htInstallFirstM">
            <el-input v-model="selectInstall.htInstallFirstM">
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="调试费率" prop="htInstallSecondRate">
            <el-input @blur="computedDPrice" v-model="selectInstall.htInstallSecondRate">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="调试费" prop="htInstallSecondM">
            <el-input v-model="selectInstall.htInstallSecondM">
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="质保费率" prop="htInstallThirdRate">
            <el-input @blur="computedDPrice" v-model="selectInstall.htInstallThirdRate">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="质保费" prop="htInstallThirdM">
            <el-input v-model="selectInstall.htInstallThirdM">
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item label="备注" prop="htInstallDesc">
            <el-input v-model="selectInstall.htInstallDesc"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="工程周期" prop="htInstallPlanDate">
            <el-date-picker
              v-model="selectInstall.htInstallPlanDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="甲方代表" prop="htInstallMan">
            <el-input v-model="selectInstall.htInstallMan"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="联系方式" prop="htInstallPhone">
            <el-input v-model="selectInstall.htInstallPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="6">
          <el-form-item label="乙方代表" prop="htInstallYiMan">
            <el-input v-model="selectInstall.htInstallYiMan"></el-input>
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
    name: "CreateInstallHT",
    data() {
      return {
        projects: {
          projectNum: '',
          projectName: ''
        },
        selectInstall: {
          pNum: '',
          htInstallNum: '',
          htInstallLiftCount: '',
          htInstallDate: '',
          htInstallStartDate: '',
          htInstallEndDate: '',
          htInstallLiftCompany: '',
          htInstallMoney: '',
          htInstallState: '',
          htInstallFirstRate: '',
          htInstallSecondRate: '',
          htInstallThirdRate: '',
          htInstallFirstM: '',
          htInstallSecondM: '',
          htInstallThirdM: '',
          htInstallFirstReady: '',
          htInstallSecondReady: '',
          htInstallThirdReady: '',
          htInstallDesc: '',
          htInstallZhibaoqi: '',
          htInstallFinishDate: '',
          htInstallPlanDate: '',
          htInstallMan: '',
          htInstallPhone: '',
          htInstallAddr: '',
          htInstallYiMan: ''
        },
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
      keepSave(){},
      cancelSave(){}
    }
  }
</script>

<style scoped>

</style>
