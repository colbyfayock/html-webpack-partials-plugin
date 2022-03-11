const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/react-root/webpack.config');

describe('React Root', function() {

  // This takes a little extra time to compile, so we need to up the default timeout a bit

  this.timeout(20000);

  it('Adds a static partial containing a div with id of root to the body and compiles a react app', (done) => {

    webpack(config, (error, result) => {

      expect(error).to.equal(null);

	  const html = fs.readFileSync(path.resolve(__dirname, '../examples/react-root/dist/index.html')).toString();
      const fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/react-root.html')).toString();

      expect(html).to.equal(fixture);

      done();

    });

  });

});