<template>
  <span>
    <span v-if="!needSmart">{{ stringValue }}</span>
    <span v-if="needSmart">
      <el-tooltip :content="stringValue" placement="bottom" :show-after="1000" :hide-after="500">
        <span>
        {{ smartValue }}
        <lc-icon size="x-small" icon="mdiDotsHorizontal" color="grey"></lc-icon>
      </span>
      </el-tooltip>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['value', 'length'])

//convert input value to string
const stringValue = computed(() => {
  if (props.value) {
    if (typeof props.value == "object") {
      return JSON.stringify(props.value);
    } else {
      return String(props.value);
    }
  } else {
    return "";
  }
})
// length with default
const length = computed(() => props.length ? props.length : 24)
//Whether it is needed to smart display
const needSmart = computed(() => {
  return stringValue.value.length > length.value;
})
//Smart display value
const smartValue = computed(() => (stringValue.value.substring(0, length.value))) 

</script>


