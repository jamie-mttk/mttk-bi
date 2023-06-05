<template>
      <div class="icon-holder" @click="emit('iconChoosed', props.icon)">
        <component :is="props.icon" class="icon"></component>
        <span class="name"> {{ icon }}</span>
      </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//
let props = defineProps({
  icon: {
    type: String,
    required: true,
    default:''
  },
})
//const emit = defineEmits(["update:modelValue"])
const emit = defineEmits<{
  (e: 'iconChoosed', value: string): void
}>()

//Store all the icons, so no need to load frequently
const iconsAll = ref([] as string[])
onMounted(() => {
  let result = []
  for (const [key] of Object.entries(ElementPlusIconsVue)) {
    result.push(key)
  }
  iconsAll.value = result
})
const icons = computed(() => {
  return iconsAll.value.filter(icon => {
    if (!filter.value) {
      return true
    }
    //
    return icon.indexOf(filter.value) >= 0
  })
})
const filter = ref('')
</script>
<style scoped lang="scss">
  .icon-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;

    .icon {
      height: 2em;
      width: 2em;

    }

    .name {
      margin-top: 8px;
    }
  }
</style>
