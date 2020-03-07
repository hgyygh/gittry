<template>
  <div class="categories">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="success"
      plain
      @click='showaddCate'
    >添加分类</el-button>
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="cateList"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="adddialogFormVisible"
    >
      <el-form
        :model="addform"
        label-width="80px"
      >
        <el-form-item label="分类名称">
          <el-input
            v-model="addform.cat_name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            :options="cateListAdd"
            v-model="selectedOptions"
            @change="handleChange"
            :props='cateprops'
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCateSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllCateList, addCategory } from '@/api'
// 引入自定义的单文件组件
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
export default {
  // 注册组件---组件的注入
  components: {
    TreeGrid: TreeGrid
  },
  data () {
    return {
      cateprops: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      adddialogFormVisible: false,
      selectedOptions: [],
      addform: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      columns: [
        {
          text: '分类名称',
          dataIndex: 'cat_name',
          width: ''
        },
        {
          text: '是否有效',
          dataIndex: 'cat_deleted',
          width: ''
        },
        {
          text: '分类级别',
          dataIndex: 'cat_level',
          width: ''
        }
      ],
      cateList: [],
      cateListAdd: []
    }
  },
  mounted () {
    this.init(3)
  },
  methods: {
    init (type) {
      getAllCateList(type).then(res => {
        console.log(res)
        this.cateList = res.data
      })
    },
    // 级联选择器选项改变时触发
    handleChange (value) {
      console.log(value)
      if (value.length === 1) {
        this.addform.cat_level = 1
        this.addform.cat_pid = value[0]
      } else if (value.length === 2) {
        this.addform.cat_level = 2
        this.addform.cat_pid = value[1]
      }
    },
    // 弹出添加分类对话框
    showaddCate () {
      this.adddialogFormVisible = true
      getAllCateList(2)
        .then(res => {
          this.cateListAdd = res.data
        })
    },
    // 实现添加分类的操作
    addCateSubmit () {
      addCategory(this.addform)
        .then(res => {
          console.log(res)
          if (res.meta.status === 201) {
            this.$message.success('添加分类数据成功')
            this.adddialogFormVisible = false
            this.init(3)
          }
        })
    },
    deleteCategory (row) {},
    editCategory (row) {}
  }
}
</script>
<style lang="scss" scoped>
</style>
