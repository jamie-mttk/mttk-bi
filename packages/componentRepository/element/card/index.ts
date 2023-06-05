import { cardTransform } from './transform'
//card config
export const cardConfig = {
  key: '_card',
  name: 'Card',
  description: 'Basic card',
  icon: 'Postcard',
  transform: cardTransform,
  editor: [
    {
      '~component': 'el-input',
      '~label': 'Header',
      '~prop': 'header',
      clearable: true
    },
    {
      '~component': 'el-select',
      '~label': 'Shadow',
      '~prop': 'shadow',
      clearable: true,
      '~options': ['always','never','hover']
    },
  ],
  initConfig: {
    props: {
      header:'Card default title',
      shadow: 'always',
    }
  },
  initStyles: {
    margin: '4px 0 4px 0'
  }
}
