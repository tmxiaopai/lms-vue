<template>
  <div>
    <div class="page-title">
      <el-page-header @back="backGo" content="公告列表"></el-page-header>
    </div>
    <el-divider></el-divider>
    <el-table :data="notices" height="650" border>
      <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
<!--      <el-table-column fixed prop="noticeId" label="公告ID"></el-table-column>-->
      <el-table-column fixed prop="noticeName" sortable label="公告标题"></el-table-column>
      <el-table-column prop="noticeContent" label="公告内容"></el-table-column>
      <el-table-column prop="noticeDate" label="发布时间" sortable>
        <template slot-scope="scope">{{scope.row.noticeDate| dateFormat}}</template>
      </el-table-column>
      <el-table-column prop="noticeMan" label="发布人" sortable></el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="create-btn">
      <el-row>
       <el-col :span="2" :offset="22">
         <el-button @click="saveNotice" type="info">新建公告</el-button>
       </el-col>
      </el-row>
    </div>

    <el-drawer
      title="新建公告"
      :before-close="saveClose"
      :visible.sync="drawer"
      direction="ltr"
      ref="Drawer">
      <div class="drawer-body">
        <el-form ref="myForm" :rules="rules" :model="selectNot">
          <el-form-item label="公告标题">
            <el-input v-model="selectNot.noticeName"></el-input>
          </el-form-item>
          <el-form-item label="公告内容">
            <el-input v-model="selectNot.noticeContent"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="cancelForm">取消</el-button>
        <el-button @click="$refs.Drawer.closeDrawer()" type="primary" :loading="loading">{{loading === true ? "提交中..." :
          "保存"}}
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "NoticeList",
    data() {
      return {
        drawer: false,
        notices: [],
        loading:false,
        timer:null,
        selectNot: {
          noticeId:'',
          noticeName: '',
          noticeContent: ''
        },
        rules:{
          noticeName:[{required:true,message:'请输入公告标题',trigger:'blur'}],
          noticeContent:[{required:true,message:'请输入公告标题',trigger:'blur'}]
        }
      }
    },
    methods: {
      backGo(){
        this.$router.go(-1)
      },
      refreshNotices(){
        axios.get('findAllNotice').then(res=>{
          this.notices=res.data
        })
      },
      saveNotice() {
        this.drawer = true
      },
      handleDelete(index, row) {
        console.log(index, row);
        const sNo = row;
        this.$confirm('此操作将删除该记录，是否继续？','提示',{
          confirmButtonText:'确定',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          axios.post('deleteNotice',sNo.noticeId).then(_=>{
            this.notices.splice(index,1);
            this.$message({
              type: "success",
              message: '删除成功！'
            })
          }).catch(_=>{
            this.$message({
              type :"error",
              message: '删除失败！'
            })
          })
        }).catch(()=>{
          this.$message({
            type:"info",
            message:'已取消删除'
          })
        })

      },
      saveClose(done) {
        if (this.loading) {
          return;
        }
        this.$confirm('确定提交表单吗？').then(_ =>{
          this.loading=true;
          let saveMes = null;
          axios.post('insertNotice',this.selectNot).then(res=>{
            saveMes = res.data
          });

          this.timer = setTimeout(()=>{
            done();
            setTimeout(()=>{
              this.loading=false;
              this.$message({
                type:"success",
                message:saveMes
              });
              this.refreshNotices()
              this.$refs.MyForm.resetFields()
            },400)
          },1000)
        }).catch(_=>{

        })

      },
      cancelForm(){
        this.loading=false;
        this.drawer=false;
        clearTimeout(this.timer)
      }
    },
    mounted() {
      this.refreshNotices()
    }
  }
</script>

<style lang="stylus" scoped>
  .el-input{
    width 400px
  }
  .drawer-body{
    align-items center
  }
</style>
