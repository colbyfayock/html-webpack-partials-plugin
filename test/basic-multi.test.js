const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/basic-multi/webpack.config');

describe('Basic Multi', function() {

  it('Adds a static partial to the body of 2 different instances', (done) => {

    webpack(config, (error, result) => {

      expect(error).to.equal(null);

      const index_html = result.compilation.assets['index.html'].source();
      const index_fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/basic-multi-index.html')).toString();

      expect(index_html).to.equal(index_fixture);

      const other_html = result.compilation.assets['other-page.html'].source();
      const other_fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/basic-multi-other.html')).toString();

      expect(other_html).to.equal(other_fixture);

      done();

    });

  });

});