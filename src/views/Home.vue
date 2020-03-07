<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <router-link to='/home'>
          <div class="logo"></div>
        </router-link>
        <el-menu
          class="el-menu-vertical-demo el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened='true'
          :router='true'
          :collapse='collapse'
        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key='item.id'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- users -->
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key='subitem.id'>
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subitem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <a href="javascrip:;" @click='collapse=!collapse'  class="myicon myicon-menu toggle-btn"></a>
          <span class="system-title">电商后台管理系统</span>
          <div><span class="welcome">欢迎你：{{currentUserName}}</span> <el-button type="text" @click='logout'>退出</el-button></div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {GetLeftMenus} from '@/api'
export default {
  data () {
    return {
      collapse: false,
      menuList: [],
      currentUserName: ''
    }
  },
  mounted () {
    GetLeftMenus()
      .then(res => {
        if (res.meta.status === 200) {
          this.menuList = res.data
        }
      })
    this.currentUserName = this.$store.getters.getUserName
    console.log('---')
    console.log(this.$store.state)
  },
  methods: {
    // 退出功能
    logout () {
      // console.log(this.$store.state.username)
      // 清除存储的token值
      localStorage.removeItem('itcast_token')
      // 跳转到登陆
      this.$router.push({name: 'Login'})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #ffffff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
