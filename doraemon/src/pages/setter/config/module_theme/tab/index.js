import theme1 from './theme1'
import theme2 from './theme2'
import theme3 from './theme3'
import theme4 from './theme4'
import theme5 from './theme5'
import theme6 from './theme6'
import theme7 from './theme7'

const themes = [
  theme1,
  theme2,
  theme3,
  theme4,
  theme5,
  theme6,
  theme7
]

const theme = []
const themeSet = []

for (let i in themes) {
  theme.push(themes[i].theme)
  if (themes[i].themeSet) {
    themeSet.push(themes[i].themeSet)
  }
}

export default {
  theme,
  themeSet
}
