import {ref,reactive} from 'vue'
//
export const valueInput = ref("");
export const placeHolder=ref('AAAAAAAAAAAAAAAAAAAAAAA')

//A simple input configuration
export const configInput = {
  sys: {
    //
    component: "ElInput",
    modelValue: valueInput,
  },
  props: {
    placeholder:placeHolder,
    clearable: true,
  },
  slots: {},
  events: {},
}