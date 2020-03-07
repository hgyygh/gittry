import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/user/Users.vue'
import Right from '@/views/rights/Rights.vue'
import Role from '@/views/rights/Role.vue'
import Goods from '@/views/goods/Goods.vue'
import List from '@/views/goods/List.vue'
import Add from '@/views/goods/Add.vue'
import Categories from '@/views/goods/Categories.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: {name: 'Login'}
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'users',
          name: 'User',
          component: User
        },
        {
          path: 'rights',
          name: 'Right',
          component: Right
        },
        {
          path: 'roles',
          name: 'Role',
          component: Role
        },
        {
          path: 'goods',
          name: 'Goods',
          component: Goods,
          redirect: {
            name: 'List'
          },
          children: [
            {
              path: 'list',
              name: 'List',
              component: List
            },
            {
              path: 'add',
              name: 'Add',
              component: Add
            }
          ]
        },
        {
          path: 'categories',
          name: 'Categories',
          component: Categories
        }
      ]
    }
  ]
})
