<template>
<el-table-column  ref="tableColumnRef" :prop="props.prop" :label="props.label" :min-width="colWidth" >
<template #default="sp">        <slot v-bind="sp">{{ sp.row[props.prop] }}</slot>
</template>
</el-table-column>
</template>
<script lang="ts" setup>
import {ref,computed,unref,getCurrentInstance} from 'vue'
const tableColumnRef=ref(null)
const props=defineProps(['prop','label','widthPerChar','widthGap'])
//

//
//
const colWidth=computed(()=>{
    //Table data
   const data=unref(getCurrentInstance()?.parent?.props?.data)||[]
    //
    let maxLength=(props.label||'').length;
        if(Array.isArray(data) && (data).length>0){
            //
            for(const row of data){
                const v=row[props.prop]
                if(v!=undefined){
                    maxLength=Math.max(maxLength,v.length)
                }
            }
        }
        //
        return ((props.widthPerChar||7)*maxLength+(props.widthGap||42))+'px'
})

</script>