import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
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
    },
    {
      path: '/design/:app?',
      name: 'App design',
      component: () => import('@/appEditor/appEditorWithRouter.vue'),
    },
    {
      path: '/deploy',
      name: 'deploy',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: ':app?/:page?',
          name: 'Page deployed',
          component: () => import('@/deployed/index.vue'),
          meta:{
            showBreadcrumb:false,
          }
        }
      ]
    }
  ]
})

export default router
