import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

//Create a router and set default
export function installRouter(app, router?) {
  //Add all routers
  const routes = buildRoutes()
  //
  if (!router) {
    router = createRouter({
      history: createWebHistory(),
      routes: routes || []
    })
    //
    app.use(router)
    //
  } else {
    //
    for (const route of routes) {
      router.addRoute(route)
    }
    //Please note ,it does not work if app.use(router) is already called before
    app.use(router)
  }
  //
  return { router }
}

function buildRoutes() {
  const defaultRoutes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/workspaceManager/index.vue')
    },
    {
      path: '/design/:app?',
      name: 'App design',
      component: () => import('@/components/appEditor/appEditorWithRouter.vue')
    },
    {
      path: '/deploy',
      name: 'deploy',
      component: () => import('@/components/layout/index.vue'),
      children: [
        {
          path: ':app?/:page?',
          name: 'Page deployed',
          component: () => import('@/components/deployed/index.vue'),
          meta: {
            showBreadcrumb: false
          }
        }
      ]
    }
  ]
  //
  return defaultRoutes
}
