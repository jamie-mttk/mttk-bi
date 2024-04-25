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
                   {{$t('bi.plugin.login.title')}}
                   <locale.localeChooser style="line-height:32px;"></locale.localeChooser>
                </h2>
      
                <el-form ref="loginFormRef"  :model="loginData" size="large" >
                    <el-form-item prop="username" required>

                        <el-input clearable v-model="loginData.username" :placeholder="$t('bi.plugin.login.placeholder.user')">
                            <template #prefix>
                                <lc-icon icon="mdiAccount"></lc-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" required>
                        <el-input clearable show-password v-model="loginData.password" :placeholder="$t('bi.plugin.login.placeholder.password')">
                            <template #prefix>
                                <lc-icon icon="mdiLock"></lc-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="large" type="primary" style="width:100%;" @click="handleLogin"> {{$t('bi.plugin.login.login')}}
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <span style="color:var(--el-color-error)" v-if="showLoginError">{{$t('bi.plugin.login.loginFail')}}</span>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'


import bg from './bg.png'
import leftImg from "./left.svg";
import { authentication,locale } from 'mttk-lowcode-engine'

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
function handleLogin() {
    loginFormRef.value.validate((valid,) => {
        showLoginError.value = false
        //
        if (!valid) {
            return
        }
        //
        authentication.login(globalContext, loginData).then( ()=> {
            //forward to redirect from URL or root page
            globalContext.router.push(globalContext.router.currentRoute.value.query?.redirect||'/')
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