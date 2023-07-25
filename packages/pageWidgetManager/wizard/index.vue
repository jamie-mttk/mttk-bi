<template>
  <WizardDialog title="Page widget build wizard" width="85%" top="4vh" ref="wizardDialogRef" :steps="steps"
    @next="handleNext" @finish="handleFinish">
    <template v-slot="sp">
      <WizardBasic v-model="wizardData" v-show="sp.active == 0" :ref="setWizardRef(0)"></wizardBasic>
      <WizardProp v-model="wizardData" v-show="sp.active == 1" :ref="setWizardRef(1)"></WizardProp>
      <WizardData v-model="wizardData" v-show="sp.active == 2" :ref="setWizardRef(2)"></WizardData>
      <wizardModelValue v-model="wizardData" v-show="sp.active == 3" :ref="setWizardRef(3)"></wizardModelValue>
      <WizardEvent v-model="wizardData" v-show="sp.active == 4" :ref="setWizardRef(4)"></WizardEvent>
      
    </template>
  </WizardDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WizardDialog from '@/components/wizardDialog/index.vue'
import WizardBasic from './wizardBasic.vue'
import WizardProp from './wizardProp.vue'
import WizardData from './wizardData.vue'
import wizardModelValue from './wizardModelValue.vue'
import WizardEvent from './wizardEvent.vue'

//
const wizardDialogRef = ref()


// const emit = defineEmits<{
//   (e: 'dataChange', value: Object): void

// }>()
//
const wizardData=ref({})
//
const steps = [
  { key: "basic", name: 'Basic', icon: "mdiTextBoxMultipleOutline" },
  { key: "prop", name: 'UI properties', icon: "mdiChartTree" },
  { key: "data", name: "Data", icon: "mdiDatabaseMarker" },
  { key: "modelValue", name: "Model value", icon: "mdiDatabaseEye" },
  { key: "event", name: "Event", icon: "mdiCalendarAlert", finish: true },

]
//Save the callback of funciton call
let callbackSaved: Function;
//All the refs to wizard pages
const refs = []
//
function handleNext(active, done) {
  handleValidate(active, done);
}
function handleFinish(done) {
  handleValidate(steps.length - 1, () => {
    //this.handleSave(done);
    callbackSaved(wizardData.value)
    //
    done();
  });
}
function handleValidate(active, done) {
  if (refs[active].beforeClose && typeof refs[active].beforeClose == 'function') {
    refs[active].beforeClose(done)
  }else{
    done()
  }
}


function show(data: object, callback: Function) {
  wizardData.value = data
    callbackSaved = callback;
    wizardDialogRef.value.show();
}
//
function setWizardRef(index) {
  return function (el) {
    refs[index] = el
    //
  }
}
//
defineExpose({ show })
</script>
