<template>
  <el-container>
    <el-aside
      :width="expandFlag ? '260px' : '60px'"
      style="
        height: 100vh;
        background: var(--el-color-white);
        border-right: 1px solid var(--el-border-color);
      "
    >
      <div
        style="
          height: 24px;
          padding: 12px 0 12px 16px;
          border-bottom: 1px solid var(--el-border-color);
        "
      >
        <lc-icon
          size="medium"
          :icon="appContext.getCode().icon"
          style="margin-right: 16px"
        ></lc-icon>
        {{ expandFlag ? appContext.getCode().name : '' }}
      </div>
      <el-menu :router="true" :collapse="!expandFlag" style="margin-top: 12px">
        <el-sub-menu v-for="menu in menus" :index="'/' + menu['_id']" :key="menu['_id']">
          <template #title>
            <lc-icon
              :icon="menu.icon || 'mdiMenu'"
              size="small"
              style="margin-right: 8px"
            ></lc-icon>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="page in menu.pages || []"
            :index="'/deploy/' + app + '/' + page['_id']"
            :key="page['_id']"
          >
            <lc-icon
              :icon="page.icon || 'mdiChartBoxOutline'"
              size="small"
              style="margin-right: 8px"
            ></lc-icon>

            {{ page.name }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header
        style="
          height: 48px;
          padding: 12px 0 12px 16px;
          box-sizing: border-box;
          border-bottom: 1px solid var(--el-border-color);
        "
      >
        <div style="display: flex; align-items: center; justify-content: space-between">
          <div style="display: flex; align-items: center; justify-content: space-between">
            <!--Expand/collapse button-->
            <lc-icon
              :icon="expandFlag ? 'mdiMenuOpen' : 'mdiMenuClose'"
              size="large"
              style="cursor: pointer"
              @click="expandFlag = !expandFlag"
            ></lc-icon>
            <el-breadcrumb separator=">" style="margin-left: 25px">
              <el-breadcrumb-item v-for="item in breadcrumbDate" :key="item.id">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div>
            <lc-icon icon="mdi-fullscreen" tooltip="Full Screen"  size="large"  style="margin-right:32px;" @click="handleFullScreen" ></lc-icon>

          </div>
        </div>
      </el-header>

      <el-main ref="elMainRef"
        style="max-height: calc(100vh - 48px); margin: 0px; padding: 0px"
        :style="elMainStyle"
      >
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, inject, provide,  computed } from 'vue'
import createAppContext from '@/context/appContext/index'
import { useFullscreen } from '@vueuse/core'
//
const globalContext = inject('globalContext')
//Handle appContext - create and init it
const appContext = createAppContext(globalContext)
provide('appContext', appContext)
const app = globalContext.router.currentRoute.value.params.app
appContext.load(app)

//Flag whether left menu is expand or collapsed
const expandFlag = ref(true as Boolean)
//Menus and pages
const menus = ref([])
globalContext
  .request({
    method: 'GET',
    url: 'deployed/menus',
    params: {
      id: app
    }
  })
  .then(function (response) {
    menus.value = response.list
  })

//
const breadcrumbDate = computed(() => {
  //
  let menuName = ''
  let pageName = ''
  const pageId = globalContext.router.currentRoute.value.params.page
  if (pageId) {
    for (const menu of menus.value || []) {
      for (const page of menu.pages || []) {
        console.log(pageId,page._id,(pageId==page._id))
        if (pageId == page._id) {
          menuName = menu.name
          pageName = page.name
        }
      }
    }
  }
  return [menuName, pageName]
})

//Full screen handler
const elMainRef=ref()
const { enter:handleFullScreen } = useFullscreen(elMainRef)

//Try to use the app background color to fill main area
const elMainStyle = computed(() => {
  const colorBackground = appContext.getCode().colorBackground
  if (colorBackground) {
    return { 'background-color': colorBackground }
  } else {
    return {}
  }
})

</script>

<style lang="scss" scoped>
.el-menu {
  //remove the right border of menu
  border-right: 0px solid white;
}
</style>
