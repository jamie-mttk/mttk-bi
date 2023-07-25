<template>
	{{ valueInput }}
	<el-button type="primary" @click="callTest">TEST</el-button>
  <CompWrap :config="configInput"></CompWrap>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import {valueInput,configInput,placeHolder} from './data'

  
  function callTest(){
	// configInput.props.clearable=false
	// configInput.props.placeholder='HHHHHHHHHHHHHHHHHHH'
	placeHolder.value='BBBBBBBBBBBBBBBBBBBB'
  }
  </script>
  
  <style>
  
  </style>
  