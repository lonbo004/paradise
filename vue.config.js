const webpack = require('webpack');
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        MMT: 'moment'
      }),
      new webpack.DefinePlugin({
        isDEV: process.env.NODE_ENV === 'development'
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