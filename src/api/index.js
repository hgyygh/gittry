import axios from 'axios'
// 配置基准路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 设置基准路径：因为请求的路径是相对于这个基准路径而言的。所以我们就需要让所有的路由都以这个路径做为参照
axios.defaults.baseURL = baseURL

// 为axios添加拦截器：因为所有请求都是通过axios来发送的，所以为它添加拦截器就相当于为所有请求添加了拦截器
// 它的功能：在发送请求之前实现相应的业务处理：
// 1.获取token值，如果有token值就通过请求头的方式设置
// 2.如果没有token,则实现拦截器的默认操作
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = localStorage.getItem('itcast_token')
  if (token) {
    // 通过请求头的方式发送token
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 登陆验证接口方法
export const login = (pa) => {
  return axios.post('login', pa)
    .then((result) => {
      return result.data
    })
}

// 获取所有用户数据
export const GetUserList = (pa) => {
  return axios.get('users', {params: pa})
    .then((result) => {
      return result.data
    })
}

// 实现用户数据的新增
export const addUser = (pa) => {
  return axios.post('users', pa)
    .then((result) => {
      return result.data
    })
}

// 实现用户数据的编辑
// 如果参数是url参数，说明必须在url中拼接
// 否则，就可以以对象的形式传递
// 增加:post   删除:delete  修改:put  查询：get
export const editUser = (pa) => {
  return axios.put(`users/${pa.id}`, pa)
    .then((result) => {
      return result.data
    })
}

// 实现单个用户数据的删除
export const deleteUserById = (id) => {
  return axios.delete(`users/${id}`)
    .then((result) => {
      return result.data
    })
}

// 获取所有角色数据
export const GetRolesList = () => {
  return axios.get('roles')
    .then((result) => {
      return result.data
    })
}

// 实现单个用户角色的授予
export const grantUserById = (pa) => {
  return axios.put(`users/${pa.id}/role`, {rid: pa.rid})
    .then((result) => {
      return result.data
    })
}

// 实现单个用户状态的修改
export const changeUserState = (uid, type) => {
  return axios.put(`users/${uid}/state/${type}`)
    .then((result) => {
      return result.data
    })
}

// 根据ID获取用户数据
export const getUserById = (id) => {
  return axios.get(`users/${id}`)
    .then((result) => {
      return result.data
    })
}

// 获取所有权限
export const getAllRights = (type) => {
  return axios.get(`rights/${type}`)
    .then((result) => {
      return result.data
    })
}

// 实现单个角色的权限修改-赋值
export const grantRightForRole = (roleId, rids) => {
  return axios.post(`roles/${roleId}/rights`, {rids: rids})
    .then((result) => {
      return result.data
    })
}

// 实现单个用户数据的删除
export const deleteRightByRoleId = (roleid, rightid) => {
  return axios.delete(`roles/${roleid}/rights/${rightid}`)
    .then((result) => {
      return result.data
    })
}

// 添加角色
export const addRole = (pa) => {
  return axios.post('roles', pa)
    .then(res => {
      return res.data
    })
}

// 获取左侧菜单权限
export const GetLeftMenus = () => {
  return axios.get('menus')
    .then((result) => {
      return result.data
    })
}

// 获取所有商品列表数据
export const getAllGoods = (pa) => {
  return axios.get(`goods`, {params: pa})
    .then((result) => {
      return result.data
    })
}

// 获取所有商品分类数据
export const getAllCateList = (type) => {
  return axios.get(`categories`, {params: {type: type}})
    .then((result) => {
      return result.data
    })
}

// 添加商品
export const addGoods = (pa) => {
  return axios.post('goods', pa)
    .then(res => {
      return res.data
    })
}

// 添加分类
export const addCategory = (pa) => {
  return axios.post('categories', pa)
    .then(res => {
      return res.data
    })
}
