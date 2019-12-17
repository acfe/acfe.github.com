import theme1 from './theme1'
import theme2 from './theme2'
import theme3 from './theme3'
import theme9999 from './theme9999'

const themes = [
  theme9999,
  theme1,
  theme3,
  theme2
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
