<template>
  <div class="add">
    <el-steps
      :active="active - 0"
      finish-status="success"
    >
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <template>
      <el-form
        :model="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-tabs
          v-model="active"
          tab-position='left'
          style='margin-top:15px'
        >
          <el-tab-pane
            label="基本信息"
            name="0"
          >
            <el-form-item
              label="商品名称"
              prop="goods_name"
            >
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item
              label="商品价格"
              prop="goods_price"
            >
              <el-input
                type='number'
                v-model="addForm.goods_price"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品重量"
              prop="goods_weight"
            >
              <el-input
                type='number'
                v-model="addForm.goods_weight"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="商品数量"
              prop="goods_number"
            >
              <el-input
                type='number'
                v-model="addForm.goods_number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <!-- :props:用来配置级联选择器的显示属性和value属性 -->
              <el-cascader
                :options="cateList"
                v-model="selectedOptions"
                @change="handleChange"
                :props='goodprops'
                :clearable='true'
              >
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane
            label="商品参数"
            name="1"
          >商品参数</el-tab-pane>
          <el-tab-pane
            label="商品属性"
            name="2"
          >商品属性</el-tab-pane>
          <el-tab-pane
            label="商品图片"
            name="3"
          >
          <!-- :file-list="fileList":fileList可以修改，但是加入的对象必须是这样的：{name: '',url: '',uid: ,status: 'success或false'}-->
          <!--  el-upload是内部封装了单独的axios请求，所以之前的拦截器不再起作用，所以我们需要手动的设置请求头-->
          <!-- action：为什么设置为这个值，因为我们是通过本地搭建的服务器来做为项目服务器的
          http://127.0.0.1:8888:服务器的地址：ip+端口  |  域名+端口
          /api/private/v1：目录
          /upload：路由名称 -->
            <el-upload
              class="upload-demo"
              :headers="getToken()"
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success='uploadDone'
              :before-upload='uploadBeforeValid'
              :file-list="fileList"
              list-type="picture"
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane
            label="商品内容"
            name="4"
          >
          <quill-editor
          v-model="addForm.goods_introduce"
          ref="myQuillEditor"
          @blur="onEditorBlur($event)"
          :options="editorOption">
        </quill-editor>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <el-button
        type="success"
        class="btn"
        @click = 'addGoodsSubmit'
      >确认添加</el-button>
    </template>
    <el-dialog title="图片查看" :visible.sync="picdialogTableVisible">
  <img :src="userpic" alt="">
</el-dialog>
  </div>
</template>
<script>
import { getAllCateList, addGoods } from '@/api'
export default {
  data () {
    return {
      editorOption: {},
      userpic: '',
      picdialogTableVisible: false,
      active: '0',
      goodprops: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedOptions: [],
      cateList: [],
      addForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '0',
        goods_number: '1',
        goods_weight: '0',
        goods_introduce: '',
        pics: [],
        attrs: ''
      },
      fileList: [
        // {如果加入这样的一个对象，这样上传组件在页面一开始就会显示一个已经上传好的图片
        //   name: 'food.jpeg',
        //   url: 'https://dss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/299c55e31d7f50ae4dc85faa90d6f445_121_121.jpg',
        //   uid: 1583309254464,
        //   status: 'success'
        // }
      ]
    }
  },
  mounted () {
    getAllCateList(3).then(res => {
      // console.log(res)
      this.cateList = res.data
    })
  },
  methods: {
    // 实现商品的添加
    addGoodsSubmit () {
      addGoods(this.addForm)
        .then(res => {
          console.log(res)
          if (res.meta.status === 201) {
            this.$message.success('添加成功')
            this.$router.push({ name: 'List' })
          }
        })
    },
    onEditorBlur (ev) {
      console.log(this.addForm)
    },
    // 设置token
    getToken () {
      var token = localStorage.getItem('itcast_token')
      // Authorization：这个名称不能修改，因为它是后台指定的名称
      return { Authorization: token }
    },
    // 移除图片
    handleRemove (file, fileList) {
      // 如果上传失败会自动的触发handleRemove
      console.log(file)
      if (!file.response) {
        return
      }
      // 删除图片。不仅仅要删除界面中的显示，而且还要删除pics中的数据
      var deletePic = file.response.data.tmp_path
      // findIndex可以获取数组中第一个满足条件的元素的索引
      var index = this.addForm.pics.findIndex((value) => {
        return value.pic.indexOf(deletePic) !== -1
      })
      this.addForm.pics.splice(index, 1)
    },
    // 图片预览
    handlePreview (file) {
      this.picdialogTableVisible = true
      // 老师用的预览图片是这个地址：
      this.userpic = 'http://localhost:8888/' + file.response.data.tmp_path
      // 还可以直接用这个：
      // this.userpic = file.url
    },
    // 文件上传成功
    uploadDone (response, file, fileList) {
      this.addForm.pics.push({'pic': '/' + response.data.tmp_path})
    },
    // 文件上传之前的验证
    uploadBeforeValid (file) {
      console.log(file)
      if (file.size > 500 * 1024) {
        this.$message.warning('图片大小超出指定大小')
        return false
      }
    },
    handleChange (value) {
      this.addForm.goods_cat = value.join(',')
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  margin-top: 20px;
  float: right;
}
.quill-editor{
  height: 350px;
  border-bottom: 1px solid #ccc;
  .ql-container {
    height: 250px;
  }
}
</style>
