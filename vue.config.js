const webpack = require('webpack');

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        MMT: 'moment'
      })
    ],
    resolve: {
      alias: {
        '@c': '@/components',
        '@v': '@/views',
        '@img': '@/assets/img',
        '@css': '@/assets/css',
        '@js': '@/assets/js',
        '@mix': '@/assets/mixins',
      }
    }
  }
}