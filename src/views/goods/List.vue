<template>
  <div class="list">
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="query"
        class="input-with-select"
        style="width:300px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click='searchUsers'
        ></el-button>
      </el-input>
      <el-button
        type="success"
        plain
        @click='$router.push({name:"Add"})'
      >添加商品</el-button>
    </div>
    <template>
      <el-table
        :data="goodsList"
        border
        style="width: 100%;margin-top:15px"
      >
        <el-table-column
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          prop="goods_price"
          label="商品价格(元)"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="创建时间"
          width="180"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          width="180"
        >
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
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { getAllGoods } from '@/api'
export default {
  data () {
    return {
      goodsList: [],
      query: '',
      pagenum: 1,
      pagesize: 10,
      total: 5
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getAllGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        console.log(res)
        this.goodsList = res.data.goods
        this.total = res.data.total
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    },
    searchUsers () {}
  }
}
</script>
<style lang="scss" scoped>
</style>
