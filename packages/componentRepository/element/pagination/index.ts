import { computed, unref } from 'vue'
import { paginationTransform } from './transform'
//pagination config
export const paginationConfig = {
  key: '_pagination',
  name: 'Pagination',
  description: 'Basic pagination',
  icon: 'DocumentCopy',
  transform: paginationTransform,
  editor: [
    {
      '~component': 'el-input',
      '~label': 'Layout',
      '~prop': 'layout',
      clearable: true
    },

    {
      '~component': 'el-input-number',
      '~label': 'Pager count',
      '~prop': 'pager-count',
      clearable: true
    },
    {
      '~component': 'el-switch',
      '~label': 'Small',
      '~prop': 'small'
    },
    {
      '~component': 'el-switch',
      '~label': 'Background',
      '~prop': 'background'
    },
    {
      '~component': 'el-input',
      '~label': 'Page sizes',
      '~prop': 'page-sizes',
      clearable: true
    },
    // {
    //   '~component': 'el-input-number',
    //   '~label': 'Default page size',
    //   '~prop': 'default-page-size',
    //   clearable: true
    // },
    {
      '~component': 'el-input',
      '~label': 'Previous text',
      '~prop': 'prev-text',
      clearable: true
    },
    {
      '~component': 'lc-icon-picker',
      '~label': 'Previous icon',
      '~prop': 'prev-icon',
      clearable: true
    },
    {
      '~component': 'el-input',
      '~label': 'Next text',
      '~prop': 'next-text',
      clearable: true
    },
    {
      '~component': 'lc-icon-picker',
      '~label': 'Next icon',
      '~prop': 'next-icon',
      clearable: true
    },
    {
      '~component': 'el-switch',
      '~label': 'Disabled',
      '~prop': 'disabled'
    },
    {
      '~component': 'el-switch',
      '~label': 'Hide on single page',
      '~prop': 'hide-on-single-page'
    },
    {
      '~component': 'el-switch',
      '~label': 'Synchronize currrent page and page size to data',
      '~prop': '_sync_to_data'
    },
    {
      '~component': 'el-input',
      '~label': 'Field name of current page in model value',
      '~prop': '_key-current-page'
    },
    {
      '~component': 'el-input',
      '~label': 'Field name of total elements in model value',
      '~prop': '_key-total'
    },
    {
      '~component': 'el-input',
      '~label': 'Field name of page count in model value',
      '~prop': '_key-page-count'
    },
    {
      '~component': 'el-input',
      '~label': 'Field name of page size in model value',
      '~prop': '_key-page-size'
    },
  ],
  dataConfig: {
    //readonly:true,
    type: 'Object'
  },
  initConfig: {
    props: {
      layout: 'prev, pager, next, jumper, ->, total',
      'pager-count': 7,
      small: false,
      background: false,
      'page-sizes': '[10, 20, 30, 40, 50, 100]',
      //'default-page-size':10,
      disabled: false,
      'hide-on-single-page': false,
      '_sync_to_data':true,
      '_key-current-page':'page',
      '_key-total':'total',
      '_key-page-size':'size',
    }
  },
  initStyles: {
    margin: '6px 0'
  }
}
