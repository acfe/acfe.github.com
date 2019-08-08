/**
 * Created by 001264 on 2017/6/26.
 */

const FcButton = {
  name: 'FcButton',
  data () {
    return {
      className: {},
      tapClassName: {},
      style: {},
      textStyle: {},
      tapStyle: {}
    }
  },
  props: ['param', 'callback', 'text'],
  created () {
    this.paramInit()
  },
  methods: {
    paramInit () {
      const { param } = this
      let className = 'fc-button'
      let tapClassName = 'fc-button-tap'
      param.type = param.type || 'default'
      switch (param.type) {
        case 'default':
          className += ' fc-button-default-style'
          break
        case 'border':
          className += ' fc-button-border-style'
          break
      }
      /* themeInit */
      let themes = [
        'blue',
        'lightBlue',
        'cyan',
        'teal',
        'green',
        'lightGreen',
        'lime',
        'red',
        'pink',
        'purple',
        'deepPurple',
        'indigo',
        'yellow',
        'amber',
        'orange',
        'deepOrange',
        'brown',
        'grey',
        'blueGrey'
      ]
      let themeClassNames = {}
      themes.map((item) => {
        themeClassNames[item] = {
          text: {
            className: 'fc-button-text-' + item,
            tapClassName: 'fc-button-tap-text-' + item
          },
          border: {
            className: 'fc-button-border-' + item,
            tapClassName: 'fc-button-tap-border-' + item
          },
          default: {
            className: 'fc-button-default-' + item,
            tapClassName: 'fc-button-tap-default-' + item
          }
        }
      })
      if (themeClassNames[param.theme] && themeClassNames[param.theme][param.type]) {
        let themeClass = themeClassNames[param.theme][param.type]
        if (themeClass.className) {
          className += ' ' + themeClass.className
        }
        if (themeClass.tapClassName) {
          tapClassName += ' ' + themeClass.tapClassName
        }
      }
      /* styleInit */
      let style = param.style || {}
      let textStyle = param.textStyle || {}
      let tapStyle = param.tapStyle || {}
      if (param.disabled) {
        className += ' fc-button-disabled'
      }
      this.className = className
      this.tapClassName = tapClassName
      this.style = style
      this.textStyle = textStyle
      this.tapStyle = tapStyle
    },
    clickAction () {
      this.callback && this.callback()
    }
  }
}

export default FcButton
