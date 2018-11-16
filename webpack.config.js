const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type {webpack.Configuration} */
const config = {
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  entry: {
    background: './src/background',
    popup: './src/popup',
    options: './src/options',
  },
  output: {
    path: path.resolve('chrome/dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('chrome/dist'),
    new HtmlWebpackPlugin({
      title: 'QRCode helper',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      title: 'QRCode helper',
      filename: 'options.html',
      chunks: ['options'],
    }),
  ],
}

module.exports = config
