<template>
    <div class="EntityNode">
        <div class="prefix"><lc-icon :icon="icon" ></lc-icon></div>
        <div class="content"><SmartView :value="props.modelValue?.entity?.name" :length="8">  </SmartView></div>
        <div class="suffix"><lc-icon icon="mdiTrashCanOutline" ></lc-icon></div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import SmartView from '../../components/bi/components/SmartView.vue'
const props = defineProps(['modelValue'])
//
const icon=computed(()=>
    props.modelValue?.entity?.type=='TABLE'?'mdiTable':'mdiViewGridPlusOutline'
)


</script>
<style lang="scss" scoped>
.EntityNode {
    display: flex;
    width: 180px;
    height: 32px;
    line-height: 32px;
    background-color: var(--el-fill-color);
    border:1px solid var(--el-border-color);
    border-radius: 2px;
    .prefix {
        flex-basis: 24px;
        flex-grow: 0;
        padding-left:4px;
    }

    .content {
        flex-grow: 1;
        border-left:1px solid var(--el-border-color);
        border-right:1px solid var(--el-border-color);
        padding-left:4px;
        font-size:0.9em;
    }

    .suffix {
        flex-basis: 24px;
        flex-grow: 0;
       padding-left:4px;
    }
}</style>