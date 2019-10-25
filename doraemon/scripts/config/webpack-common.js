// plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// config
const config = require('./config').config
const envConfig = require('./env.config').envConfig
const entry = config.entry
// path
const path = require('path')
const buildPath = path.resolve(__dirname, '../../dist/' + envConfig.distPath)

module.exports = {
  entry,
  output: {
    path: buildPath,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: envConfig.publicPath || '/'
  },
  context: path.resolve(__dirname, '../../src'),
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
      loader: 'file-loader',
      query: {
        name: 'images/[name].[ext]'
      }
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract('css-loader')
    },
    {
      test: /\.less$/,
      use: ExtractTextPlugin.extract('css-loader!less-loader')
    }
    ]
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '../../src'),
      'fcbox': path.resolve(__dirname, '../../fcbox')
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](vue)|(vuex)|(vue-router)|(wangeditor)/,
          name: 'vendor',
          priority: -20,
          chunks: 'all'
        }
      }
    },
    minimizer: [new OptimizeCssAssetsPlugin({})]
  }
}
