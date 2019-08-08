const buildAction = require('../lib/build_action').buildAction
const envConfig = require('../config/env.config').envConfig

buildAction({
  file: 'scripts/templates/html/index.html',
  out: 'scripts/templates/www/index.html',
  replaceArr: [{
    reg: 'publicPath',
    value: envConfig.publicPath
  }]
})

buildAction({
  file: 'scripts/templates/js/entry.js',
  out: 'scripts/templates/www/entry.js',
  replaceArr: [{
    reg: 'publicPath',
    value: envConfig.publicPath
  },
  {
    reg: 'random',
    value: Math.random()
  }
  ]
})
