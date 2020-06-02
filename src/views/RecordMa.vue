<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="维保列表"></el-page-header>
    </div>

    <el-divider></el-divider>

    <el-form :model="selectM" ref="selectLift1" label-width="90px">
      <div style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :sm="6">
            <el-form-item label="所属项目" prop="projectNum">
              <el-select clearable v-model="selectM.projectNum" placeholder="请选择项目">
                <el-option v-for="item in projects" :key="item.projectNum" :label="item.projectName"
                           :value="item.projectNum"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="5">
            <el-form-item label="电梯编号" prop="factoryNum">
              <el-input clearable v-model="selectM.factoryNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="5">
            <el-form-item label="日期" prop="rmDate">
              <el-date-picker v-model="selectM.rmDate" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="3">
            <el-button type="primary" @click="searchMa">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <el-table :data="records" border height="650">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="电梯编号" prop="factoryNum"></el-table-column>
      <el-table-column label="项目名称" prop="projectName"></el-table-column>
      <el-table-column label="客户名称" prop="customerName"></el-table-column>
      <el-table-column label="项目地址" prop="projectAddress"></el-table-column>
      <el-table-column label="维保日期" sortable prop="rmDate">
        <template slot-scope="scope">
          {{scope.row.rmDate|dateFormat1}}
        </template>
      </el-table-column>
      <el-table-column label="维保类型" prop="rmType"></el-table-column>
      <el-table-column label="维保人员" prop="rmUser"></el-table-column>
      <el-table-column label="维保情况" prop="rmDescription"></el-table-column>
      <el-table-column label="URL" prop="rmUrl"></el-table-column>
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

    <el-dialog
      title="修改信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form :model="selectReM" label-width="90px">
        <el-row>
          <el-col :sm="12">
            <el-form-item label="记录号" prop="rmId">
              <el-input disabled v-model="selectReM.rmId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="电梯编号" prop="factoryNum">
              <el-input disabled v-model="selectReM.factoryNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12">
            <el-form-item label="维保日期" prop="rmDate">
              <el-input disabled v-model="selectReM.rmDate" type="date"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="维保类型" prop="rmType">
              <el-select v-model="selectReM.rmType" placeholder="请选择类型">
                <el-option value="半月" label="半月"></el-option>
                <el-option value="整月" label="整月"></el-option>
                <el-option value="半年" label="半年"></el-option>
                <el-option value="年检" label="年检"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12">
            <el-form-item label="维保人员" prop="">
              <el-input v-model="selectReM.rmUser"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="URL" prop="">
              <el-upload
                class="upload-demo"
                action="http://localhost:8005/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleUpload"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="24">
            <el-form-item label="维保情况" prop="rmDescription">
              <el-input type="textarea" v-model="selectReM.rmDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRM">保存</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "RecordMa",
    data() {
      return {
        fileList: [],
        dialogVisible: false,
        records: [],
        selectM: {
          factoryNum: '',
          projectNum: '',
          rmDate: ''
        },
        projects: [],
        selectReM: {
          rmId: '',
          factoryNum: '',
          rmDate: '',
          rmUser: '',
          rmUrl: '',
          rmType: '',
          rmDescription: ''
        }
      }
    },
    methods: {
      searchMa(){
        axios.post('searchRMaByE',this.selectM).then(res=>{
          this.records=res.data
          this.$message.success('查询成功')
        })
      },
      updateRM() {
        this.$confirm('确定保存本条记录吗？', '提示').then(_ => {
          console.log(this.selectReM);
          axios.post('updateRM', this.selectReM).then(res => {
            if (res.data == 1) {
              this.$message.success('保存成功')
              this.dialogVisible = false
              this.refreshRecords()
            } else {
              this.$message.error('出现错误，请刷新后重试')
            }
          }).catch(err => {
            console.log(err)
          })
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleUpload(res,file,fileList){
        this.selectReM.rmUrl=file.name
        console.log(res)
        console.log(file.name)
        console.log(fileList)
      },
      handlePreview(file) {
        console.log(file);
        this.selectReM.rmURL=file.name
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      backGo() {
        this.$router.go(-1)
      },
      handleEdit(index, row) {
        this.dialogVisible = true
        this.selectReM = row
      },
      refreshRecords() {
        axios.get('findALlRMS').then(res => {
          this.records = res.data
        })
      }
    },
    mounted() {
      this.refreshRecords()
      axios.get('findAllProjectName').then(res => {
        this.projects = res.data
      })
    }
  }
</script>

<style scoped>

</style>
