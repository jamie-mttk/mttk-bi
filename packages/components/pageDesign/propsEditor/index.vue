<script setup lang="ts">
import { inject } from 'vue'
import { ElMessageBox } from 'element-plus'
import buildCompEditor from './buildCompEditor'
const emit = defineEmits(['narrow'])
//
function handleNarrow() {
    emit('narrow')
}
//
const context = inject('context')
//
const { canBeDelete, configTitle, compEditor } = buildCompEditor(context)

//
function handleDelete() {
    //
    ElMessageBox.confirm(
        'Are you sure to delete this component?',
        'Confirm',
        {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        }
    )
        .then(() => {
            //
            const choosed = context.choosedManager.get()
            if (!choosed || !choosed.key) {
                return;
            }
            //
            context.componentManager.del(choosed.key)
            //
            context.choosedManager.set(undefined)
        })
}
//
function handleDuplicate() {
    //
    ElMessageBox.confirm(
        'Are you sure to duplicate this component?',
        'Confirm',
        {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning',
        }
    )
        .then(() => {
            //
            const choosed = context.choosedManager.get()
            if (!choosed || !choosed.key) {
                return;
            }
            //
            const controllerNew = context.componentManager.duplicate(choosed.key)
            //
            context.choosedManager.set(controllerNew)
        })
}

// //Add a scrollbar so the basic can be displayed even if it is very high
// const sc_height = ref('640px')
// calScHeight()
// window.onresize = function () {
//     calScHeight()
// }
// function calScHeight(){
//     sc_height.value = (window.innerHeight - 320) + 'px'
// }

</script>

<template>
    <el-card shadow="never" style="min-width: 320px;">
        <template #header>
            <div class="card-header">
                <span> <span class="card-title">{{ configTitle }}</span>
                    <el-button-group>
                        <el-button type="warning" size="small" v-if="canBeDelete" @click="handleDuplicate">
                            <template #icon>
                                <lc-icon icon="mdiContentCopy"></lc-icon>
                            </template>
                        </el-button>
                        <el-button type="danger" size="small" v-if="canBeDelete" @click="handleDelete">
                            <template #icon>
                                <lc-icon icon="mdiTrashCanOutline"></lc-icon>
                            </template>
                        </el-button>
                    </el-button-group>
                </span>
                <el-button size="small" @click="handleNarrow">
                    <template #icon>
                        <lc-icon icon="mdiMenuRightOutline" size="x-large"></lc-icon>
                    </template>
                </el-button>
            </div>
        </template>
        <MttkWrapComp :config="compEditor"></MttkWrapComp>
    </el-card>
</template>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-title {
    font-size: 1.1em;
    margin-right: 10px;
}
</style>