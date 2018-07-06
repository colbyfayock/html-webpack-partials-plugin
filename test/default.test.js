const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('../');

it('test', (done) => {

  webpack({
    entry: {
      main: path.join(__dirname, './app/main.js')
    },
    output: {
      path: path.join(__dirname, './dist'),
      filename: '[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new HtmlWebpackPartialsPlugin({
        path: path.join(__dirname, './partials/default.html')
      })
    ]
  }, (error, result) => {

    expect(error).to.equal(null);

    const html = result.compilation.assets['index.html'].source();
    const fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/default.html')).toString();

    expect(html).to.equal(fixture);

    done();

  });

  // expect('hello').to.equal('hello');

  // done();

});