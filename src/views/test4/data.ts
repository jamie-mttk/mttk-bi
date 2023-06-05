//controllers
const c0 = [
  {
    key: '_root',
    type: '_container',
    label: 'ROOT',
    data: {},
    event: [{}],
    styles: { backgroundColor: 'red' },
    config: {
      props: {
        _children: [
          {
            key: 'button155',
            type: '_button',
            config: { props: { type: 'danger', label: 'Call api' }, slots: {} },
            data: {},
            event: [{}],
            styles: { display: 'inline-block', margin: '4px 0 4px 0' }
          }
        ]
      }
    }
  }
]
//controllers
const c1 = [
  {
    key: '_root',
    type: '_container',
    config: {
      props: {
        _children: [
          // {
          //   key: '_dialog_100',
          //   type: '_dialog',
          //   config: {
          //     props: {
          //       title: 'Dialog title',
          //       width: '50%',
          //       fullscreen: false,
          //       modal: true,
          //       draggable: true
          //     }
          //   },
          //   data: { mode: 'data', dataKey: 'dialogVisible' },
          //   event: [],
          //   styles: {}
          // },
          {
            key: 'table20',
            type: '_table',
            config: {
              props: {
                border: true,
                'empty-text': 'No data is found!',
                columns: [
                  { type: 'selection' },
                  { type: 'index', label: '#' },

                  { prop: 'name', label: 'Name' },
                  { prop: 'age', label: 'Age' },
                  { prop: 'sex', label: 'Sex' }
                ]
              }
            },
            data: {
              mode: 'data',
              dataKey: 'tableData2',
              dataPath: 'rows'
            },
            event: [],
            styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
          },
          {
            key: 'button155',
            type: '_button',
            config: { props: { type: 'danger', label: 'Call api' }, slots: {} },
            data: {},
            event: [
              {
                name: 'click',
                mode: 'api',
                api: 'retrieveData'
              }
            ],
            styles: { display: 'inline-block', margin: '4px 0 4px 0' }
          },
          {
            key: 'button165',
            type: '_button',
            config: { props: { type: 'success', label: 'Call script' }, slots: {} },
            data: {},
            event: [
              {
                name: 'click',
                mode: 'script',
                code: "alert('HELLO WORLD from '+c.d.g('formData1')['name'])"
              }
            ],
            styles: { display: 'inline-block', margin: '4px 10px 4px 0' }
          },
          {
            key: 'button215',
            type: '_button',
            config: { props: { type: 'warning', label: 'Call method' }, slots: {} },
            data: {},
            event: [
              {
                name: 'click',
                mode: 'method',
                method: 'testMethod1'
              }
            ],
            styles: { display: 'inline-block', margin: '4px 20px 4px 0' }
          },
          {
            "key": "_button_100",
            "type": "_button",
            "config": {
              "props": {
                "type": "primary",
                "label": "Show dialog"
              }
            },
            "data": {},
            "event": [
              {
                "key": "vp9vlbshe2g0",
                "name": "click",
                "mode": "script",
                "code": "c.d.s('dialogVisible',true)"
              }
            ],
            "styles": {
              "display": "inline-block",
              "margin": "4px 0 4px 0"
            }
          },
          {
            key: 'form11',
            type: '_form',
            config: {
              props: {
                inline: true,
                'label-position': 'left',
                'label-width': '50px',
                items: [
                  {
                    label: 'Name',
                    prop: 'name',
                    '~controllerType': 'input',
                    _type: 'textarea',
                    _placeholder: 'INPUT WHAT',
                    _clearable: true
                  },
                  {
                    label: 'Passed',
                    prop: 'passed',
                    '~controllerType': 'switch',
                    '_active-text': 'OK',
                    '_inactive-text': 'NOK'
                  },
                  {
                    label: 'Address',
                    prop: 'address',
                    '~controllerType': 'select',
                    _multiple: false,
                    _clearable: true,
                    __options: [
                      { label: 'Beijing', value: '01' },
                      { label: 'Shanghai', value: '02' },
                      { label: 'Guangzhou', value: '03' }
                    ]
                  },
                  {
                    label: 'Age',
                    prop: 'age',
                    '~controllerType': 'input'
                  }
                ]
              }
            },
            data: {
              mode: 'data',
              dataKey: 'formData2',
              dataPath: 'criteria'
            },
            event: [],
            styles: {
              display: 'block',
              width: '100%',
              margin: '4px 0 4px 0',
              'background-color': '#FAFAFA'
            }
          },
          {
            key: '_container_123',
            type: '_container',
            config: {
              props: {
                _children: [
                  {
                    key: '_button_219',
                    type: '_button',
                    config: {
                      props: {
                        type: 'primary',
                        label: 'Inside container 1'
                      }
                    },
                    data: {},
                    event: [],
                    styles: {
                      display: 'inline-block',
                      margin: '4px 0 4px 0'
                    }
                  },
                  {
                    key: '_button_229',
                    type: '_button',
                    config: {
                      props: {
                        type: 'success',
                        label: 'Inside container 2'
                      }
                    },
                    data: {},
                    event: [],
                    styles: {
                      display: 'inline-block',
                      margin: '4px 0 4px 0'
                    }
                  }
                ]
              }
            },
            data: {},
            event: [],
            styles: {
              display: 'block',
              width: '100%',
              'min-height': '32px',
              margin: '10px'
            }
          }
        ]
      }
    }
  }
]
//controllers
const c2 = [
  {
    key: 'form_96',
    type: '_form',
    config: {
      props: {
        inline: true,
        'label-position': 'left',
        'label-width': '50px',
        items: [
          {
            label: 'Name',
            prop: 'name',
            type: 'input'
          },
          {
            label: 'Address',
            prop: 'address',
            type: 'input'
          }
        ]
      }
    },
    data: { mode: 'data', dataKey: 'formData1' },
    event: [],
    styles: {
      display: 'block',
      width: '100%',
      margin: '4px 0 4px 0'
    }
  },
  {
    key: 'layout_103',
    type: '_layout',
    config: {
      props: {
        gutter: 0,
        Justify: 'start',
        align: 'top',
        _container: [
          {
            key: '123412',
            span: 24,
            offset: 0,
            push: 0,
            pull: 0,
            _children: [
              {
                key: 'button_57',
                type: '_button',
                config: {
                  props: {
                    type: 'primary',
                    label: 'button'
                  }
                },
                data: {},
                event: [],
                styles: {
                  display: 'inline-block',
                  margin: '4px 0 4px 0'
                }
              },
              {
                key: 'button_212',
                type: '_button',
                config: {
                  props: {
                    type: 'primary',
                    label: 'button'
                  }
                },
                data: {},
                event: [],
                styles: {
                  display: 'inline-block',
                  margin: '4px 0 4px 0'
                }
              }
            ]
          },
          {
            key: 'afda',
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            _children: [
              {
                key: 'form_34',
                type: '_form',
                config: {
                  props: {
                    inline: true,
                    'label-position': 'left',
                    'label-width': '50px',
                    items: [
                      {
                        label: 'Name',
                        prop: 'name',
                        type: 'input'
                      },
                      {
                        label: 'Address',
                        prop: 'address',
                        type: 'input'
                      }
                    ]
                  }
                },
                data: { mode: 'data', dataKey: 'formData1' },
                event: [],
                styles: {
                  display: 'block',
                  width: '100%',
                  margin: '4px 0 4px 0'
                }
              }
            ]
          },
          {
            key: 'fafd',
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            _children: [
              {
                key: 'tabs_136',
                type: '_tabs',
                config: {
                  props: {
                    type: 'card',
                    'tab-position': 'top',
                    stretch: false,
                    _container: [
                      {
                        key: '32132',
                        label: 'Tab 1',
                        _children: [
                          {
                            key: 'button_2',
                            type: '_button',
                            config: {
                              props: {
                                type: 'primary',
                                label: 'button 1'
                              }
                            },
                            data: {},
                            event: [],
                            styles: {
                              display: 'inline-block',
                              margin: '4px 0 4px 0'
                            }
                          }
                        ]
                      },
                      {
                        key: 'tab_2',
                        label: 'Tab 2',
                        _children: [
                          {
                            key: 'button_59',
                            type: '_button',
                            config: {
                              props: {
                                type: 'primary',
                                label: 'button 2'
                              }
                            },
                            data: {},
                            event: [],
                            styles: {
                              display: 'inline-block',
                              margin: '4px 0 4px 0'
                            }
                          }
                        ]
                      },
                      {
                        label: 'Tab 3',
                        _children: [
                          {
                            key: 'button_210',
                            type: '_button',
                            config: {
                              props: {
                                type: 'primary',
                                label: 'button 3'
                              }
                            },
                            data: {},
                            event: [],
                            styles: {
                              display: 'inline-block',
                              margin: '4px 0 4px 0'
                            }
                          }
                        ]
                      }
                    ]
                  }
                },
                data: {},
                event: [],
                styles: {}
              }
            ]
          },
          {
            key: 'afdf',
            span: 24,
            _children: [
              {
                key: 'button_126',
                type: '_button',
                config: {
                  props: {
                    type: 'primary',
                    label: 'button'
                  }
                },
                data: {},
                event: [],
                styles: {
                  display: 'inline-block',
                  margin: '4px 0 4px 0'
                }
              }
            ]
          }
        ]
      }
    },
    data: {},
    event: [],
    styles: {}
  }
]

const c3 = [
  {
    key: 'table20',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          { type: 'selection' },
          { type: 'index', label: '#' },

          { prop: 'name', label: 'Name' },
          { prop: 'age', label: 'Age' },
          { prop: 'sex', label: 'Sex' }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
  },
  {
    key: 'table21',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          { type: 'selection' },
          { type: 'index', label: '#' },

          { prop: 'name', label: 'Name' },
          { prop: 'age', label: 'Age' },
          { prop: 'sex', label: 'Sex' }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
  },
  {
    key: 'table22',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          { type: 'selection' },
          { type: 'index', label: '#' },

          { prop: 'name', label: 'Name' },
          { prop: 'age', label: 'Age' },
          { prop: 'sex', label: 'Sex' }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
  },
  {
    key: 'table23',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          { type: 'selection' },
          { type: 'index', label: '#' },

          { prop: 'name', label: 'Name' },
          { prop: 'age', label: 'Age' },
          { prop: 'sex', label: 'Sex' }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
  },
  {
    key: 'table24',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          { type: 'selection' },
          { type: 'index', label: '#' },

          { prop: 'name', label: 'Name' },
          { prop: 'age', label: 'Age' },
          { prop: 'sex', label: 'Sex' }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
  },
  {
    key: 'table25',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          { type: 'selection' },
          { type: 'index', label: '#' },

          { prop: 'name', label: 'Name' },
          { prop: 'age', label: 'Age' },
          { prop: 'sex', label: 'Sex' }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
  },
  {
    key: 'table26',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          { type: 'selection' },
          { type: 'index', label: '#' },

          { prop: 'name', label: 'Name' },
          { prop: 'age', label: 'Age' },
          { prop: 'sex', label: 'Sex' }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
  },
  {
    key: 'table27',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          { type: 'selection' },
          { type: 'index', label: '#' },

          { prop: 'name', label: 'Name' },
          { prop: 'age', label: 'Age' },
          { prop: 'sex', label: 'Sex' }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
  },
  {
    key: 'table28',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          { type: 'selection' },
          { type: 'index', label: '#' },

          { prop: 'name', label: 'Name' },
          { prop: 'age', label: 'Age' },
          { prop: 'sex', label: 'Sex' }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: { display: 'block', margin: '4px 0px 4px 0', width: '100%' }
  },
  {
    key: 'button155',
    type: '_button',
    config: { props: { type: 'danger', label: 'Call api' }, slots: {} },
    data: {},
    event: [
      {
        name: 'click',
        mode: 'api',
        api: 'retrieveData'
      }
    ],
    styles: { display: 'inline-block', margin: '4px 0 4px 0' }
  },
  {
    key: 'button165',
    type: '_button',
    config: { props: { type: 'success', label: 'Call script' }, slots: {} },
    data: {},
    event: [
      {
        name: 'click',
        mode: 'script',
        code: "alert('HELLO WORLD from '+c.d.g('formData1')['name'])"
      }
    ],
    styles: { display: 'inline-block', margin: '4px 10px 4px 0' }
  },
  {
    key: 'button215',
    type: '_button',
    config: { props: { type: 'warning', label: 'Call method' }, slots: {} },
    data: {},
    event: [
      {
        name: 'click',
        mode: 'method',
        method: 'testMethod1'
      }
    ],
    styles: { display: 'inline-block', margin: '4px 20px 4px 0' }
  },
  {
    key: 'form11',
    type: '_form',
    config: {
      props: {
        inline: true,
        'label-position': 'left',
        'label-width': '50px',
        items: [
          {
            label: 'Name',
            prop: 'name',
            '~controllerType': 'input',
            _type: 'textarea',
            _placeholder: 'INPUT WHAT',
            _clearable: true
          },
          {
            label: 'Passed',
            prop: 'passed',
            '~controllerType': 'switch',
            '_active-text': 'OK',
            '_inactive-text': 'NOK'
          },
          {
            label: 'Address',
            prop: 'address',
            '~controllerType': 'select',
            _multiple: false,
            _clearable: true,
            __options: [
              { label: 'Beijing', value: '01' },
              { label: 'Shanghai', value: '02' },
              { label: 'Guangzhou', value: '03' }
            ]
          },
          {
            label: 'Age',
            prop: 'age',
            '~controllerType': 'input'
          }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'formData2',
      dataPath: 'criteria'
    },
    event: [],
    styles: {
      display: 'block',
      width: '100%'
    }
  }
]

//
const c4 = [
  {
    key: 'table20',
    type: '_table',
    config: {
      props: {
        border: true,
        'empty-text': 'No data is found!',
        columns: [
          {
            type: 'selection'
          },
          {
            type: 'index',
            label: '#'
          },
          {
            prop: 'name',
            label: 'Name'
          },
          {
            prop: 'age',
            label: 'Age'
          },
          {
            prop: 'sex',
            label: 'Sex'
          }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'tableData2',
      dataPath: 'rows'
    },
    event: [],
    styles: {
      display: 'block',
      margin: '4px 0px 4px 0',
      width: '100%'
    }
  },
  {
    key: 'button155',
    type: '_button',
    config: {
      props: {
        type: 'danger',
        label: 'Call api'
      },
      slots: {}
    },
    data: {},
    event: [
      {
        name: 'click',
        mode: 'api',
        api: 'retrieveData'
      }
    ],
    styles: {
      display: 'inline-block',
      margin: '4px 0 4px 0'
    }
  },
  {
    key: 'button165',
    type: '_button',
    config: {
      props: {
        type: 'success',
        label: 'Call script'
      },
      slots: {}
    },
    data: {},
    event: [
      {
        name: 'click',
        mode: 'script',
        code: "alert('HELLO WORLD from '+c.d.g('formData1')['name'])"
      }
    ],
    styles: {
      display: 'inline-block',
      margin: '4px 10px 4px 0'
    }
  },
  {
    key: 'button215',
    type: '_button',
    config: {
      props: {
        type: 'warning',
        label: 'Call method'
      },
      slots: {}
    },
    data: {},
    event: [
      {
        name: 'click',
        mode: 'method',
        method: 'testMethod1'
      }
    ],
    styles: {
      display: 'inline-block',
      margin: '4px 20px 4px 0'
    }
  },
  {
    key: '_tabs_101',
    type: '_tabs',
    config: {
      props: {
        type: 'card',
        'tab-position': 'top',
        stretch: false,
        _container: [
          {
            key: 'tt1',
            label: 'Tab 11',
            _children: [
              {
                key: '_button_103',
                type: '_button',
                config: {
                  props: {
                    type: 'primary',
                    label: 'button11'
                  }
                },
                data: {},
                event: [],
                styles: {
                  display: 'inline-block',
                  margin: '4px 0 4px 0'
                }
              }
            ]
          },
          {
            key: 'tab_2',
            label: 'Tab 2',
            _children: [
              {
                key: '_button_105',
                type: '_button',
                config: {
                  props: {
                    type: 'primary',
                    label: 'button22'
                  }
                },
                data: {},
                event: [],
                styles: {
                  display: 'inline-block',
                  margin: '4px 0 4px 0'
                }
              }
            ]
          },
          {
            key: 'tt3',
            label: 'Tab 3',
            _children: [
              {
                key: '_button_107',
                type: '_button',
                config: {
                  props: {
                    type: 'primary',
                    label: 'button 33'
                  }
                },
                data: {},
                event: [],
                styles: {
                  display: 'inline-block',
                  margin: '4px 0 4px 0'
                }
              }
            ]
          }
        ]
      }
    },
    data: {},
    event: [],
    styles: {}
  },
  {
    key: 'form11',
    type: '_form',
    config: {
      props: {
        inline: true,
        'label-position': 'left',
        'label-width': '50px',
        items: [
          {
            label: 'Name',
            prop: 'name',
            '~controllerType': 'input',
            _type: 'textarea',
            _placeholder: 'INPUT WHAT',
            _clearable: true
          },
          {
            label: 'Passed',
            prop: 'passed',
            '~controllerType': 'switch',
            '_active-text': 'OK',
            '_inactive-text': 'NOK'
          },
          {
            label: 'Address',
            prop: 'address',
            '~controllerType': 'select',
            _multiple: false,
            _clearable: true,
            __options: [
              {
                label: 'Beijing',
                value: '01'
              },
              {
                label: 'Shanghai',
                value: '02'
              },
              {
                label: 'Guangzhou',
                value: '03'
              }
            ]
          },
          {
            label: 'Age',
            prop: 'age',
            '~controllerType': 'input'
          }
        ]
      }
    },
    data: {
      mode: 'data',
      dataKey: 'formData2',
      dataPath: 'criteria'
    },
    event: [],
    styles: {
      display: 'block',
      width: '100%',
      margin: '4px 0 4px 0',
      'background-color': '#FAFAFA'
    }
  },
  {
    key: '_container_123',
    type: '_container',
    config: {
      props: {
        _children: [
          {
            key: '_button_219',
            type: '_button',
            config: {
              props: {
                type: 'primary',
                label: 'Inside container 1'
              }
            },
            data: {},
            event: [],
            styles: {
              display: 'inline-block',
              margin: '4px 0 4px 0'
            }
          },
          {
            key: '_button_229',
            type: '_button',
            config: {
              props: {
                type: 'success',
                label: 'Inside container 2'
              }
            },
            data: {},
            event: [],
            styles: {
              display: 'inline-block',
              margin: '4px 0 4px 0'
            }
          }
        ]
      }
    },
    data: {},
    event: [],
    styles: {
      display: 'block',
      width: '100%',
      'min-height': '32px',
      margin: '10px'
    }
  }
]
//
const data1 = [
  {
    key: 'dialogVisible',
    description: 'Show or hide dialog',
    type: 'Boolean',
    initValue: false
  },
  {
    key: 'formData1',
    description: 'Search criteria',
    type: 'Object',
    initValue: { name: 'J', passed: true, address: '02', age: 33 }
  },
  {
    key: 'tableData2',
    description: 'Data to show in table',
    type: 'Object',
    initValue: {
      //Pager related
      page: 2,
      total: 4,
      sisz: 10,
      //Data
      rows: [
        { birthday: '2013-12-01', description: 'n1', address: 'Shanghai', age: 11, sex: 'male' },
        { birthday: '2014-02-03', description: 'n2', address: 'Beijing', age: 22, sex: 'female' }
      ]
    }
  },
  { key: 'simpleBoolean3', description: 'Simple boolean', type: 'Boolean', initValue: false },
  { key: 'simpleString4', description: 'Simple string', type: 'String', initValue: 'hello' },
  { key: 'simpleNumber5', description: 'Simple number', type: 'Number', initValue: 1234 },
  {
    key: 'formData2',
    description: 'Demo set with path',
    type: 'Object',
    initValue: { other: 12345, criteria: { name: 'A', passed: false, address: '03', age: 66 } }
  }
]
const apis = [
  {
    key: 'retrieveData',
    description: 'Search by criteria to load data',
    method: 'GET',
    url: 'http://127.0.0.1:4445/student',
    requestType: 'para',
    requestContentType: 'data',
    requestContentValue: 'formData1',
    responseType: 'data',
    responseValue: 'tableData2',
    responseExpression: ''
  }
]
const methods = [
  {
    key: 'testMethod1',
    description: 'Called once button is clicked',
    paras: [
      { key: 'name', description: 'Name', type: 'String' },
      { key: 'age', description: 'Age', type: 'Number' }
    ],
    code: "alert('HELLO ,method is called @'+c.d.g('formData1')['address'])"
  }
]
const computeds = [
  {
    key: 'userInfo',
    description: 'Name and address',
    code: "console.log('I AM CALLED');\r\nreturn c.d.g('formData1')['name']+' @ '+c.d.g('formData1')['address'];"
  },
  {
    key: 'firstLine',
    description: 'First line of tableData2',
    code: "return [c.d.g('tableData2').rows[0]]"
  }
]
const lifecycle = [
  {
    key: 'onMounted',
    mode: 'script',
    code: "//c.a.i('retrieveData')"
  },
  {
    key: 'onUpdated',
    mode: 'script',

    code: "console.log(' onUpdated IS CALLED from '+c.d.g('formData1')['name'])"
  }
]
//code full
export const code1 = {
  name: 'First demo report',
  description: 'This report is a simple DEMO',
  componentIndex: 99,
  data: data1,
  ui: c1,
  apis: apis,
  methods: methods,
  computed: computeds,
  lifecycle: lifecycle,
  root: {
    styles: {
      backgroundColor: '#ff0000',
      margin: '12px',
      padding: '13px'
    }
  }
}
// export const code1 = {
//   name: 'First demo report',
//   description: 'This report is a simple DEMO',
//   componentIndex: 99,
//   data: [],
//   ui: c0,
//   apis: [],
//   methods: [],
//   computed: [],
//   lifecycle: [],
//   root: {
//     styles: {
//     }
//   }
// }
//code full
export const code2 = {
  name: 'Second demo report',
  description: 'This report is a simple DEMO',
  componentIndex: 99,

  data: data1,
  ui: c2,
  apis: apis,
  methods: methods,
  computed: computeds,
  lifecycle: lifecycle
}
