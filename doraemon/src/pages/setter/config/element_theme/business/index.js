import theme1 from './theme1'

const themes = [
  theme1
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
