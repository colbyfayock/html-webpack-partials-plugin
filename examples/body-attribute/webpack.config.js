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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './partials/body.html')
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './partials/navbar.html'),
      location: 'body',
      priority: 'high'
    })
  ]
};