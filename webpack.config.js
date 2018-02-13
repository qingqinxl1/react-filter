const path = require('path');
const webpack = require('webpack');
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
      } //,
      // { test: /\.css$/, loader: "style!css" },
      // {test: /\.less/,loader: 'style-loader!css-loader!less-loader'}
    ]
  },
  plugins: [
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
