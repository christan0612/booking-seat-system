import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index/Index'
import BackStageIndex from '@/views/BackStageIndex/Index'
import Activity from '@/views/BackStageActivity/Index'
import FrontStage from '@/views/FrontStageIndex/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/back-stage',
      name: 'BackStageIndex',
      component: BackStageIndex
    },
    {
      path: '/create-activity',
      name: 'CreateActivity',
      component: Activity
    },
    {
      path: '/edit-activity/:id',
      name: 'EditActivity',
      component: Activity
    },
    {
      path: '/front-stage/:id',
      name: 'FrontStage',
      component: FrontStage
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})
