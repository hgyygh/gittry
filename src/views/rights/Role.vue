<template>
  <div class="rights">
    <!-- 面包屑：路径导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-button
        type="success"
        plain
        @click='adddialogFormVisible = true'
      >添加角色</el-button>
    </div>
    <!-- 数据表格区域 -->
    <template>
      <el-table
        :data="rolesList"
        border
        style="width: 100%;margin-top:15px;"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="first in scope.row.children"
              :key="first.id"
            >
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-tag
                    closable
                    type="success"
                    @close='removeRight(scope.row,first.id)'
                  >
                    {{first.authName}}
                  </el-tag>
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple-light">
                  <el-row
                    v-for="second in first.children"
                    :key="second.id"
                  >
                    <el-col :span="4">
                      <div class="grid-content bg-purple">
                        <el-tag
                          closable
                          type="info"
                          @close='removeRight(scope.row,second.id)'
                        >
                          {{second.authName}}
                        </el-tag>
                      </div>
                    </el-col>
                    <el-col :span="20">
                      <div class="grid-content bg-purple-light">
                        <el-tag
                          v-for="third in second.children"
                          :key="third.id"
                          closable
                          type="warning"
                          @close='removeRight(scope.row,third.id)'
                        >
                          {{third.authName}}
                        </el-tag>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <span v-show='scope.row.children.length === 0'>没有相关权限，请前往授权</span>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
        >
        </el-table-column>
        <el-table-column
          label="描述"
          prop="roleDesc"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              content="编辑"
              placement="top"
            >
              <el-button
                type='primary'
                icon="el-icon-edit"
                size="mini"
                plain
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="删除"
              placement="top"
            >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                plain
              ></el-button>
            </el-tooltip>
            <el-tooltip
              content="角色授权"
              placement="top"
            >
              <el-button
                size="mini"
                type="info"
                icon="el-icon-share"
                plain
                @click='showGrantDialog(scope.row)'
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 角色授权对话框 -->
    <el-dialog
      title="角色授权"
      :visible.sync="grantdialogFormVisible"
    >
      <div class="box">
        <el-tree
          ref='tree'
          :data="rightList"
          show-checkbox
          node-key="id"
          :default-expand-all='true'
          :default-checked-keys="selectedNode"
          :props="defaultProps"
        >
        </el-tree>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="grantSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="adddialogFormVisible"
    >
      <el-form
        :model="addform"
        label-width="80px"
      >
        <el-form-item label="角色名称">
          <el-input
            v-model="addform.roleName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="addform.roleDesc"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addRoleSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetRolesList,
  getAllRights,
  grantRightForRole,
  deleteRightByRoleId,
  addRole
} from '@/api'
export default {
  data () {
    return {
      grantdialogFormVisible: false,
      adddialogFormVisible: false,
      addform: {
        roleName: '',
        roleDesc: ''
      },
      rolesList: [],
      rightList: [],
      roleId: '',
      selectedNode: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    // 添加角色
    addRoleSubmit () {
      addRole(this.addform).then(res => {
        if (res.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加角色成功'
          })
          this.init()
          this.adddialogFormVisible = false
        } else {
          this.$message({
            type: 'warning',
            message: '失败'
          })
        }
      })
    },
    removeRight (row, rightid) {
      deleteRightByRoleId(row.id, rightid).then(res => {
        console.log(res)
        // 我们当然没有必要且也不能刷新整个表格的数据，因为它不利于用户体验
        // 我们发现：操作成功之后，会返回当前角色还拥有的权限数据，根据vue的数据绑定原理，如果数据源发生变化，那么页面结构也会有相应的变化。所以我们希望使用返回的数据直接覆盖当前展示行的数据源--scope.row.children
        // this.init()
        if (res.meta.status === 200) {
          console.log(res)
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          row.children = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.meta.msg
          })
        }
      })
    },
    // 实现角色授权的提交
    grantSubmit () {
      // 如果没有选择某个节点的所有子节点，那么只能获取到子节点的node-key,而不能获取到父级节点的node-key
      // console.log(this.$refs.tree.getCheckedKeys())
      var seletedNodes = this.$refs.tree.getCheckedNodes() // 对象数组
      // 遍历 ：["105,104,101","116,104,101"]
      var nodes = seletedNodes.map((value, index) => {
        // 105  101,104 > 105,101,104
        return value.id + ',' + value.pid
      })
      var joinStr = nodes.join(',') // 105,104,101,116,104,101
      // 去重复
      var set = new Set(joinStr.split(','))
      // 将set对象的成员值转换为数组：利用Array.from将Set结构转换成数组
      var finalArr = Array.from(set)
      var finalRid = finalArr.join(',') // 105,116,104,101
      grantRightForRole(this.roleId, finalRid).then(res => {
        if (res.meta.status === 200) {
          this.$message.success('更新权限成功')
          this.grantdialogFormVisible = false
          this.init()
        }
      })
    },
    //  弹出角色授权对话框
    showGrantDialog (row) {
      this.grantdialogFormVisible = true
      this.roleId = row.id
      // 获取所有权限数据
      getAllRights('tree').then(res => {
        // console.log(res.data)
        this.rightList = res.data
      })
      // 先清空数组中之前的所有id
      this.selectedNode.length = 0
      // 获取当前角色的所的权限id
      row.children.forEach((first, index) => {
        if (first.children && first.children.length > 0) {
          first.children.forEach((second, index) => {
            if (second.children && second.children.length > 0) {
              second.children.forEach((third, index) => {
                this.selectedNode.push(third.id)
              })
            }
          })
        }
      })
    },
    init () {
      GetRolesList().then(res => {
        console.log('-------------')
        console.log(res.data)
        console.log('-------------')
        this.rolesList = res.data
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.box {
  height: 400px;
  overflow: auto;
}
.el-tag {
  margin: 0 5px 10px;
}
</style>
