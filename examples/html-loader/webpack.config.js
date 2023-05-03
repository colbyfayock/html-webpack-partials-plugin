const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('../../');

module.exports = {
  entry: {
    main: path.join(__dirname, './main.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    assetModuleFilename: 'images/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './wrapper.html')
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './partials/body.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            sources: {
              list: [
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                }
              ]
            }
          }
        }
      }
    ]
  }
};