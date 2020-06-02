<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="设备列表"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-form :model="selectLift" ref="selectLift" label-width="90px">
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="所属项目" prop="projectNum">
            <el-select v-model="selectLift.projectNum" placeholder="请选择项目">
              <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                         :value="item.projectNum"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="电梯类型" prop="type">
            <el-select v-model="selectLift.type" placeholder="请选择电梯类型">
              <el-option label="日立A1" value="日立A1"></el-option>
              <el-option label="日立A2" value="日立A2"></el-option>
              <el-option label="日立A3" value="日立A3"></el-option>
              <el-option label="日立A4" value="日立A4"></el-option>
              <el-option label="日立A5" value="日立A5"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="出厂编号" prop="factoryNum">
            <el-input v-model="selectLift.factoryNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="层站" prop="cz">
            <el-input v-model="selectLift.cz"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="速度" prop="speed">
            <el-input v-model="selectLift.speed">
              <template slot="append">m/s</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="载重量" prop="deadWeight">
            <el-input v-model="selectLift.deadWeight">
              <template slot="append">KG</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="6">
          <el-form-item label="数量" prop="deviceCount">
            <el-input-number :min="1" v-model="selectLift.deviceCount"></el-input-number>
            (台)
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="btn-bottom">
        <el-col :span="2" :offset="2">
          <el-button type="primary" @click="keepSave">保存</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="cancelSave">取消</el-button>
        </el-col>
      </el-row>
    </el-form>


  </div>
</template>

<script>
  export default {
    name: "CreateLift",
    data() {
      return {
        projects: {
          projectNum: '',
          projectName: ''
        },
        selectLift: {
          id: '',
          type: '',
          cz: '',
          speed: '',
          deadWeight: '',
          unitPrice: '',
          factoryNum: '',
          installUnitPrice: '',
          liftInstall: '',
          liftTs: '',
          total: '',
          deviceCount: '',
          subTotal: '',
          liftDescription: '',
          installStatus: '',
          checkYearDate: '',
          projectNum: ''
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
      cancelSave() {
      },
      keepSave() {
        this.$confirm('确定提交该信息吗？', '提示').then(_ => {
          axios.post('insertLift', this.selectLift).then(res => {
            if (res.data == 1) {
              this.$message.success('提交成功');
              this.$router.push('/7')
            } else {
              this.$message.error('提交失败，请重试')
            }
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
