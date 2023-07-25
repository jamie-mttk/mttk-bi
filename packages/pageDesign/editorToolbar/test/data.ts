
//This is the config from database
export const configDemo = {
  sys: {
    key: '_sample',
    name: 'Demo page 1',
    description: 'To demostrate a page can be configured',
    icon: 'OfficeBuilding',
    folder:'system',
    raw_page_id:'646d813f12ed7c4b6c8d5b60',
  },
  data: ['apiURL'],
  ui: [
    { uiKey: '_form_1', name: 'Query form', props: ['inline', 'label-width', 'items'] },
    { uiKey: '_table_12', name: '', props: ['columns'] },
    { uiKey: '_button_3', name: '', props: ['label'] }
  ],
  events: [
    {
      key: 'adfs2432',
      ui: '_table_12',
      event: 'row-dblclick',
      eventRaise: 'table-row-dblclick'
    }
  ]
}

