<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="项目列表"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-form ref="searchForm" :model="selectPro1" label-width="90px">
      <el-row>
        <el-col :sm="5">
          <el-form-item label="项目名称" prop="projectName">
            <el-input class="search-in"  v-model="selectPro1.projectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="5">
          <el-form-item label="客户名称" prop="customerName">
            <el-input class="search-in" v-model="selectPro1.customerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="5">
          <el-form-item label="项目状态" prop="projectStatus">
            <el-select class="search-in" placeholder="请选择项目状态" v-model="selectPro1.projectStatus">
              <el-option label="无" value=""></el-option>
              <el-option label="洽谈中" value="洽谈中"></el-option>
              <el-option label="初步沟通" value="初步沟通"></el-option>
              <el-option label="现场勘察" value="现场勘察"></el-option>
              <el-option label="协商洽谈" value="协商洽谈"></el-option>
              <el-option label="合同签订" value="合同签订"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="5">
          <el-form-item label="合作意向" prop="projectIntention">
            <el-select class="search-in"  placeholder="请选择合作意向"
                       v-model="selectPro1.projectIntention">
              <el-option label="有合作意向" value="有合作意向"></el-option>
              <el-option label="意向不明确" value="意向不明确"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="2">
          <el-button type="primary" @click="searchProject">Search</el-button>
        </el-col>
      </el-row>
    </el-form>


    <el-table :data="projects" style="width: 100%;text-align: center" height="650" border>
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
      <el-table-column fixed prop="projectNum" width="150" label="项目编号" sortable></el-table-column>
      <el-table-column fixed prop="projectName" width="200" label="项目名称" sortable></el-table-column>
      <el-table-column prop="projectType" width="120" label="项目类型" sortable></el-table-column>
      <el-table-column prop="projectAddress" width="300" label="项目地址"></el-table-column>
      <el-table-column prop="projectIntention" width="120" label="合作意向" sortable></el-table-column>
      <el-table-column prop="needCount" width="105" label="需求数量" sortable></el-table-column>
      <el-table-column prop="projectStatus" width="105" label="项目状态" sortable></el-table-column>
      <el-table-column prop="salesman" label="销售人员"></el-table-column>
      <!--      <el-table-column prop="projectDesignDate" label=登记日期" sortable>-->
      <!--        <template slot-scope="scope" v-if="scope.row" >{{scope.row.projectDesignDate | dateFormat
      }}</template>-->
      <!--      </el-table-column>-->
      <el-table-column prop="customerName" width="140" label="客户名称" sortable></el-table-column>
      <el-table-column prop="customerMan" width="105" label="客户负责人"></el-table-column>
      <el-table-column prop="customerJob" label="职务"></el-table-column>
      <el-table-column prop="customerContact" width="120" label="联系方式"></el-table-column>
      <el-table-column prop="customerEmail" width="120" label="客户邮箱"></el-table-column>
      <el-table-column prop="bank" width="150" label="开户行"></el-table-column>
      <el-table-column prop="bankName" label="开户名"></el-table-column>
      <el-table-column prop="card" width="130" label="卡号"></el-table-column>
      <el-table-column prop="pDescription" label="项目备注"></el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-drawer
      title="修改信息"
      :before-close="updateClose"
      :visible.sync="updateF"
      direction="rtl"
      ref="DrawerU"
    >
      <div class="drawer-body">
        <el-form ref="myForm" :model="selectPro" label-width="80px">
          <el-form-item label="合作意向">
            <el-select placeholder="请选择合作意向" v-model="selectPro.projectIntention">
              <el-option label="有合作意向" value="有合作意向"></el-option>
              <el-option label="意向不明确" value="意向不明确"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input v-model="selectPro.pDescription"></el-input>
          </el-form-item>
          <el-form-item label="客户负责人">
            <el-input v-model="selectPro.customerMan"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="selectPro.customerJob"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="selectPro.customerContact"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="selectPro.customerEmail"></el-input>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="selectPro.bank"></el-input>
          </el-form-item>
          <el-form-item label="开户名">
            <el-input v-model="selectPro.bankName"></el-input>
          </el-form-item>
          <el-form-item label="卡号">
            <el-input v-model="selectPro.card"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="$refs.DrawerU.closeDrawer()" :loading="loadingF">{{ loadingF === true ?
            "提交中..." : "修改" }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "ProjectList",
    data() {
      return {
        loadingF: false,
        updateF: false,
        projects: [],
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
        selectPro1: {
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

      }
    },
    methods: {
      searchProject() {
        axios.post('searchProject', this.selectPro1).then(res => {
          this.projects = res.data
          console.log(res.data);
          this.$message.success('查询成功')
          this.$refs.searchForm.resetFields()
        })
      },
      backGo() {
        this.$router.go(-1)
      },
      refreshProjectList() {
        axios.get('findAllProject').then(res => {
          this.projects = res.data;
          console.log(res.data)
        })
      },
      handleEdit(index, row) {
        this.selectPro = row;
        this.updateF = true
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('deleteProject', row.projectNum).then(res => {
            if (res.data === 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.projects.splice(index, 1);
            } else {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
            }
            this.loadingS = false
          }).catch(error => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      updateClose(done) {
        if (this.loadingF) {
          return;
        }
        this.$confirm('确定要提交修改信息吗？', '提示')
          .then(_ => {
            this.loadingF = true;
            axios.post('updateProject', this.selectPro).then(res => {
              this.$message({
                type: "success",
                message: res.data
              });
              done();
              this.loadingF = false;
              this.$refs.myForm.resetFields()
            }).catch(error => {
              this.$message({
                type: "error",
                message: '修改失败，请刷新页面'
              })
              this.$refs.myForm.resetFields()
            })
          });
      },
      cancelUpdate() {
        this.loadingF = false;
        this.updateF = false;
        this.$refs.myForm.resetFields();
        this.$refs.searchForm.resetFields()
      }
    },
    mounted() {
      this.refreshProjectList();
    }
  }
</script>

<style lang="stylus" scoped>
  .el-input {
    width 400px
  }

  .search-in {
    width 200px
  }
</style>
