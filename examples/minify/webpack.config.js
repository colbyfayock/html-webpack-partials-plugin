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
      minify: {

        // Begin HTML Webpack Plugin Default
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        // End HTML Webpack Plugin Default

        minifyJS: true,
        minifyCSS: true,

      },
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './partials/body.html')
    })
  ]
};