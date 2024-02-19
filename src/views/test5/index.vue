<template>
  <div>
    <el-button @click="test">TEST</el-button>
    <el-input v-model="content" ref="testArea" type="textarea" :rows="6"></el-input>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { smartMove, smartFind } from '../test1/itemMoveUti'

const content=ref('需要注意几点：一定要等到dom更新完成后再去改变光标的位置；\r\nLine 2\r\nLine31234567890')
const testArea=ref(null)
function  insertContent(val){
  console.log(testArea.value)
  let index = testArea.value.textarea.selectionStart;
   // console.dir(dom);
  //  let index  = dom.selectionStart;
   console.log('index',index)
   content.value= content.value.substring(0,index) + val + content.value.substring(index)
  //  let contont = dom.value;
  //  textarea = contont.substring(0,index) + val + contont.substring(index,contont.length)
  //  nextTick(()=>{
  //   dom.focus();
  //   dom.setSelectionRange(index + val.length,index + val.length)
  // }
}
function test(){
  insertContent('#@~');
}
</script>
<style>


</style>