<template>
    <el-dialog v-model="dialogVisible" title="修改密码" :destroy-on-close="true" :close-on-click-modal="false"
        :close-on-press-escape="false">

        <el-form ref="dataEditorFormRef" :model="formData" label-width="120px">

            <el-form-item label="名称" prop="name" required>
                <el-input v-model="formData.name" readonly />
            </el-form-item>

            <el-form-item label="用户名" prop="username" required>
                <el-input v-model="formData.username" readonly />
            </el-form-item>
            <el-form-item label="旧密码" prop="passwordOld" required>
                <el-input type="password" :show-password="true" v-model="formData.passwordOld" />
            </el-form-item>
            <el-form-item label="新密码" prop="password" required>
                <el-input type="password" :show-password="true" v-model="formData.password" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="passwordConfirm" required :rules="{ validator: validatePasswordSame }">
                <el-input type="password" :show-password="true" v-model="formData.passwordConfirm" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm(dataEditorFormRef)">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, inject, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
//
const globalContext = inject('globalContext')
//Whether the dialog is show or hide
const dialogVisible = ref(false)
//data of the form
const formData = reactive({})


//Show this dialog
//data:data to fill into form(Do not use ref or reactive to wrap)
//callback:once data is saved,this function will be called with updated formData
function show(data: object) {
    formData._id = data._id
    formData.name = data.name
    formData.username = data.username
    //
    dialogVisible.value = true
}
//
const dataEditorFormRef = ref<FormInstance>()
//
const validatePasswordSame = (rule: any, value: any, callback: any) => {
    if (value !== formData.password) {
        callback(new Error("新密码和确认密码不相等"))
    } else {
        callback()
    }
}
//
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            //
            globalContext.request({
                method: "POST",
                url: 'account/changePassword',
                data: formData,
            }).then(function (response) {
                console.log(JSON.stringify(response, null, 2))
                if (response.error) {
                    if (response.code == 202) {
                        ElMessageBox.alert('旧密码错误', '错误')
                    } else {
                        ElMessageBox.alert('其他错误,错误代码:' + response.code, '错误')
                    }
                } else {
                    dialogVisible.value = false
                    ElMessage({
                        message: '密码修改成功',
                        type: 'success',
                    })
                }
            })
        }
    })
}


//
defineExpose({ show })
</script>

<style scoped></style>