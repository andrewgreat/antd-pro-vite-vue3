import { toNum3, mixLighten } from 'vite-plugin-theme';
import { generate } from '@ant-design/colors'

export default {
  getAntdSerials (color) {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill(0).map((t, i) => {
      return mixLighten(color, i / 10)
    })
    // colorPalette变换得到颜色值
    const colorPalettes = generate(color)
    const rgb = toNum3(color.replace('#', '')).join(',')
    return lightens.concat(colorPalettes).concat(rgb)
  },
  changeColor (newColor) {
    var options = {
      newColors: this.getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
      changeUrl (cssUrl) {
        return `/${cssUrl}` // while router is not `hash` mode, it needs absolute path
      }
    }
    // return null
    return client.changer.changeColor(options, Promise)
  }
}
