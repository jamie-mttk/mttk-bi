import { ref, computed } from 'vue'
import { findPluginsByEntry } from '@/context/appContext/appContextUtil'
import PageRender from '../pageRender/index.vue'
import PropsEditor from './propsEditor/index.vue'
export function buildMain(context) {
  const mainTabActive = ref('ui')

  //add plugins
  const plugins = findPluginsByEntry(context.appContext, 'main')
  if (plugins.length == 0) {
    return buildUi()
  }

  //User interface and main plugins
  const config = {
    '~': 'el-tabs',
    '~modelValue': mainTabActive,
    // type: 'border-card',
    '#': [buildUiPabel()]
  }
  //
  for (const p of plugins) {
    const c = {
      '~': 'el-tab-pane',
      // label:p.name,
      name: p.key,
      '#label': [{ '~': 'lc-icon', icon: p.icon, style: { 'margin-right': '4px' } }, p.name],
      '#': p.ui
    }
    //
    config['#'].push(c)
  }

  //
  return config
  //
  function buildUiPabel() {
    return {
      '~': 'el-tab-pane',
      // label: 'User Interface',
      name: 'ui',
      '#label': [
        { '~': 'lc-icon', icon: 'mdiPencilBoxMultipleOutline', style: { 'margin-right': '4px' } },
        'User Interface'
      ],
      '#': buildUi()
    }
  }
  function buildUi() {
    //Whether propEditor is expand
    const isExpand = ref(true)
    return {
      '~': 'div',
      style: { display: 'flex' },
      class: 'height-full',
      '#': [
        {
          '~': 'div',
          style: { 'flex-grow': 1 },
          '@mousedown': panelOuterClicked,
          '#': {
            '~': PageRender,
            context
          }
        },
        {
          '~': 'div',
          '~show': isExpand,
          style: { 'flex-grow': 0, 'flex-basis': '360px', 'margin-left': '10px', 'z-index': 2000 },
          '#': {
            '~': PropsEditor,
            class: 'height-full',
            style: { 'z-index': 999 },
            '@narrow': function () {
              isExpand.value = false
            }
          }
        },
        {
          '~': 'div',
          '~show': computed(() => !isExpand.value),
          style: { margin: '10px 0 0 0', color: 'var(--el-color-primary)' },
          '#': {
            '~': 'lc-icon',
            icon: 'mdiDotsVertical',
            size: 'medium',
            tooltip: 'Click to expand right panel',
            style: { 'z-index': 999 },
            '@click': function () {
              isExpand.value = true
            }
          }
        }
      ]
    }
  }
  //
  function panelOuterClicked(contxtWrap, event) {
    //
    //  console.log(arguments)
    //Click blank area,unchoose component
    //Use mousedown instead of click to avoid event bubble
    context.choosedManager.set(undefined, event.timeStamp)
  }
}
