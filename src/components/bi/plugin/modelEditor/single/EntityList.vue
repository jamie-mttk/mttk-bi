<template>
    <div>
        <div style="font-weight: 700;margin-left:20px;margin-bottom: 10px;">表格和视图 </div>
        <div class="table-button" :draggable="true" @dragstart="handleDragstartSQL($event)">
            <lc-icon icon="mdiDatabaseEditOutline"></lc-icon>
            击拖拽插入SQL语句</div>
        <el-input style="margin-left:10px;padding:4px 4px;width:calc(100% - 12px)" v-model="filter" size="small" clearable placeholder="请输入过滤条件"></el-input>
        <!-- We need to set scrollbar height later,now it does not take affect -->
        <el-scrollbar  height="calc(100vh - 260px)">
            <div v-for="entity in entitiesFiltered" :key="entity.schema + '.' + entity.name" size="large"
                class="table-button" :draggable="true" @dragstart="handleDragstartTable($event,entity)">
               
                    <div>
                        <lc-icon :icon="entity.type == 'TABLE' ? 'mdiTable' : 'mdiViewGridPlusOutline'"></lc-icon> {{
                            entity.name }}
                    </div>
                    
                <div style="font-size:0.8em;color: var(--el-text-color-secondary);">{{ entity.description }}</div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps(['entities'])
//
const filter = ref('')
//
const entitiesFiltered=computed(()=>{

    return props.entities.filter((item)=>{
        if(!filter.value){
            //no filter
            return true;
        }
        //
        return item.name.indexOf(filter.value)>=0;
    })
})

function handleDragstartTable(event,entity){
    event.dataTransfer.setData('text',JSON.stringify(entity));
}
function handleDragstartSQL(event){
    event.dataTransfer.setData('text',JSON.stringify({'type':'SQL'}));
}
</script>

<style scoped>
.table-button {
    width: calc(100% - 32px);
    margin: 8px 20px;
    border-radius: 4px;
    color: var(--el-text-color-regular);
    cursor: pointer;
    font-size:0.8em;
}

.table-button:hover {
    background-color: var(--el-border-color);
}
</style>
  