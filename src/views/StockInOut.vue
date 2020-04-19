<template>
  <div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="配件出库" name="first">
        <el-form :model="selectIn" label-width="90px">

        </el-form>
      </el-tab-pane>
      <el-tab-pane label="配件入库" name="second">

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
        selectIn:{
          SName:'',
          SType:'',
          SNum:'',

        },
        selectOut:{

        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style scoped>

</style>
