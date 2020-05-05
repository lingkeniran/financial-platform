import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index.vue'
// import login from '../components/login.vue'
import register from '../components/register.vue'
import header from '../components/module/header.vue'
import basicInfo from '../components/basicInfo.vue'
import companyInfo from '../components/companyInfo.vue'
import developmentSituation from '../components/developmentSituation.vue'
import creditRisks from '../components/creditRisks.vue'
import businessRisks from '../components/businessRisks.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: login
  // },
  {
    path: '/basicInfo',
    name: 'basicInfo',
    component: basicInfo
  },
  {
    path: '/companyInfo',
    name: 'companyInfo',
    component: companyInfo
  },
  {
    path: '/developmentSituation',
    name: 'developmentSituation',
    component: developmentSituation
  },
  {
    path: '/creditRisks',
    name: 'creditRisks',
    component: creditRisks
  },
  {
    path: '/businessRisks',
    name: 'businessRisks',
    component: businessRisks
  },
]

const router = new VueRouter({
  routes
})

export default router
