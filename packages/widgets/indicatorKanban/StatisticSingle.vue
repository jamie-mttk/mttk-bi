<template>
  <div class="stat-single-container">
    <div class="stat-single-title">{{ props.title || '' }}</div>
    <div class="stat-single-subtitle">{{ props.subtitle || '' }}</div>
    <div class="stat-single-value"> {{ props.value||'-' }}</div>
  </div>
</template>
<script lang="ts" setup>

const props = defineProps(['title', 'subtitle', 'value'])

</script>
<style type="scss" local>
.stat-single-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding:8px;
  white-space: nowrap;


  .stat-single-title {
    line-height: 2;
    font-weight: 700;
    font-size: 0.8em;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stat-single-subtitle {
    line-height: 2;
    font-size: 0.7em;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stat-single-value {
    margin-top: 0px;
    line-height: 2;
    font-size: 1.5em;
    font-weight: 700;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
