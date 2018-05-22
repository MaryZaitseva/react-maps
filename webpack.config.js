const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/index.jsx'),
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '/'
  },
  mode: "development",
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.html']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        }
    ]
  },
  devServer: {
    contentBase: './build'
  },
   plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./public/index.html")
        })
    ]
};
