<template>
  <div>
    <div class="createBtn">
      <el-row>
        <el-button type="info" @click="keepSave">新建</el-button>
      </el-row>
    </div>
    <el-table :data="customers" style="width: 100%" height="650" border>
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
<!--      <el-table-column fixed prop="customerNum" width="110" label="客户编号" sortable></el-table-column>-->
      <el-table-column fixed prop="customerName" label="客户名称" sortable></el-table-column>
      <el-table-column prop="customerPhone" width="110" label="客户电话"></el-table-column>
      <el-table-column prop="customerPortraition" width="110" label="客户传真"></el-table-column>
      <el-table-column prop="customerEmail" width="200" label="客户邮箱"></el-table-column>
      <el-table-column prop="customerType" width="110" label="客户类型" sortable></el-table-column>
      <el-table-column prop="customerOpenBank" label="开户行"></el-table-column>
      <el-table-column prop="customerOpenName" label="开户名"></el-table-column>
      <el-table-column prop="customerOpenCard" label="银行卡号"></el-table-column>
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
      title="客户登记"
      :before-close="saveClose"
      :visible.sync="save"
      direction="ltr"
      ref="Drawer"
    >
      <div class="drawer-body">
        <el-form ref="myForm" :model="selectCus" label-width="80px">
          <el-form-item label="客户名称">
            <el-input v-model="selectCus.customerName"></el-input>
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input v-model="selectCus.customerPhone"></el-input>
          </el-form-item>
          <el-form-item label="客户传真">
            <el-input v-model="selectCus.customerPortraition"></el-input>
          </el-form-item>
          <el-form-item label="客户邮箱">
            <el-input v-model="selectCus.customerEmail"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-input v-model="selectCus.customerType"></el-input>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="selectCus.customerOpenBank"></el-input>
          </el-form-item>
          <el-form-item label="开户名">
            <el-input v-model="selectCus.customerOpenName"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-model="selectCus.customerOpenCard"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelSave">取 消</el-button>
          <el-button type="primary" @click="$refs.Drawer.closeDrawer()" :loading="loading">{{ loading === true ? "提交中..." : "保存" }}
          </el-button>
        </div>
      </div>
    </el-drawer>

    <el-drawer
      title="修改信息"
      :before-close="updateClose"
      :visible.sync="drawer"
      direction="rtl"
      ref="myDrawer"
    >
      <div class="drawer-body">
        <el-form ref="myForm" :model="selectCus" label-width="80px">
          <el-form-item label="客户名称">
            <el-input v-model="selectCus.customerName" disabled ></el-input>
          </el-form-item>
          <el-form-item label="客户电话">
            <el-input v-model="selectCus.customerPhone"></el-input>
          </el-form-item>
          <el-form-item label="客户传真">
            <el-input v-model="selectCus.customerPortraition"></el-input>
          </el-form-item>
          <el-form-item label="客户邮箱">
            <el-input v-model="selectCus.customerEmail"></el-input>
          </el-form-item>
          <el-form-item label="客户类型">
            <el-input v-model="selectCus.customerType"></el-input>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="selectCus.customerOpenBank"></el-input>
          </el-form-item>
          <el-form-item label="开户名">
            <el-input v-model="selectCus.customerOpenName"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-model="selectCus.customerOpenCard"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="$refs.myDrawer.closeDrawer()" :loading="loading1">{{ loading1 === true ?
            "提交中 ..." : "修改" }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "CustomerList",
    data() {
      return {
        loading: false,
        loading1: false,
        save: false,
        drawer: false,
        selectCus: {
          customerNum: '',
          customerName: '',
          customerPhone: '',
          customerPortraition: '',
          customerEmail: '',
          customerType: '',
          customerOpenBank: '',
          customerOpenName: '',
          customerOpenCard: ''
        },
        customers: []
      }
    },
    props: {
      //customers: Array
    },
    methods: {
      refreshCustomers() {
        axios.get('findAllCustomer').then(res => {
          this.customers = res.data
        })
      },
      handleEdit(index, row) {
        this.selectCus = row
        this.drawer = true
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('deleteCustomer',row.customerNum).then(res=>{
            this.customers.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(res=>{
            this.$message({
              type: 'err',
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
        if (this.loading1) {
          return;
        }
        this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading1 = true;
            let mesOk = null;
            axios.post('updateCustomer', this.selectCus).then(res => {
              mesOk = res.data
            });
            done();
            this.loading1 = false
            this.$message.success(mesOk)
            this.refreshCustomers()
          })
          .catch(_ => {
          });
      },
      keepSave() {
        this.save = true
      },
      saveClose(done) {
        if (this.loading) {
          return;
        }
        this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.loading = true;
              axios.post('insertCustomer', this.selectCus).then(res => {
                this.$message.success(res.data);

            });


            this.customers.push(this.selectCus);
            this.loading = false;
            this.saveF=false;
            done();
          })
          .catch(_ => {
          });

        this.refreshCustomers()
      },
      cancelSave() {
        this.loading = false;
        this.save = false;
      },
      cancelUpdate(){
        this.loading1 = false;
        this.drawer = false;
      },
    },
    mounted() {
      this.refreshCustomers();
    }
  }
</script>

<style lang="stylus" scoped>
  #searchBox {
    margin-bottom: 20px;
  }
  .el-input{
    width 400px
  }
</style>
