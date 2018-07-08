const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('../../');

module.exports = {
  entry: {
    main: path.join(__dirname, './main.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './partials/head.html'),
        priority: 'high',
        location: 'head'
      },
      {
        path: path.join(__dirname, './partials/body.html')
      }
    ])
  ]
};