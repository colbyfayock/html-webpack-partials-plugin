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
    new HtmlWebpackPlugin({
      filename: 'other-page.html',
      template: path.join(__dirname, './other-page.html')
    }),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './partials/body.html')
      },
      {
        path: path.join(__dirname, './partials/other-body.html'),
        template_filename: 'other-page.html'
      }
    ])
  ]
};