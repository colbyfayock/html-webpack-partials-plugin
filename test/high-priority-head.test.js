const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/high-priority-head/webpack.config');

describe('High Priority Head', function() {

  it('Adds a partial below meta charset and a partial in the body with an array input', (done) => {

    webpack(config, (error, result) => {

      expect(error).to.equal(null);

      const html = result.compilation.assets['index.html'].source();
      const fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/high-priority-head.html')).toString();

      expect(html).to.equal(fixture);

      done();

    });

  });

});