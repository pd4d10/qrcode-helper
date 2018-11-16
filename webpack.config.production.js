const webpack = require('webpack')
const devConfig = require('./webpack.config')

/** @type {webpack.Configuration} */
const config = {
  ...devConfig,
  mode: 'production',
}

module.exports = config
