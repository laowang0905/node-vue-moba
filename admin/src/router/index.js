import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoriesEdit from '../components/category/CategoriesEdit.vue'
import CategoriesList from '../components/category/CategoriesList.vue'

import ItemsEdit from '../components/item/ItemsEdit.vue'
import ItemsList from '../components/item/ItemsList.vue'

import HeroEdit from '../components/hero/HeroEdit.vue'
import HeroList from '../components/hero/HeroList.vue'

import AdminEdit from '../components/admin/AdminEdit.vue'
import AdminList from '../components/admin/AdminList.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'main',
    component: Main,
    children: [{
        path: '/categories/create',
        component: CategoriesEdit
      },
      // { path: '/categories/edit/:id', component: CategoriesEdit, props: true },
      {
        path: '/categories/list',
        component: CategoriesList
      },

      {
        path: '/items/create',
        component: ItemsEdit
      },
      // { path: '/items/edit/:id', component: ItemsEdit, props: true },
      {
        path: '/items/list',
        component: ItemsList
      },
      {
        path: '/hero/create',
        component: HeroEdit
      },
      // { path: '/hero/edit/:id', component: HeroEdit, props: true },
      {
        path: '/hero/list',
        component: HeroList
      },


      {
        path: '/admin/create',
        component: AdminEdit
      },
      // { path: '/hero/edit/:id', component: AdminEdit, props: true },
      {
        path: '/admin/list',
        component: AdminList
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      ispublic: true
    }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to.meta.ispublic==false);
  if(!to.meta.ispublic&&!sessionStorage.token) {
    return next('/login')
  }
  next()
})
export default router