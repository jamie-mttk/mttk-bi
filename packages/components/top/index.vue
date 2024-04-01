<template>
  <div
    class="lc-common-toolbar"
    style="background-color: var(--el-color-primary);  border-radius: 0px;min-height:32px;"
  >
    <div class="left" style="font-weight: bold; color: var(--el-color-white);margin-left:16px;">欢迎使用本系统</div>

    <div class="right" style="width: 120px">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="color: var(--el-color-white)">
          <lc-icon icon="mdiCog" style="margin-right: 4px" />
          设置
          <lc-icon icon="mdiChevronDown"> </lc-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="account" v-if="hasAuth('account')"
              ><lc-icon icon="mdiAccount" style="margin-right: 4px" />用户管理</el-dropdown-item
            >
            <el-dropdown-item command="accountRole" v-if="hasAuth('accountRole')">
              <lc-icon
                icon="mdiShieldAccount"
                style="margin-right: 4px"
              />角色管理</el-dropdown-item
            >
            <el-dropdown-item command="accountGroup" v-if="hasAuth('accountGroup')"
              ><lc-icon
                icon="mdiAccountSupervisor"
                style="margin-right: 4px"
              />用户组管理</el-dropdown-item
            >
            <el-dropdown-item divided command="app"
              ><lc-icon
                icon="mdiApps"
                style="margin-right: 4px"
              />应用列表</el-dropdown-item
            >
            <!-- <el-dropdown-item>批量授权</el-dropdown-item> -->
            <el-dropdown-item divided command="_logout"
              ><lc-icon
                icon="mdiExitToApp"
                style="margin-right: 4px"
              />退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import Account from './account/index.vue'
import AccountGroup from './accountGroup/index.vue'
import AccountRole from './accountRole/index.vue'
import AppManager from '../appManager/index.vue'
import { logout } from '@/utils/authentication'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import { hasAuth } from '@/utils/auth'
//
const emit = defineEmits(['action'])
//
const globalContext = inject('globalContext')
//
function handleCommand(command) {
  if (command == '_logout') {
    handleLogout()
  } else if (command == 'account') {
    emit('action', Account)
  } else if (command == 'accountRole') {
    emit('action', AccountRole)
  } else if (command == 'accountGroup') {
    emit('action', AccountGroup)
  } else if (command == 'app') {
    emit('action', AppManager)
  } else {
    //Do nothing
  }
}
//
const router = useRouter()
//
function handleLogout() {
 logout(globalContext)
    .then(() => {
      router.push('/login')
    })
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  /* color: var(--el-color-success); */
  display: flex;
  align-items: center;
}
</style>
