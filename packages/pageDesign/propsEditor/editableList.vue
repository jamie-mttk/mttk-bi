<template>
  <div style="width:100%;">
    <div v-if="mode == 'list'">
      <draggable tag="ul" :list="modelValue" class="list-group" handle=".handle" item-key="name">
        <template #item="{ element, index }">
          <li class="list-group-item">
            <div class="list-group-item-inside">
              <el-icon :size="24" class="handle">
                <Paperclip />
              </el-icon>
              <span class="content">{{ evalLabelColumn(element) }} </span>
              <el-button class="operation" icon="" text @click="edit(index)">
                <template #icon><el-icon :size="20">
                    <Edit />
                  </el-icon></template>
              </el-button>
              <el-button class="operation" text @click="remove(index)">
                <template #icon><el-icon :size="24">
                    <Close />
                  </el-icon></template>
              </el-button>

            </div>
          </li>
        </template>
      </draggable>
      <el-button icon="Plus" style="margin-left:24px;margin-top:6px;" @click="add">Add a new row</el-button>
    </div>
    <div v-if="mode != 'list'">
      <el-page-header title="back" @back="goBack" style="padding:10px;background-color: var(--el-fill-color-extra-light);">
        <CompWrap :config="editorConfigTranformed" style="margin:4px;" ref="tableEditor"></CompWrap>
      </el-page-header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import draggable from "vuedraggable";

import { formTransform } from './formTransform'
import {createUniqueString} from '@/utils/tools'
//
let props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  labelColumn: {
    type: String,
    required: true
  },
  editConfig: {
    type: [Object, Function],
    required: true,
    default() {
      return {}
    }
  },
})
//const emit = defineEmits(["update:modelValue"])
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
//

//界面模式 list:表格列表方式  edit:编辑模式 //add:增加模式
const mode = ref('list')
watch(
  () => props.editConfig,
  () => {
    //Once component selection is changed,return to list mode
    mode.value = 'list'
  })

//当前编辑的数据
let editingData = ref({})
//Refer to the form to edit detail data
let tableEditor = ref(null)
//
onMounted(() => {
  document.body.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
  };
})
//Eval the column label
function evalLabelColumn(element) {
  if (typeof props.labelColumn == 'function') {
    return props.labelColumn(element)
  } else {
    return element[props.labelColumn]
  }
}
//editor config tranformed
const editorConfigTranformed = computed(() => {
  return formTransform(props.editConfig, editingData)
})
//
function add() {
  editingData.value = {key:createUniqueString()}
  //
  mode.value = 'add'
}
//
function remove(index: number) {
  props.modelValue.splice(index, 1);
}
//
function edit(index: number) {
  editingData.value = props.modelValue[index];
  //
  mode.value = 'edit'
}
//
function goBack() {
  //validate
  //console.log(tableEditor.value.getRef('tableEditor'))

  //  tableEditor.value.validate((valid, fields) => {
  //   if (valid) {
  //     console.log('submit!')
  //   } else {
  //     console.log('error submit!', fields)
  //   }
  // })
  //
  if ('add' == mode.value) {
    props.modelValue.push(editingData.value);
  } else {
    //edit
    //Do nothing since data is already updated
  }
  //
  emit("update:modelValue", props.modelValue)
  //
  mode.value = 'list'
  //console.log(modelValue)
}
</script>

<style scoped>
.list-group {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.list-group-item {
  display: block;
  width: 100%;
  padding: .75rem 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, .08);
}

.list-group-item-inside {
  display: flex;
}

.handle {
  flex: 0 0 48px;
  cursor: move;
}

.operation {
  flex: 0 0 48px;
}

.content {
  flex: 1 1 auto;
}
</style>
