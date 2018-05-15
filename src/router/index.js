import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/views/Index/Index'
import BackStage from '@/views/BackStage/Index'
import FrontStage from '@/views/FrontStage/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/back-stage'
    },
    {
      path: '/back-stage',
      name: 'BackStage',
      component: BackStage
    },
    {
      path: '/back-stage/:id',
      name: 'EditBackStage',
      component: BackStage
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
