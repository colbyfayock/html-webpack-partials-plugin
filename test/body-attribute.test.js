const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/body-attribute/webpack.config');

describe('Body Attribute', function() {

  it('Adds a static partial to the body allowing attributes on body tag', (done) => {

    webpack(config, (error, result) => {

      expect(error).to.equal(null);

      const html = result.compilation.assets['index.html'].source();
      const fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/body-attribute.html')).toString();

      expect(html).to.equal(fixture);

      done();

    });

  });

});