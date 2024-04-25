import { unref } from 'vue'
import {buildBaseOption,buildTransformEcharts} from '../utils/transformUtil'
import { formatData } from '../utils/tooltipUtil'
import {tools} from 'mttk-lowcode-engine'
import {getMetricOrDimension} from '../utils/transformTools.ts'
const validateRules = [
  { key: 'dimension', min: 1 },
  { key: '_dimensionAndMetric', min: 2 }
]

function buildOption({ config, data, context, key, contextWrap, fullConfig }) {
  //
  const modelConfig = fullConfig.config.model
  const sourceData = unref(data).data || []
  //
  //


  const dataFinal = buildTreeData(sourceData)

  //
  const option = {
    ...buildBaseOption({config,skipLegend:true}),
    tooltip: {
      valueFormatter(value){
        //Get value config from metric or dimension depends on where it is set
        return formatData(value,getMetricOrDimension(modelConfig))
      }
    },
    series: [
      {
        type: 'treemap',
        name:getMetricOrDimension(modelConfig)?.label,
        //if it is not set or it is zero, set to undefined to disable leafDepth
        //Once leafDepth is set ,drilling down is automatically enabled
         leafDepth :config['leaf-depth']||undefined,
         top:'20%',
        data: dataFinal,

      }
    ]
  }
  //
  if(config['upper-label']){
    option.series[0].upperLabel= {//Need to set levels otherwise display is really unacceptable
      show: true,
      height: 30
    },
    option.series[0].levels= getLevelOption(modelConfig)
  }

  // console.log(JSON.stringify(option))
  return option
}



//
export const biTreemapTransform = buildTransformEcharts(buildOption, validateRules, undefined, {
  skipDataset: true
})

//Internal functions
//conver data to tree structure
//input : [["province", "city", "area", "amount"], ["JS", "YZ", "WY", 2033628.72],  ["ZJ", "NB", "YZ", 1832.40], ["ZJ", "NB", "LD", 10346.40], ["ZJ", "WZ", "RA", 1466.00]]
//output:[{name:'JS',children:[{name:'YZ',children:[{name:'WY',value:2033628.72},]},]},{name:'ZJ',children:[{name:'NB',children:[{name:'YZ',value:1832.40},{name:'LD',value:10346.40},]},{name:'WZ',children:[{name:'RA',value:1466.00},]},]}},]

function buildTreeData(sourceData) {
  let tree = [];

  for (let i = 1; i < sourceData.length; i++) {
      let current = tree;
      for (let j = 0; j < sourceData[i].length - 2; j++) {
          let existing = current.find(item => item.name === sourceData[i][j]);
          if (existing) {
              current = existing.children;
          } else {
              let newNode = { name: sourceData[i][j], children: [] };
              current.push(newNode);
              current = newNode.children;
          }
      }

      let leafNode = { name: sourceData[i][sourceData[i].length - 2], value: sourceData[i][sourceData[i].length - 1] };
      current.push(leafNode);
  }

  return tree;
}




function getLevelOption(modelConfig) {
  //count metric and dimension length
  const count=modelConfig.dimension?.length||0 + modelConfig.metric?.length||0
  const result=[] as any[]
  for(let i=0;i<count;i++){
    result.push( {
     
      itemStyle: {
        borderColor:tools.generateRandomColor(),
        borderWidth: i==0?0:5,
        gapWidth: i==0?1:5,
      },
      upperLabel: {
        show: i!=0
      }
    })
  }
  return result;
  
}

// function getLevelOption1(modelConfig) {
//   return [
//     {
//       itemStyle: {
//         borderColor: 'pink',
//         borderWidth: 0,
//         gapWidth: 1
//       },
//       upperLabel: {
//         show: false
//       }
//     },
//     {
//       itemStyle: {
//         borderColor: 'yellow',
//         borderWidth: 5,
//         gapWidth: 1
//       },
//       emphasis: {
//         itemStyle: {
//           borderColor: '#ddd'
//         }
//       }
//     },
//     {

//       itemStyle: {
//         borderWidth: 5,
//         gapWidth: 1,
//         borderColorSaturation: 0.6
//       }
//     }
//   ];
// }