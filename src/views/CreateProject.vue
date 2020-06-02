<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="项目登记"></el-page-header>
    </div>

    <el-divider></el-divider>

    <el-form :model="selectPro" :rules="rules" ref="selectPro"  label-width="90px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="项目编号:" prop="projectNum">
            <el-input v-model="selectPro.projectNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称:" prop="projectName">
            <el-input v-model="selectPro.projectName" @blur="nameOk"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客户名称" prop="customerName">
            <el-input v-model="selectPro.customerName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="项目类型:" prop="projectType">
            <el-select v-model="selectPro.projectType" placeholder="请选择项目类型">
              <el-option label="家装" value="家装"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-form-item label="合作意向" prop="projectIntention">
            <el-select v-model="selectPro.projectIntention" placeholder="合作意向">
              <el-option label="有合作意向" value="有合作意向"></el-option>
              <el-option label="意向不明确" value="意向不明确"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-form-item label="需求数量">
            <el-input-number v-model="selectPro.needCount" :min="1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="项目地址" prop="projectAddress">
            <el-input v-model="selectPro.projectAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="联系人">
            <el-input v-model="selectPro.customerMan"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="职位">
            <el-input v-model="selectPro.customerJob"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="联系方式">
            <el-input v-model="selectPro.customerContact"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮箱">
            <el-input v-model="selectPro.customerEmail"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="开户行">
            <el-input v-model="selectPro.bank"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="开户名">
            <el-input v-model="selectPro.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡号">
            <el-input v-model="selectPro.card"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-form-item label="项目备注">
            <el-input v-model="selectPro.pDescription"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2" :offset="4">
          <el-button type="primary" @click="keepSave('selectPro')">保存</el-button>
        </el-col>
        <el-col :span="2" :offset="4">
          <el-button type="info" @click="cancelSave">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "CreateProject",
    data() {
      return {
        selectPro: {
          projectNum: '',
          projectName: '',
          projectType: '',
          projectAddress: '',
          projectIntention: '',
          needCount: '',
          projectStatus: '',
          pDescription: '',
          salesman: '',
          customerName: '',
          customerMan: '',
          customerJob: '',
          customerContact: '',
          customerEmail: '',
          bank: '',
          bankName: '',
          card: '',
          projectDesignDate: ''
        },
        rules: {
          projectNum: [
            {required: true, message: '请输入项目编号', trigger: 'blur'}
          ],
          projectName: [
            {required: true, message: '请输入项目名称', trigger: 'blur'}
          ],
          projectType: [
            {required: true, message: '请选择项目类型', trigger: 'blur'}
          ],
          projectAddress: [
            {required: true, message: '请输入项目地址', trigger: 'blur'}
          ],
          projectIntention: [
            {required: true, message: '请选择合作意向', trigger: 'blur'}
          ],
          needCount: [],
          // projectStatus: [],
          // pDescription: [],
          // salesman: [],
          customerName: [
            {required: true, message: '请输入客户名称', trigger: 'blur'}
          ],
          customerMan: [
            {required: true, message: '请输入客户负责人', trigger: 'blur'}
          ],
          customerJob: [
            {required: true, message: '请输入职位', trigger: 'blur'}
          ],
          customerContact: [
            {required: true, message: '请输入联系方式', trigger: 'blur'},
            {type: 'number', message: '请输入正确的联系方式', trigger: 'blur'}
          ],
          customerEmail: [
            {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
          ],
          // bank: [],
          // bankName: [],
          card: [
            {type: 'number', message: '卡号为数值', trigger: 'blur'}
          ],
          // projectDesignDate: []
        },
      }
    },
    methods: {
      keepSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('insertProject', this.selectPro).then(res => {
              this.$message({
                type: "info",
                message: res.data
              });
              this.$router.push('1')
            })
          } else {
            return false;
          }
        });

      },
      cancelSave() {
        this.$router.go(-1)
      },
      backGo(){
        this.$router.go(-1)
      },
      nameOk() {
        axios.post('nameOk', this.selectPro.projectName).then(res => {
          if (res.data === 0) {
            this.$message({
              type: "success",
              message: "该项目名称有效"
            })
          } else {
            this.$message({
              type: "error",
              message: "该项目名称重复，项目名称不可用"
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
