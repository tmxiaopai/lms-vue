<template>
  <div>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="notice in notices" :key="notice.noticeId">
        <div style="margin-top: 40px;font-size: 20px">
          {{notice.noticeName}}
        </div>
        <div style="margin-top: 80px;">
          {{notice.noticeContent}}
        </div>
        <div style="margin-top: 20px;">{{notice.noticeDate | dateFormat}}</div>
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-row :gutter="20">

        <el-col :sm="6">
         
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Welcome",
    data() {
      return {
        notices: []
      }
    },
    mounted() {
      this.refreshNotices()
    },
    methods: {
      refreshNotices() {
        axios.get('findWelcomeNotice').then(res => {
          this.notices = res.data
        })
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item div {
    color: #475669;
    font-size: 18px;
    text-align: center;
    opacity: 0.75;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #ffffff;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #ffffff;
  }

  .item {
    background-color: darkgrey;
    opacity: 0.5;
    height: 200px;
    text-align: center;

  }
  .itex{
    text-align: center;
  }
</style>
