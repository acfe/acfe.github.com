// webpack
const webpack = require('webpack')
const merge = require('webpack-merge')
// plugins
const ManifestPlugin = require('webpack-manifest-plugin')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const common = require('./webpack-common.js')
module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([{
      from: 'www'
    }], path.resolve(__dirname, '../templates')),
    // manifest
    new ManifestPlugin({
      fileName: 'manifest.json'
    }),
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
})
