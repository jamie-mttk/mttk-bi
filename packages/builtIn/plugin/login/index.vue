<template>
  <div class="login-container">
    <dvi class="login-area">
      <div class="login-form">
        <h2 class="outline-none">欢迎使用低代码平台</h2>
        <el-form ref="loginFormRef" :model="loginData" size="large" label-position="top">
          <el-form-item prop="username" label="用户名"  required>
            <el-input clearable v-model="loginData.username" placeholder="请输入用户名">
              <template #prefix>
                <lc-icon icon="mdiAccount"></lc-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码" required>
            <el-input clearable show-password v-model="loginData.password" placeholder="请输入密码">
              <template #prefix>
                <lc-icon icon="mdiLock"></lc-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" type="primary" style="width: 100%" @click="handleLogin"
              >登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <span style="color: var(--el-color-error)" v-if="showLoginError"
              >登录失败,用户名或密码错误</span
            >
          </el-form-item>
        </el-form>
      </div>
    </dvi>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
//
const globalContext = inject('globalContext')
//

//Refer to form
const loginFormRef = ref()
//
const loginData = reactive({
  username: '',
  password: ''
})
//
//
const showLoginError = ref(false)
//
const router = useRouter()
//
function handleLogin() {
    loginFormRef.value.validate((valid,) => {
        showLoginError.value = false
        //
        if (!valid) {
            return
        }
        //
        const accountStore = useAccountStore()

        accountStore.login(globalContext, loginData).then( ()=> {
            //forward to redirect from URL or root page
            router.push(globalContext.router.currentRoute.value.query?.redirect||'/')
        }).catch( (error)=> {
            console.log(error)
            showLoginError.value = true
        })



    })
}
</script>
<style type="scss" scoped>
.login-bg {
  position: fixed;
  height: 100%;
  width: 100%;
  opacity: 0.1;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--el-fill-color-lighter);
  .login-area {
    display: block;
    width: 30%;
    height: 50vh;
    margin: auto auto;
    background-color: var(--el-color-white);
    border-radius: 8px;
    .login-form {
      padding: 60px 60px 0px 60px;
    }
  }
}
</style>
