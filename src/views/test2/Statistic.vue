<template>
  <div class="stat-container">
    <div v-for="(d,index) in props.data" class="stat-single" :style="singleStyle(index)">
      <StatisticSingle :title="d.title"  :subtitle="d.subtitle"  :value="d.value" :style="singleItemStyle(index)"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import StatisticSingle from './StatisticSingle.vue'

//data structure  [{'title':'China','subtitle':'Sales','value':123456},{'title':'USA','subtitle':'Sales','value':34567},{'title':'Germany','subtitle':'Sales','value':23456}]
const props = defineProps(['data', 'qtyPerRow'])
//index is started from 0
const singleStyle=computed(()=>(index)=>{ 
   //
   const qtyPerRow=props.qtyPerRow||4
  //
   const result={} as any

   //width ,depends on qtyPerRow
   result.width=100/qtyPerRow+'%'
   //Add a bottom border if it is NOT the last row
   if(!isLastRow(index,qtyPerRow,(props.data||[]).length))
   result['border-bottom']='1px solid rgb(0,0,0,0.1)'
   //
    return result
})
function isLastRow(index,qtyPerRow,total){
  const totalRow=parseInt(total%qtyPerRow==0?total/qtyPerRow:total/qtyPerRow+1)
  return index>qtyPerRow*(totalRow-1)-1
   
}
const singleItemStyle=computed(()=>(index)=>{ 
    //
    const qtyPerRow=props.qtyPerRow||4 
  //
   const result={'padding-left':'32px'} as any
  
    //If it is not the first item of the row,add a right border
    if(index%qtyPerRow!=0){
        result['border-left']='1px solid rgb(0,0,0,0.1)'
    }
    //
    return result
})
</script>
<style type="scss" local>
.stat-container{
    display:flex;
    flex-wrap:wrap;
    .stat-single{
        padding:20px;
        box-sizing: border-box;

    }
}
</style>