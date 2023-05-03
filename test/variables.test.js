const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/variables/webpack.config');

describe('Variables', function() {

  it('Adds a partial to the body with local variables', (done) => {

    webpack(config, (error, result) => {

      expect(error).to.equal(null);

      //const html = result.compilation.assets['index.html'].source();
      const html = fs.readFileSync(path.resolve(__dirname, '../examples/variables/dist/index.html')).toString();
      const fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/variables.html')).toString();

      expect(html).to.equal(fixture);

      done();

    });

  });

});