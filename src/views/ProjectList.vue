<template>
  <div>
    <div id="searchBox">
      <el-row>
        <el-button type="info">新建</el-button>
        <el-autocomplete :fetch-suggestions="searchProject" placeholder="请输入项目名称"
                         ></el-autocomplete>
      </el-row>
    </div>
    <el-table :data="projects" style="width: 100%" height="650" border>
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
      <el-table-column fixed prop="projectNum" width="105" label="项目编号" sortable></el-table-column>
      <el-table-column fixed prop="projectName" label="项目名称" sortable></el-table-column>
      <el-table-column prop="projectType" width="100" label="项目类型"></el-table-column>
      <el-table-column prop="projectAddr" width="200" label="项目地址"></el-table-column>
      <el-table-column prop="projectCoopIn" width="110" label="合作意向" sortable></el-table-column>
      <el-table-column prop="projectNeedCount" width="110" label="需求数量" sortable></el-table-column>
      <el-table-column prop="projectDesc" label="项目描述"></el-table-column>
      <el-table-column prop="projectDesignDate" label="项目登记日期"></el-table-column>
      <el-table-column label="操作" width="150">
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

    <!--    侧框-->

    <el-drawer
      title="修改信息"
      :before-close="handleClose"
      :visible.sync="drawer"
      direction="rtl"
      custom-class="demo-drawer"
      ref="myDrawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="myForm" :model="selectPro" label-width="80px">
          <el-form-item label="项目编号">
            <el-input v-model="selectPro.projectNum"></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="selectPro.projectName"></el-input>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-input v-model="selectPro.projectType"></el-input>
          </el-form-item>
          <el-form-item label="项目地址">
            <el-input v-model="selectPro.projectAddr"></el-input>
          </el-form-item>
          <el-form-item label="项目">
            <el-input v-model="selectPro.projectCoopIn"></el-input>
          </el-form-item>
          <el-form-item label="需求数量">
            <el-input v-model="selectPro.projectNeedCount"></el-input>
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input v-model="selectPro.projectDesc"></el-input>
          </el-form-item>
          <el-form-item label="登记日期">
            <el-date-picker
              v-model="selectPro.projectDesignDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="$refs.myDrawer.closeDrawer()" :loading="loading">{{ loading === true ? "提交中 ..." : "修改" }}</el-button>
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
        formLabelWidth: '80px',
        timer: null,
        loading:false,
        drawer: false,
        customerNum:'',
        projects: [],
        selectPro: {
          projectNum:'',
          projectName:'',
          projectType:'',
          projectAddr:'',
          projectCoopIn:'',
          projectNeedCount:'',
          projectDesc:'',
          projectDesignDate:''
        },

      }
    },
    props: {
      projects: Array
    },
    methods: {
      handleEdit(index, row) {
        this.drawer = true
        console.log(index, row);
        this.selectPro = row
      },
      handleDelete(index, row) {
        console.log(index, row);
        console.log(this.cust)
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',

            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleClose(done) {
        if (this.loading) {
          return;
        }
        this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
            this.timer = setTimeout(() => {
              done();

              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 2000);
          })
          .catch(_ => {
          });
      },
      cancelForm() {
        this.loading = false;
        this.drawer = false;
        clearTimeout(this.timer);
      },
      searchProject(){

      }
    },
    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>
  #searchBox {
    margin-bottom: 20px;
  }
  .el-input{

  }
</style>
