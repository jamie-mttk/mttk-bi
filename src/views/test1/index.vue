<template>
	<el-button type="primary" @click="test1">Test1</el-button>
	<el-button type="primary" @click="test2">Test2</el-button>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'
import { a1, a2 } from './test1'
import * as funcs from '@/functionRepository/element/index'
import useFunctionRepository from '@/functionRepository/index'

const formInline = reactive({
	user: '',
	region: '',
})
let base = 10
const test1 = () => {
	//
	const rep = useFunctionRepository()
	// rep.regist('a1', a1)
	// rep.regist('a2', a2)
	// console.log('registered:' + rep.get('a1'))
	//console.log(funcs)
	
	rep.registBatch(funcs)
	

}
const test2 = () => {
	const rep = useFunctionRepository()
	// console.log(repo.list())
	// const a1 = repo.get('a1')
	// if (typeof a1 == 'function') {
	// 	console.log('A1 returns:'+a1())	
	// } else {
	// 	console.log('a1 is not available')
	// }
	rep.get('ElMessage')('TEST MESSAGE')
}
</script>
  