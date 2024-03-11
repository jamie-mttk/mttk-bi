<template>
    <div>
        <div  v-for="n in props.line" :key="n"><el-button :type="$props.type">{{ n }}</el-button></div>
    </div>
</template>
<script setup lang="ts">

const props=defineProps(['line','type'])

</script>