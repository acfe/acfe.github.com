const path = require('path')
const getIp = require('../lib/get_ip').getIp

// dev 后台接口地址 后台接口代理到本机
// const apiProto = 'https://'
// const apiHost = 'mall-sit2.fcbox.com'
const apiProto = 'http://'
const apiHost = '10.204.240.61:8086'

// dev 本地调试虚拟服务器端口
const port = '3000'

// 环境配置参数
const envConfig = {
  test: {
    distPath: 'test',
    publicPath: '/cdn/staticResource/program/app/advice/',
    apiHost: 'http://consumer-sit2.fcbox.com/v1/adviceFeedBack/findAdviceFeedBack'
  },
  online: {
    distPath: 'online',
    publicPath: '/page/dora/online/',
    apiHost: ''
  },
  common: {
    distPath: 'common',
    publicPath: '/cdn/staticResource/program/app/advice/',
    apiHost: 'https://consumer.fcbox.com/v1/adviceFeedBack/findAdviceFeedBack'
  },
  local: {
    distPath: 'local',
    publicPath: 'http://' + getIp() + ':3000/',
    apiHost: 'http://consumer-sit2.fcbox.com/v1/adviceFeedBack/findAdviceFeedBack'
  }
}

// 入口配置
const pages = {
  polyfill: 'polyfill',
  // index: 'index',
  msg_mall: 'msg_mall',
  example: 'example',
  setter: 'setter',
  play: 'setter/play'
}
const entry = {}
for (let p in pages) {
  entry[p] = path.join(__dirname, '../../src/pages/' + pages[p] + '/index.js')
}

// 后台代理目录配置 后台接口地址的第一级目录列表
const proxyFolds = [
  '/operation/*'
]
const proxyConfig = {
  target: apiProto + apiHost,
  host: apiHost,
  secure: false,
  changeOrigin: true
}
const proxy = {}
for (let i = 0; i < proxyFolds.length; i++) {
  proxy[proxyFolds[i]] = proxyConfig
}

// 导出配置
exports.config = {
  pages,
  envConfig,
  entry,
  apiHost,
  port,
  proxy
}
