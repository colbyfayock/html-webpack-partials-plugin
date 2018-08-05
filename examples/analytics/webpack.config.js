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
        location: 'head',
        priority: 'high',
        options: {
            // Note: Update this to your property ID
            ga_property_id: 'UA-28076707-7'
        }
      },
      {
        path: path.join(__dirname, './partials/body.html')
      }
    ])
  ]
};