<template>
<span>
This is inside pop{{value}}

</span>


</template>
<script setup lang="ts">
import {inject,ref} from 'vue'
//
const value=inject('value')
console.log('inject in pop:'+value)

</script>