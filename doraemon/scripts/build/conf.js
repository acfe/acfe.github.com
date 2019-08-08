const buildAction = require('../lib/build_action').buildAction
const config = require('../config/config').config
const envConfig = config.envConfig

const argument = process.argv.splice(2)
const envKey = argument[0] || 'local'

const file = 'scripts/templates/js/env.config.js'
const replaceArr = [{
  reg: 'envConfig',
  value: JSON.stringify(envConfig[envKey])
}]

buildAction({
  file,
  out: 'scripts/config/env.config.js',
  replaceArr
})

buildAction({
  file,
  out: 'src/common/js/env.config.js',
  replaceArr
})
