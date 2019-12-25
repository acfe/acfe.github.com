import theme1 from './theme1'
import theme1001 from './theme1001'
import theme2 from './theme2'
import theme3 from './theme3'
import theme4 from './theme4'
import theme5 from './theme5'
import theme6 from './theme6'
import theme7 from './theme7'
import theme8 from './theme8'

const themes = [
  theme1001,
  theme1,
  theme2,
  theme3,
  theme4,
  theme5,
  theme6,
  theme7,
  theme8
]

const theme = []
const themeSet = []

for (let i in themes) {
  if (themes[i].theme) {
    theme.push(themes[i].theme)
  }
  if (themes[i].themeSet) {
    themeSet.push(themes[i].themeSet)
  }
}

export default {
  theme,
  themeSet
}
