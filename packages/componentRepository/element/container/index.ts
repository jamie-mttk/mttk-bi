import { containerTransform } from './transform'

//
export const containerConfig = {
  key: '_container',
  name: 'Container',
  description: 'An components container,use to set styles or visibility',
  icon: 'Memo',
  transform: containerTransform,
  editor: [],
  initConfig: {
    props: {}
  },
  initStyles: {
    display: 'block',
    width: '100%',
    'min-height': '32px',
    margin: '10px'
  }
}
