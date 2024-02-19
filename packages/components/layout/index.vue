
<template>

    <el-container style="height:100%;">
      <el-header class="lc-common-toolbar" >
        <span class="lc-main-title">{{appContext.getCode().name}}
        </span></el-header>
      <el-container style="height:100%;">
        <el-aside width="300px" style="background-color:#545c64;">
          <el-menu :router="true" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff">
            <el-sub-menu v-for="menu in menus" :index="'/' + menu['_id']" :key="menu['_id']">
              <template #title>
      
                <lc-icon :icon="menu.icon" size="large" style="margin-right:12px;"></lc-icon>
                <span>{{ menu.name }}</span>
              </template>
              <el-menu-item v-for="page in menu.pages || []" :index="'/deploy/'+app+'/' + page['_id']" :key="page['_id']">
                <lc-icon :icon="page.icon" size="large" style="margin-right:12px;"></lc-icon>
              {{
                page.name
              }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main style="margin:0;padding:0;">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </el-main>
      </el-container>
    </el-container>

</template>

<script setup lang="ts">
import { ref,inject,provide } from 'vue'
import createAppContext from '@/context/appContext/index'
//

//
//import createGlobalContext from '@/context/globalContext/index'
// const globalContext=createGlobalContext(import.meta.env.VITE_APP_API_BASE)
// provide('globalContext',globalContext)
 const globalContext=inject('globalContext')
 //
 const appContext=createAppContext(globalContext);
provide('appContext',appContext)


//
const app = globalContext.router.currentRoute.value.params.app
//
appContext.load(app)

//
const menus = ref([])
//
globalContext.request({
  method: "GET",
  url: "deployed/menus",
  params: {
    id: app
  }
}).then(function (response) {
  menus.value = response.list
});

</script>


