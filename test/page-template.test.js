const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/page-template/webpack.config');

describe('Page Template', function() {

  it('Creates 2 pages with a shared wrapper, navigation, and footer', (done) => {

    webpack(config, (error, result) => {

      expect(error).to.equal(null);

      const index_html = result.compilation.assets['index.html'].source();
      const index_fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/page-template-index.html')).toString();

      expect(index_html).to.equal(index_fixture);

      const about_html = result.compilation.assets['about.html'].source();
      const about_fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/page-template-about.html')).toString();

      expect(about_html).to.equal(about_fixture);

      done();

    });

  });

});