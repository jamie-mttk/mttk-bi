<template>
    <div class="EntityNode">
        <div class="prefix"  @click="handleCommand('fields')"><lc-icon :icon="icon"></lc-icon></div>
        <div class="content" @click="handleCommand('fields')">
            <SmartView :value="props.modelValue?.entity?.name" :length="8"> </SmartView>
        </div>
        <div class="suffix">
            <el-dropdown trigger="click"  style="height:100%;" @command="handleCommand">
               <span style="height:100%;"> <lc-icon icon="mdiDotsHorizontal"  style="height:100%;"></lc-icon></span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="basic">基本信息</el-dropdown-item>
                        <el-dropdown-item command="fields">字段选择</el-dropdown-item>
                        <el-dropdown-item command="delete" divided
                            v-if="props.modelValue.children.length == 0">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import SmartView from '../../../../components/SmartView.vue'


const props = defineProps(['modelValue'])
const emit = defineEmits(['nodeCommand'])
//
const icon = computed(() =>
    props.modelValue?.entity?.type == 'TABLE' ? 'mdiTable' : 'mdiViewGridPlusOutline'
)
//
function handleCommand(command) {
    emit('nodeCommand', command, props.modelValue)
}

</script>
<style lang="scss" scoped>
.EntityNode {
    display: flex;
    cursor: pointer;
    width: 180px;
    height: 32px;
    line-height: 32px;
    background-color: var(--el-fill-color);
    border: 1px solid var(--el-border-color);
    border-radius: 2px;

    .prefix {
        flex-basis: 24px;
        flex-grow: 0;
        padding-left: 4px;
    }

    .content {
        flex-grow: 1;
        border-left: 1px solid var(--el-border-color);
        border-right: 1px solid var(--el-border-color);
        padding-left: 4px;
        font-size: 0.9em;
        overflow:hidden;
    }

    .suffix {
        flex-basis: 24px;
        flex-grow: 0;
        padding-left: 4px;
    }
}
</style>