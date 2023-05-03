const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/custom-multi-template-filename/webpack.config');

describe('Custom Multi template_filename', function() {

  it('Adds a static partial to the body of 2 different instances using array for "template_filename"', (done) => {

    webpack(config, (error, result) => {

      expect(error).to.equal(null);

      const index_html = fs.readFileSync(path.resolve(__dirname, '../examples/custom-multi-template-filename/dist/index.html')).toString();
      const index_fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/custom-multi-template-filename-index.html')).toString();
      expect(index_html).to.equal(index_fixture);

      const other_html = fs.readFileSync(path.resolve(__dirname, '../examples/custom-multi-template-filename/dist/other-page.html')).toString();
      const other_fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/custom-multi-template-filename-other.html')).toString();

      expect(other_html).to.equal(other_fixture);

      done();

    });

  });

});