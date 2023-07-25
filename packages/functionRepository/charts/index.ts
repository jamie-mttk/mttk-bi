//
import * as echarts from 'echarts'

export function registerTheme(themeName: string, theme: Object){
    echarts.registerTheme(themeName,theme)
}

