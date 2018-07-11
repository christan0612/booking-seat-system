import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index/Index'
import BackStageIndex from '@/views/BackStageIndex/Index'
import BackStageActivity from '@/views/BackStageActivity/Index'
import FrontStageIndex from '@/views/FrontStageIndex/Index'
import FrontStageActivity from '@/views/FrontStageActivity/Index'

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
      component: BackStageActivity
    },
    {
      path: '/edit-activity/:id',
      name: 'EditActivity',
      component: BackStageActivity
    },
    {
      path: '/front-stage',
      name: 'FrontStageIndex',
      component: FrontStageIndex
    },
    {
      path: '/front-stage/:id',
      name: 'FrontStageActivity',
      component: FrontStageActivity
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
