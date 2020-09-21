const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('../../');

module.exports = {
  entry: {
    main: path.join(__dirname, './main.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './templates/index.html'),
      chunks: ['main'],
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './partials/targetMe.html'),
      template_filename: ['index.html'],
      location: 'div#target-me, .target-me-too',
      priority: 'high',
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './partials/targetMe.html'),
      template_filename: ['index.html'],
      location: 'section.low-priority',
      priority: 'low',
    }),
  ],
};
