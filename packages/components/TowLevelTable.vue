<template>
  <el-table>
      <ExtendTableColumn v-for="c of props.config" :key="c.label" v-bind="findProps(c)">
        <template v-if="c._children && c._children.length>0">
        <ExtendTableColumn  v-for="child of c._children" :key="child.prop"   v-bind="findProps(child)"  />
      </template>
      </ExtendTableColumn>
      </el-table>
  <!-- <div>
    <div v-for="c of props.config" :key="c.label" v-bind="findProps(c)">
      <div v-for="child of c._children" :key="child.prop" >
        {{ findProps(child) }}
      </div>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
import ExtendTableColumn from './ExtendTableColumn.vue'
//Since el-table-column hierachy can NOT be config by  mttk-vue-wrap, so we have to build a component to do so
const props = defineProps({
  config: {
    type: Array,
    required: true
  }
})
//Find all the config props from c,except keys started with '_'
function findProps(c) {
  const result = {}
  for (const k of Object.keys(c)) {
    if (k.startsWith('_')) {
      continue
    }
    result[k] = c[k]
  }
  return result
}
</script>
