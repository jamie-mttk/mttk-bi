<template>
  <div>
    <div class="title-area" v-if="hasTitle">
      <div class="title">{{ props.title }}</div>
      <div class="subtitle">{{ props.subtitle }}</div>
    </div>
    <div class="stat-container">
      <div v-for="(d, index) in props.data" class="stat-single" :style="singleStyle(index)">
        <StatisticSingle
          :title="d.title"
          :subtitle="d.subtitle"
          :value="d.value"
          :style="singleItemStyle(index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import StatisticSingle from './StatisticSingle.vue'

//data structure  [{'title':'China','subtitle':'Sales','value':123456},{'title':'USA','subtitle':'Sales','value':34567},{'title':'Germany','subtitle':'Sales','value':23456}]
const props = defineProps(['data', 'qtyPerRow', 'title', 'subtitle'])
//index is started from 0
const singleStyle = computed(() => (index) => {
  //
  const qtyPerRow = props.qtyPerRow || 4
  //
  const result = {} as any

  //width ,depends on qtyPerRow
  result.width = 100 / qtyPerRow + '%'
  //Add a bottom border if it is NOT the last row
  if (!isLastRow(index, qtyPerRow, (props.data || []).length))
    result['border-bottom'] = '1px solid rgb(0,0,0,0.1)'
  //
  return result
})
function isLastRow(index, qtyPerRow, total) {
  const totalRow = parseInt(total % qtyPerRow == 0 ? total / qtyPerRow : total / qtyPerRow + 1)
  return index > qtyPerRow * (totalRow - 1) - 1
}
const singleItemStyle = computed(() => (index) => {
  //
  const qtyPerRow = props.qtyPerRow || 4
  //
  const result = { 'padding-left': '8 px' } as any

  //If it is not the first item of the row,add a right border
  if (index % qtyPerRow != 0) {
    result['border-left'] = '1px solid rgb(0,0,0,0.1)'
  }
  //
  return result
})
//
const hasTitle=computed(()=>props.title||props.subtitle)
</script>
<style type="scss" local>

  .title-area {
    display: inline-block;
    margin: 8px 8px;

    border-bottom:1px solid rgb(0,0,0,0.1);
    .title {
      line-height:2;
      font-size: 1.1em;
      font-weight: 700;

      display:inline;
      vertical-align: bottom;
      color:var(--el-text-color-primary)
    }
    .subtitle {
      line-height:2;
      font-size: 0.8em;
      margin-left:12px;
      display:inline;
      vertical-align: bottom;
      color:var(--el-text-color-secondary)

    }
  }
.stat-container {
  display: flex;
  flex-wrap: wrap;

  .stat-single {
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
