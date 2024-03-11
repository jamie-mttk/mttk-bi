<template>
  <DataModelFieldEditNormal
    v-model="config"
    prop="dimension"
    :column="{ dataType: 'number' }"
  ></DataModelFieldEditNormal>
  <el-input-number v-model="data1" style="width: 320px"></el-input-number><br />
  <el-input-number v-model="data2" style="width: 320px"></el-input-number><br />
  <el-button @click="test">TEST</el-button>
  {{ config }}
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import DataModelFieldEditNormal from '../../components/bi/components/DataModelFieldEditNormal.vue'
// import formatData from '../../components/bi/widgets/utils/dataFormat'
function test() {
  const a = 1234.456
  const b = a.toFixed(2)
  const c=b.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  console.log(a,b,toThousands(a))
}
function toThousands(num) {
    return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
//
const config = reactive({
  _format_number_converter: 'none',
  _format_number_point: 2,
  _format_number_thousandth_mark: true,
  _format_number_negative: 'bracketed',
  _format_number_prefix: '$',
  _format_number_suffix: '结束'
})

const data1 = ref(1234567.56789 * 123.45)
const data2 = ref(123456.789)

// const c1 = computed(() => formatData(data1.value, config))
// const c2 = computed(() => formatData(data2.value, config))


</script>

<style lang="scss" scoped></style>
