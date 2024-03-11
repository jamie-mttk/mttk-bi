<template>
    <!-- Background color -->
    <img :src="bg" class="wave" />

    <div class="login-container">
        <div class="img">

            <img :src="leftImg" />
        </div>
        <div class="login-box">
            <div class="login-form">
                <h2 class="outline-none">
                    欢迎使用BI系统
                </h2>

                <el-form ref="loginFormRef" :model="loginData" size="large">
                    <el-form-item prop="username" required>
                        <el-input clearable v-model="loginData.username" placeholder="请输入用户名">
                            <template #prefix>
                                <lc-icon icon="mdiAccount"></lc-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" required>
                        <el-input clearable show-password v-model="loginData.password" placeholder="请输入密码">
                            <template #prefix>
                                <lc-icon icon="mdiLock"></lc-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="large" type="primary" style="width:100%;" @click="handleLogin">登录
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <span style="color:var(--el-color-error)" v-if="showLoginError">登录失败,用户名或密码错误</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'

import bg from './bg.png'
import leftImg from "./left.svg";
import { useAccountStore } from '@/stores/account'
//
const globalContext = inject('globalContext')
//

//Refer to form
const loginFormRef = ref()
//
const loginData = reactive({
    username: "",
    password: "",

});
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

<style scoped>
@import url("./login.css");
</style>