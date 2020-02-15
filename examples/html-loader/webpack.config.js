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
      // template: path.join(__dirname, './wrapper.html')
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
            attrs: ['img:src', ':srcset'],
            interpolate: require,
            minimize: true
          },
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  }
};