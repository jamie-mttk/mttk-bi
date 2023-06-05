import { computed, unref } from 'vue'
import { progressTransform } from './transform'
//progress config
export const progressConfig = {
  key: '_progress',
  name: 'Progress',
  description: 'Basic progress',
  icon: 'VideoPlay',
  transform: progressTransform,
  editor: function (data: any) {
    return [
      {
        '~component': 'el-select',
        '~label': 'Type',
        '~prop': 'type',
        clearable: true,
        '~options': ['line' , 'circle' , 'dashboard'   ]
      },
      {
        '~component': 'el-input-number',
        '~label': 'Stroke width',
        '~prop': 'stroke-width',
        clearable: true
      },
      {
        '~component': 'el-switch',
        '~label': 'Text inside',
        '~prop': 'text-inside',
        '~show': computed(() => unref(data).type == 'line')
      },
      {
        '~component': 'el-select',
        '~label': 'Status',
        '~prop': 'status',
        clearable: true,
        '~options': ['success' , 'exception' , 'warning' ]
      },
      {
        '~component': 'el-switch',
        '~label': 'Indeterminate',
        '~prop': 'indeterminate'
      },
      {
        '~component': 'el-input-number',
        '~label': 'Duration',
        '~prop': 'duration'
      },   
      {
        '~component': 'el-color-picker',
        '~label': 'Color',
        '~prop': 'color',
        '~default':'',
      },  
      {
        '~component': 'el-input-number',
        '~label': 'Width',
        '~prop': 'width',
        '~show': computed(() => unref(data).type == 'circle'|| unref(data).type == 'dashboard')
      },
      {
        '~component': 'el-switch',
        '~label': 'Show text',
        '~prop': 'show-text'
      },
      {
        '~component': 'el-select',
        '~label': 'Stroke linecap',
        '~prop': 'stroke-linecap',
        clearable: true,
        '~options': ['butt', 'round', 'square'],
        '~show': computed(() => unref(data).type == 'circle'|| unref(data).type == 'dashboard')
      },    
      {
        '~component': 'el-switch',
        '~label': 'Striped',
        '~prop': 'striped',
       },
       {
        '~component': 'el-switch',
        '~label': 'Striped flow',
        '~prop': 'striped-flow',
       },
    ]
  },
  dataConfig: {
    //readonly:true,
    type:'Number',
  },
  initConfig: {
    props: {
      type: 'line',
      'stroke-width':6,
      'text-inside':false,
      'indeterminate':false,
      duration:3,
      width:126,
      'show-text':true,
      'stroke-linecap':'round',
      striped:false,
      'striped-flow':false,
    }
  },
  initStyles: {
    margin:'6px 0',
  }
}
