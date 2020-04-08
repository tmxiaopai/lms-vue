<template>
  <el-container>
    <el-header>
      <div id="logo-info">电梯业务管理系统</div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse()">|||</div>
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="opened"
          :collapse="isCollapse"
          :collapse-transition="isTransition">
          <el-submenu :index="item.permissionId + ''" v-for="item in menuList" :key="item.permissionId">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.permissionName}}</span>
            </template>
            <el-menu-item :index="menu.permissionId + ''" v-for="menu in item.children" :key="menu.permissionId"
                          @click="handleMenu(menu)">
              <template slot="title">
                <i class="el-icon-aim"></i>
                <span>{{menu.permissionName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        opened: true,
        isCollapse: false,
        isTransition: false,
        menuList: []
      }
    },
    created() {
      this.getMenuList()
    },
    props: {},
    components: {},
    methods: {
      logout() {
        sessionStorage.clear()
        this.$router.push("/")
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      getMenuList() {
        axios.get('/findNavTree', {
          params: {
            userNum: sessionStorage.getItem('userNum')
          }
        }).then(res => {
          this.menuList = res.data
        })
      },
      handleMenu(menu) {
          this.$router.push(menu.permissionUrl)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .home-container {
    height 100%
  }

  .toggle-button {
    background-color rgb(84, 92, 100)
    font-size 10px
    line-height 24px
    text-align center
    letter-spacing 0.2em
    cursor pointer
  }

  .el-header {
    background-color: rgb(84, 92, 100);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color white
  }

  #logo-info {
    font-size: larger;
  }

  .el-aside {
    background-color: #cac6c6;

    .el-menu {
      border-right none
    }
  }

  .el-main {
    background-color: #eaeaea;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 400px;
  }

</style>
