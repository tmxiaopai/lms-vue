<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="设备列表"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-form :model="selectLift1" ref="selectLift1" label-width="90px">
      <div style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :sm="6">
            <el-form-item label="所属项目" prop="projectNum">
              <el-select v-model="selectLift1.projectNum" placeholder="请选择项目">
                <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                           :value="item.projectNum"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="电梯类型" prop="type">
              <el-select v-model="selectLift1.type" placeholder="请选择电梯类型">
                <el-option label="日立A1" value="日立A1"></el-option>
                <el-option label="日立A2" value="日立A2"></el-option>
                <el-option label="日立A3" value="日立A3"></el-option>
                <el-option label="日立A4" value="日立A4"></el-option>
                <el-option label="日立A5" value="日立A5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="出厂编号" prop="factoryNum">
              <el-input v-model="selectLift1.factoryNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="3">
            <el-button type="primary" @click="searchLift">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-table :data="lifts" border height="650">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column label="所属项目" prop="projectNum"></el-table-column>
      <el-table-column label="电梯类型" prop="type"></el-table-column>
      <el-table-column label="层/站" prop="cz"></el-table-column>
      <el-table-column label="速度" prop="speed"></el-table-column>
      <el-table-column label="载重量" prop="deadWeight"></el-table-column>
      <el-table-column label="单价" prop="unitPrice"></el-table-column>
      <el-table-column label="出厂编号" prop="factoryNum"></el-table-column>
      <el-table-column label="设备数量" prop="deviceCount"></el-table-column>
      <el-table-column label="备注" prop="liftDescription"></el-table-column>
      <el-table-column label="年检日期" prop="checkYearDate">
        <template slot-scope="scope">
          {{scope.row.checkYearDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div>
      <el-dialog
        title="修改信息"
        :visible.sync="dialogVisible"
        width="20%"
        :before-close="handleClose">

        <el-form :model="selectLift" ref="selectLift" label-width="90px">
          <el-row>
            <el-col>
              <el-form-item label="电梯类型" prop="type">
                <el-select style="width: 200px" v-model="selectLift.type" placeholder="请选择电梯类型">
                  <el-option label="日立A1" value="日立A1"></el-option>
                  <el-option label="日立A2" value="日立A2"></el-option>
                  <el-option label="日立A3" value="日立A3"></el-option>
                  <el-option label="日立A4" value="日立A4"></el-option>
                  <el-option label="日立A5" value="日立A5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="出厂编号" prop="factoryNum">
                <el-input style="width: 200px" v-model="selectLift.factoryNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="层站" prop="cz">
                <el-input style="width: 200px" v-model="selectLift.cz"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="速度" prop="speed">
                <el-input style="width: 200px" v-model="selectLift.speed">
                  <template slot="append">m/s</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="载重量" prop="deadWeight">
                <el-input style="width: 200px" v-model="selectLift.deadWeight">
                  <template slot="append">KG</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="年检日期" prop="checkYearDate">
                <el-date-picker style="width: 200px" v-model="selectLift.checkYearDate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>


        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateLift">保存</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailLift",
    data() {
      return {
        dialogVisible: false,
        lifts: [],
        selectLift1:{
          projectNum: '',
          type: '',
          factoryNum: ''
        },
        projects:[],
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
      this.refreshLiftList()
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    },
    methods: {
      searchLift(){
        axios.post('searchLiftByLift',this.selectLift1).then(res=>{
          this.lifts=res.data
          this.$message.success('查询成功')
          this.$refs.selectLift1.resetFields()
        })
      },
      updateLift() {
        axios.post('updateLift', this.selectLift).then(res => {
          if (res.data == 1) {
            this.$message.success("信息修改成功")
            this.dialogVisible = false
          } else {
            this.$message.error("出现意外，请重试!")
          }
        })
      },
      handleEdit(index, row) {
        this.dialogVisible = true
        this.selectLift = row
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      refreshLiftList() {
        axios.get('findAllLift').then(res => {
          this.lifts = res.data
        })
      },
      backGo() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>
