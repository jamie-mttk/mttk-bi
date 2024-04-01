import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/test1',
      name: 'test1',
      component: () => import('../views/test1/index.vue')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('../views/test2/index.vue')
    },
    {
      path: '/test3',
      name: 'test3',
      component: () => import('../views/test3/index.vue')
    },
    {
      path: '/test4',
      name: 'test4',
      component: () => import('../views/test4/index.vue')
    },
    {
      path: '/test5',
      name: 'test5',
      component: () => import('../views/test5/index.vue')
    },
    {
      path: '/test6',
      name: 'test6',
      component: () => import('../views/test6/index.vue')
    }
  ]
})

export default router
