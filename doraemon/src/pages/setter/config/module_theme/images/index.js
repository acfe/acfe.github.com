import theme9999 from './theme9999'
import theme9 from './theme9'
import theme10 from './theme10'
import theme5 from './theme5'
import theme11 from './theme11'
import theme8 from './theme8'
import theme1 from './theme1'
import theme12 from './theme12'
import theme13 from './theme13'
import theme2 from './theme2'
import theme15 from './theme15'
import theme3 from './theme3'
import theme14 from './theme14'
import theme4 from './theme4'
import theme16 from './theme16'
import theme17 from './theme17'
// 兼容旧文本配置
import theme6 from './theme6'
import theme7 from './theme7'

const themes = [
  theme9999,
  theme9,
  theme10,
  theme11,
  theme8,
  theme1,
  theme12,
  theme13,
  theme2,
  theme15,
  theme3,
  theme14,
  theme4,
  theme16,
  theme17
]

const theme = []
const themeSet = []

for (let i in themes) {
  theme.push(themes[i].theme)
  if (themes[i].themeSet) {
    themeSet.push(themes[i].themeSet)
  }
}

// 兼容旧文本配置
themeSet.push(theme5.themeSet)
themeSet.push(theme6.themeSet)
themeSet.push(theme7.themeSet)

export default {
  theme,
  themeSet
}
