// @ts-check
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const devConfig = require('./webpack.config')

/** @type {webpack.Configuration} */
const config = {
  ...devConfig,
  mode: 'production',
  watch: false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
}

module.exports = config
