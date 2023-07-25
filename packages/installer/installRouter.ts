import { createRouter, createWebHistory } from 'vue-router'

//Create a router and set default
export  function installRouter(app, router?) {
  //Add all routers
  const routes = buildRoutes()
  //
  if (!router) {
    router = createRouter({
      history: createWebHistory(),
      routes: routes
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
  return [
    {
      path: '/',
      name: 'home',
      component: () => import('@/workspaceManager/index.vue')
    },
    {
      path: '/design/:app?',
      name: 'App design',
      component: () => import('@/appEditor/appEditorWithRouter.vue')
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
          meta: {
            showBreadcrumb: false
          }
        }
      ]
    }
  ]
}
