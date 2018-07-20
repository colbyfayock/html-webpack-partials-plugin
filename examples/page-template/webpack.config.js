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
      template: path.join(__dirname, './wrapper.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: path.join(__dirname, './wrapper.html')
    }),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './partials/nav.html'),
        template_filename: '*'
      },
      {
        path: path.join(__dirname, './pages/home.html')
      },
      {
        path: path.join(__dirname, './pages/about.html'),
        template_filename: 'about.html'
      },
      {
        path: path.join(__dirname, './partials/footer.html'),
        template_filename: '*'
      },
    ])
  ]
};