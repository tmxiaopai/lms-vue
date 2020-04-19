<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="stylus">
  #app {
    font-family Helvetica, "Microsoft YaHei UI";
  }
  .createBtn{
    margin-bottom 20px
  }
  .drawer-body{
    margin-left 50px
    .el-button{
      margin-left  85px
    }
  }

  .create-btn {
    margin-top: 20px;
  }
  .page-title{

  }
  .btn-bottom {
    margin-top 50px
  }
</style>
