import http from './http'

// 创建分类
export const reqCategoryCreate = (params) => {
  return http.post('/rest/categories', params)
}
// 获取分类列表
export const reqCategoryList = () => {
  return http.get('/rest/categories')
}
// 获取分类信息
export const reqCategoryInfo = (id) => {
  return http.get(`/rest/categories/${id}`)
}
// 编辑分类
export const reqCategoryEdit = (id, params) => {
  return http.put(`/rest/categories/${id}`, params)
}
export const reqDeleteCategory = (id) => {
  return http.delete(`/rest/categories/${id}`)
}



// 新建物品
export const reqCreateItem = (params) => {
  return http.post('/rest/items', params)
}
// 获取物品列表
export const reqItemList = () => {
  return http.get('/rest/items')
}
export const reqDeleteItem = (id) => {
  return http.delete(`/rest/items/${id}`)
}
export const reqItemInfo = (id) => {
  return http.get(`/rest/items/${id}`)
}
export const reqItemEdit = (id, params) => {
  return http.put(`/rest/items/${id}`, params)
}
// ==========================================
export const reqCreateHero = (params) => {
  return http.post('/rest/heros', params)
}
export const reqHeroList = () => {
  return http.get('/rest/heros')
}
export const reqDeleteHero = (id) => {
  return http.delete(`/rest/heros/${id}`)
}
export const reqHeroInfo = (id) => {
  return http.get(`/rest/heros/${id}`)
}
export const reqHeroEdit = (id, params) => {
  return http.put(`/rest/heros/${id}`, params)
}
// =========================================
export const reqCreateAdmin = (params) => {
  return http.post('/rest/admin', params)
}
export const reqAdminList = () => {
  return http.get('/rest/admin')
}
export const reqDeleteAdmin = (id) => {
  return http.delete(`/rest/admin/${id}`)
}
export const reqAdminInfo = (id) => {
  return http.get(`/rest/admin/${id}`)
}
export const reqAdminEdit = (id, params) => {
  return http.put(`/rest/admin/${id}`, params)
}

// 登录
export const reqLogin = (params) => {
  return http.post('/login', params)
}