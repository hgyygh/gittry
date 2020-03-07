<template>
  <div class="rights">
    <!-- 面包屑：路径导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格区域 -->
    <template>
      <el-table
        :data="rightList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="层级"
          width="180"
        >
        <template slot-scope="scope">
            <span>{{scope.row.level | levelFormat}}</span>
        </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import {getAllRights} from '@/api'
export default {
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    getAllRights('list').then(res => {
      this.rightList = res.data
    })
  },
  //   在单文件组件中，通过filters创建局部过滤器--只有当前组件中可以使用，它是一个对象，对象中的每一个值都是一个过滤器函数，每一个过滤器函数都会有一个默认的参数
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
