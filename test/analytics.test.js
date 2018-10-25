const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/analytics/webpack.config');

describe('Analytics', function() {

  it('Adds a static partial to the body and analytics to the head with property ID variable', (done) => {

    webpack(config, (error, result) => {

      expect(error).to.equal(null);

      const html = result.compilation.assets['index.html'].source();
      const fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/analytics.html')).toString();

      expect(html).to.equal(fixture);

      done();

    });

  });

});