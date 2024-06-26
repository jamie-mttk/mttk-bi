<template>
  <div>AA<MttkWrapComp :config="tableConfig"></MttkWrapComp> BB</div>
</template>

<script lang="ts" setup>
import { tableData } from './data'
// import { build } from './pivot'
//
const dimensionX = [
  { key: 'province', label: '省' },
  { key: 'city', label: '市' },
  { key: 'district', label: '区' }
]
const dimensionY = [
  { key: 'category', label: '产品分类' },
  { key: 'goods', label: '产品名称' }
]
const metric = [
  { key: 'quantity', label: '数量' },
  { key: 'amount', label: '金额' }
]
//
// const { tableConfig } = build(tableData, dimensionX, dimensionY, metric)
</script>
