// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// index > index.js > index.json > index.node
import router from './router/index.js'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import store from '@/store/store.js'

// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'

// 引入index.scss文件
import '@/styles/index.css'

import ElementUI from 'element-ui'
Vue.use(VueQuillEditor)
Vue.use(ElementUI)

Vue.config.productionTip = false

// 添加导航守卫
// router.beforeEach((to, from, next) => {
//   var token = localStorage.getItem('itcast_token')
//   if (token || to.path === '/login') {
//     next()
//   } else {
//     next({path: '/login'})
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
