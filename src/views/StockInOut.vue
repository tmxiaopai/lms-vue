<template>
  <div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="配件出库" name="first">
        <el-form :model="selectIn" ref="sout" label-width="90px">
          <el-row :gutter="20">
            <el-col :sm="5">
              <el-form-item label="配件编号" prop="stockNum">
                <el-select v-model="selectIn.stockNum" placeholder="请选择配件">
                  <el-option v-for="item in stocks" :key="item.sNum" :value="item.sNum"
                             :label="item.sName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :sm="5">
              <el-form-item label="数量" prop="sioCount">
                <el-input-number :min="1" v-model="selectIn.sioCount"></el-input-number>
              </el-form-item>
            </el-col>

            <el-col :sm="5">
              <el-form-item label="领件人" prop="sioGoMan">
                <el-input v-model="selectIn.sioGoMan"></el-input>
              </el-form-item>
            </el-col>

            <el-col :sm="5">
              <el-form-item label="出库原因" prop="sioReason">
                <el-select v-model="selectIn.sioReason" placeholder="请选择出库原因">
                  <el-option label="更换配件" value="更换配件"></el-option>
                  <el-option label="零售" value="零售"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-button type="primary" @click="keepOut">出库</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="info" @click="cancelSave">取消</el-button>
            </el-col>
          </el-row>
        </el-form>

        <el-table style="margin-top: 10px" :data="recordOut" height="600" border>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="材料编号" prop="stockNum"></el-table-column>
          <el-table-column label="出库时间" prop="sioDate">
            <template slot-scope="scope">
              {{scope.row.sioDate|dateFormat}}
            </template>
          </el-table-column>
          <el-table-column label="领件人" prop="sioGoMan"></el-table-column>
          <el-table-column label="经办人" prop="sioUser"></el-table-column>
          <el-table-column label="数量" prop="sioCount"></el-table-column>
          <el-table-column label="出库原因" prop="sioReason"></el-table-column>
        </el-table>
      </el-tab-pane>


      <el-tab-pane label="配件入库" name="second">
        <el-form :model="selectIn" ref="sin" label-width="90px">
          <el-row :gutter="20">
            <el-col :sm="6">
              <el-form-item label="配件编号" prop="stockNum">
                <el-select v-model="selectIn.stockNum" placeholder="请选择配件">
                  <el-option v-for="item in stocks" :key="item.sNum" :value="item.sNum"
                             :label="item.sName"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :sm="6">
              <el-form-item label="数量" prop="sioCount">
                <el-input-number :min="1" v-model="selectIn.sioCount"></el-input-number>
              </el-form-item>
            </el-col>

            <el-col :sm="6">
              <el-form-item label="入库原因" prop="sioReason">
                <el-select v-model="selectIn.sioReason" placeholder="请选择入库原因">
                  <el-option label="补充库存" value="补充库存"></el-option>
                  <el-option label="维保退货" value="维保退货"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-button type="primary" @click="keepIn">入库</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="info" @click="cancelSave">取消</el-button>
            </el-col>
          </el-row>
        </el-form>

        <el-table style="margin-top: 10px" :data="recordIn" height="600" border>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="材料编号" prop="stockNum"></el-table-column>
          <el-table-column label="入库时间" prop="sioDate">
            <template slot-scope="scope">
              {{scope.row.sioDate|dateFormat}}
            </template>
          </el-table-column>
          <el-table-column label="经办人" prop="sioUser"></el-table-column>
          <el-table-column label="数量" prop="sioCount"></el-table-column>
          <el-table-column label="入库原因" prop="sioReason"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "StockInOut",
    data() {
      return {
        activeName: 'first',
        selectIn: {
          sioId: '',
          stockNum: '',
          sioCount: '',
          sioReason: '',
          sioGoMan:''
        },
        stocks: {
          sNum: '',
          sName: ''
        },
        recordIn: [],
        recordOut: []
      };
    },
    mounted() {
      axios.get('findStockMainInfo').then(res => {
        console.log(res.data);
        this.stocks = res.data
      })
      this.refreshInList()
      this.refreshOutList()
    },
    methods: {
      refreshInList() {
        axios.get('findAllInStock').then(res => {
          this.recordIn = res.data
        })
      },
      refreshOutList() {
        axios.get('findAllOutStock').then(res => {
          this.recordOut = res.data
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      cancelSave() {
        this.$refs.sin.resetFields();
        this.$refs.sout.resetFields();
      },
      keepIn() {
        this.$confirm('确定要执行该操作吗？', '提示').then(_ => {
          axios.post("insertInStock", this.selectIn).then(res => {
            if (res.data == 1) {
              this.$message.success('入库成功');
              this.$refs.sin.resetFields();
              this.refreshInList()
            } else {
              this.$message.error('出现异常请重新尝试')
            }
          })
        })
      },
      keepOut() {
        this.$confirm('确定要执行该操作吗？', '提示').then(_ => {
          axios.post("insertOutStock", this.selectIn).then(res => {
            if (res.data == 1) {
              this.$message.success('出库成功');
              this.$refs.sout.resetFields();
              this.refreshOutList()
            } else if (res.data = 2) {
              this.$message.error('库存不足')
            } else {
              this.$message.error('出现异常请重新尝试')
            }
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
