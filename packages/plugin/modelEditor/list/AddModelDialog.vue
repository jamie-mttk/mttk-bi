<template>
  <el-dialog v-model="modelValue" :title="$t('_._.add')+' '+ $t('bi.plugin.modelEditor.name')" width="30%" :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="false"  @opened="loadConnectionList">
    <el-form ref="addModelFormRef" :model="data" label-width="140px">
      <el-form-item :label="$t('_._.name')" prop="name" required>
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item :label="$t('_._.description')" prop="description">
        <el-input v-model="data.description" />
      </el-form-item>
      <el-form-item :label="$t('bi.plugin.modelEditor.data.connection')" prop="jdbcConnection" required>
        <el-select v-model="data.jdbcConnection">
          <el-option v-for="c in connectionList" :key="c._id" :label="c.name" :value="c._id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modelValue = false">{{ $t('_._.cancel') }}</el-button>
        <el-button type="primary" @click="handleAddModel"> {{ $t('_._.ok') }} </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue'
import { useVModels } from '@vueuse/core'

const props = defineProps(['modelValue', 'callback'])
const emit = defineEmits(['update:modelValue'])
//
const { modelValue } = useVModels(props, emit)
//
//
const globalContext = inject('globalContext')
const appContext = inject('appContext')
//
const connectionList = ref([])
//FORM DATA
const data = ref({})
//refer to form
const addModelFormRef = ref(null)
//load connection list - reload every time of dialog open
function loadConnectionList() {
  globalContext.request
    .get('/bi/jdbcConnection/query?app=' + appContext.getKey())
    .then(function (response) {
      connectionList.value = response.list
    })
}
//

//
function handleAddModel() {
  addModelFormRef.value.validate((valid) => {
    if (!valid) {
      return
    }
    //
    data.value.app = appContext.getKey()
    data.value.entities = []
    data.value.columns = []
    data.value.relations = []
    //
    props.callback(data.value)
    //Close
    modelValue.value = false
  })
}
</script>
