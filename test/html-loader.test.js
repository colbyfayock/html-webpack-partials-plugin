const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/html-loader/webpack.config');

describe('html-loader', function() {
  
  it('Example of using html-loader', (done) => {
    
    webpack(config, (error, result) => {

      expect(error).to.equal(null);

      const html = fs.readFileSync(path.resolve(__dirname, '../examples/html-loader/dist/index.html')).toString();
      const fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/html-loader.html')).toString();

      expect(html).to.equal(fixture);

      done();

    });
    
  });

});
