<template>
    <span>
        This is inside children{{ value }}
        <el-button @click="showDialog">Show dialog</el-button>
        <span id="dialogEntry"></span>
    </span>
</template>
<script setup lang="ts">
import { inject, ref, createVNode, render } from 'vue'
import { CompWrap } from 'vuewrapper'
import { app } from '../../main'
import Pop from './Pop.vue'
//
const emit = defineEmits<{
    (e: 'test', value: string): void
}>()

//
const value = inject('value')
console.log('inject:' + value)
//
function showDialog() {
    emit('test','123456')
}
function showDialog1() {
    const mountEntry= document.getElementById("dialogEntry")
    console.log(mountEntry)
    const mountNode = document.createElement('div')
    const closeCallback = function () {
        mountEntry.removeChild(mountNode)
    }
    //
    const { popupVisible, popupConfig } = dialogCreator(closeCallback)
    const dialogNode = createVNode(CompWrap, {
        config: popupConfig
    })
    //'
    dialogNode.appContext = app._context
    //
    render(dialogNode, mountNode)
    mountEntry.appendChild(mountNode)
    //
    popupVisible.value = true

}


function dialogCreator(closeCallback: Function) {
    //
    const popupVisible = ref(true)
    const popupConfig = {
        sys: {
            component: 'el-dialog',
            modelValue: popupVisible
        },
        props: {
            title: 'TEST POPUP',
            'append-to-body': true,
            'destroy-on-close': true,
        },
        slots: {
            default: {
                type: 'wrap',
                value: [
                    {
                        '~component': Pop,

                    }
                ]
            }
        },
        events: {
            closed: () => {
                //Use to clear the dynamic created div
                if (closeCallback) {
                    closeCallback()
                }
            }
        }
    }
    //
    return { popupVisible, popupConfig }
}
</script>