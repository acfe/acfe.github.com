const merge = require('webpack-merge')
// webpack
const webpack = require('webpack')
// path
const path = require('path')
// config
const config = require('./config').config
const port = config.port
const proxy = config.proxy
const getIp = require('../lib/get_ip').getIp

const common = require('./webpack-common.js')
module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'production',
  devServer: {
    contentBase: path.resolve(__dirname, '../templates/www'),
    hot: true,
    inline: true,
    open: true,
    port,
    host: getIp() || '127.0.0.1',
    proxy
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
