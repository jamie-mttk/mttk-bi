<template>
    <el-form-item :prop="props.config['~prop']" style="margin-bottom:0px;">
        <template #label>
            <div class="lc-common-toolbar" style="background-color: transparent;">
                <div>
                    {{ config['~label'] }}

                    <lc-icon icon="mdiHelpCircleOutline" :tooltip="config['~description']"
                        v-if="config['~description']"></lc-icon>
                </div>
                <div v-show="showSwitchButton">
                    <lc-icon icon="mdiExponent" tooltip="Expression"  color="#A8ABB2" v-if="inputMode == 'exp'" 
                        @click="inputMode = 'raw'"></lc-icon>
                    <lc-icon icon="mdiFormSelect" tooltip="Raw componnet" color="#A8ABB2" v-if="inputMode == 'raw'"
                        @click="inputMode = 'exp'"></lc-icon>
                </div>
            </div>
        </template>
        <!-- <el-select v-model="formData.name"  v-if="inputMode == 'raw'">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
						:disabled="item.disabled" />
				</el-select> -->
        <!-- <el-switch v-model="formData.name"  v-if="inputMode == 'raw'"></el-switch> -->

        <CompWrap :config="compConfig" v-if="inputMode == 'raw'"></CompWrap>
        <lcMyInput v-model="formItemData" v-if="inputMode == 'exp'"></lcMyInput>
    </el-form-item>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import lcMyInput from './MyInput.vue'
import { buildConfig, stdComponent } from './FormItemUtil'
import { isExp } from '@/utils/expression'

//
const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
        default() {
            return {}
        }
    },
    config: {
        type: Object,
        required: true,
        default() {
            return {}
        }
    },
    pageContext: {
        type: Object,
        required: true,

    },
})

// //
// onMounted(()=>{
//     console.log('onMounted>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'+props.config['~label'])
//     // console.log(props.config)
// })
// onUnmounted(()=>{
//     console.log('onUnmounted<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'+props.config['~label'])
// })
const emit = defineEmits<{
    (e: 'update:modelValue', data: Object): void
}>()
//
const formItemData = computed({
    get: () => { return props.modelValue[props.config['~prop']] },
    set: (val) => {
        const formData = props.modelValue
        formData[props.config['~prop']] = val
        emit('update:modelValue', formData)
    }
})
//value can be raw(Raw component to input),exp(Expression mode)
const inputMode = ref(initInputMode())

//CompWrap config
// const compConfig = computed(() => {
//     return  buildConfig(props.modelValue, props.config, props.pageContext)
// },{
//   onTrack(e) {
//     console.log('track',e)
//   },
//   onTrigger(e) {
//     console.log('trigger',e)
//   }})
//

const compConfig = buildConfig(props.modelValue, props.config, props.pageContext)
//Whether to show switch button
const showSwitchButton = computed(() => {
    const compName = stdComponent(props.config['~component'])
    if (compName == 'elinput') {
        //input does not need JS
        return false;
    }
    if (props.config['~hideSwitchButton']) {
        return false
    }
    //
    return true
})
//calculate the init inputMode
function initInputMode() {
    const formData = formItemData.value

    if (isExp(formData)) {
        return 'exp'
    }
    //
    return 'raw';
}
</script>