const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    filter: [
      './src/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              sourceMap: true,
              minimize: true
            }
          }]
        }),
        exclude: /node_modules/,
      }
      // {test: /\.less/,loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  plugins: [
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
