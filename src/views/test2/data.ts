import { ref, reactive, isRef, computed } from 'vue'
import Tester from './Tester.vue'
export const formValue = reactive({ name: 'o', address: '1', switch: true })
export const config1 = {
  sys: {
    //
    component: 'ElForm'
  },
  props: {
    // inline:true,
    labelPosition: 'right',
    labelWidth: 80,
    size: 'default',
    disabled: false,
    model: formValue,
    inline: true
  },
  //
  slots: {
    default: {
      type: 'wrap',
      value: [
        {
          sys: {
            //
            component: 'el-form-item'
          },
          props: {
            //
            label: 'Switch',
            prop: 'switch',
            labelWidth: '50px',
            required: true
          },
          slots: {
            default: {
              type: 'wrap',
              value: {
                sys: {
                  component: 'ElSwitch',
                  modelValue: formValue,
                  modelValuePath: 'switch'
                },
                props: {
                  validateEvent: false
                },
                lifecycle: {
                  onMounted: function () {
                    console.log('Switch onMounted is called>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                  },
                  onUnmounted: function () {
                    console.log('Switch onUnmounted is called<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                  }
                }
              }
            }
          }
        },
        {
          sys: {
            //
            component: 'el-form-item'
          },
          props: {
            //
            label: 'Name',
            prop: 'name',
            labelWidth: '50px',
            required: true
          },
          slots: {
            default: {
              type: 'wrap',
              value: {
                sys: {
                  component: 'ElInput',
                  //Use a computed to config modelValue
                  modelValue: computed({
                    get() {
                      return formValue.name
                    },
                    set(valueNew) {
                      formValue.name = valueNew
                    }
                  })
                },
                props: {
                  //
                  disabled: computed(() => formValue.switch),
                  placeholder: 'Please input name to filter',
                  clearable: false
                }
              }
            }
          }
        },
        {
          sys: {
            //
            component: 'el-form-item',
            show: computed(() => formValue.switch)
          },
          props: {
            label: 'Address',
            prop: 'address'
          },
          slots: {
            default: {
              type: 'wrap',
              value: {
                sys: {
                  component: 'ElInput',
                  //Use modelValuePath config modelValue
                  modelValue: formValue,
                  modelValuePath: 'address'
                },
                props: {
                  placeholder: 'Input address to filter'
                }
              }
            }
          }
        }
      ]
    }
  },
  events: {
    validate: { type: 'inherit', value: 'validate' }
  }
}

export const config2 = {
  sys: {
    //
    component: 'ElForm'
  },
  props: {
    // inline:true,
    labelPosition: 'right',
    labelWidth: 120,
    size: 'default',
    disabled: false,
    model: formValue,
    inline: false
  },
  //
  slots: {
    default: {
      type: 'wrap',
      value: [
        {
          sys: {
            //
            component: 'el-form-item',
            instanceKeyAsKey: true
          },
          props: {
            //
            label: 'Switch 1',
            prop: 'switch',
            // labelWidth: "50px",
            required: true
          },
          slots: {
            default: {
              type: 'wrap',
              value: {
                sys: {
                  component: 'ElSwitch',
                  modelValue: formValue,
                  modelValuePath: 'switch'
                },
                props: {
                  validateEvent: false
                }
              }
            }
          }
        },
        {
          sys: {
            //
            component: 'el-form-item'
          },
          props: {
            //
            label: 'Name',
            prop: 'name',
            // labelWidth: "50px",
            required: true
          },
          slots: {
            default: {
              type: 'wrap',
              value: {
                sys: {
                  component: 'ElInput',
                  //Use a computed to config modelValue
                  modelValue: computed({
                    get() {
                      return formValue.name
                    },
                    set(valueNew) {
                      formValue.name = valueNew
                    }
                  })
                },
                props: {
                  //
                  disabled: computed(() => formValue.switch),
                  placeholder: 'Please input name to filter',
                  clearable: false
                }
              }
            }
          }
        },
        {
          sys: {
            //
            component: 'el-form-item',
            show: computed(() => formValue.switch)
          },
          props: {
            label: 'Address 2',
            prop: 'address'
          },
          slots: {
            default: {
              type: 'wrap',
              value: {
                sys: {
                  component: 'ElInput',
                  //Use modelValuePath config modelValue
                  modelValue: formValue,
                  modelValuePath: 'address'
                },
                props: {
                  placeholder: 'Input address to filter'
                }
              }
            }
          }
        },
        {
          sys: {
            //
            component: 'el-form-item',
            show: computed(() => formValue.switch)
          },
          props: {
            label: 'Phone',
            prop: 'phone'
          },
          slots: {
            default: {
              type: 'wrap',
              value: {
                sys: {
                  component: 'ElInput',
                  //Use modelValuePath config modelValue
                  modelValue: formValue,
                  modelValuePath: 'phone'
                },
                props: {
                  placeholder: 'Input PHONE to filter'
                }
              }
            }
          }
        }
      ]
    }
  },
  events: {
    validate: { type: 'inherit', value: 'validate' }
  }
}

export const valueInput = ref('InitValue')
export const config3 = {
  sys: {
    //
    component: 'ElInput',
    //Set modelValue with computed,demo only since here it is not necessary
    modelValue: computed({
      get() {
        return valueInput.value
      },
      set(value) {
        valueInput.value = value
      }
    })
  },
  props: {
    placeholder: 'Please input value',
    clearable: true
  },
  slots: {},
  events: {}
}

export const showMe = ref(true)
export const myColor = ref('red')
export const myClasses = ref(['class-pink'])
export const configCard = reactive({
  sys: {
    //
    component: 'el-card',
    // instanceKey:'132312',
    instanceKeyAsKey: true
    //Set modelValue with computed,demo only since here it is not necessary
  },
  props: {
    header: 'This is card LALA'
  },
  slots: {
    default: {
      sys: {
        component: 'el-button',
        instanceKey: '123456789',
        instanceKeyAsKey: true,
        show: showMe

        //
        //  component: 'ElButton'
        //   component:
        //Set modelValue with computed,demo only since here it is not necessary
      },
      props: {
        type:'primary',
      },
      slots: {
        default: 'HELLO'
      },
      styles: {
        // color:myColor
      },
      classes: myClasses,
      events:{
        click:function(){
          console.log('i am clicked')
        }
      }
    }
    // default: {
    //   type: 'wrap',
    //   // value: function () {
    //   //   console.log(arguments)
    //   //   return config1
    //   // },
    //   value:function(){
    //     console.log(arguments)
    //     return [config1,config2]
    //   }
    //   // value:[config1,config2],
    // // },
    // default:{
    //   type:'html',
    //   value:function(){
    //     return 'THIS IS <span style="color:red">HTML 5</span>'
    //   }
    // }
  },
  lifecycle: {
    onMounted: function () {
      // console.log('Component is mounted>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    },
    onUnmounted: () => {
      // console.log('Component is unmounted<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    }
  }
})


export const configTransform = {
  '~transform':function(config){
    console.log(config)
    // console.log(ctx)
   // console.log(ctx.emit('click'))
    return {  '~component':'el-button',
    'type':'primary',
    '#':config.content}
  },
  content:'HAHAHAHA'
}