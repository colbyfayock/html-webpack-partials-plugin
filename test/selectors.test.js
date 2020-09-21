const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/selectors/webpack.config');

describe('selectors', function () {
  it('Adds a partial by targeting an element using css selectors', (done) => {
    webpack(config, (error, result) => {
      expect(error).to.equal(null);

      const html = result.compilation.assets['index.html'].source();
      const fixture = fs
        .readFileSync(path.resolve(__dirname, 'fixtures/selectors.html'))
        .toString();

      expect(html).to.equal(fixture);

      done();
    });
  });
});
