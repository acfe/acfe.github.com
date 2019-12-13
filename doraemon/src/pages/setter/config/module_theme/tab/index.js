import theme1 from './theme1'
import theme2 from './theme2'
import theme3 from './theme3'
import theme4 from './theme4'

const themes = [
  theme1,
  theme2,
  theme3,
  theme4
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
