const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const webpack = require('webpack');
const config = require('../examples/replace-element/webpack.config');

describe('Replace Element', function() {

    it('Replaces replace-me tag with partial', (done) => {

        webpack(config, (error, result) => {

            expect(error).to.equal(null);

            const html = result.compilation.assets['index.html'].source();
            const fixture = fs.readFileSync(path.resolve(__dirname, 'fixtures/replace-element.html')).toString();

            expect(html).to.equal(fixture);

            done();

        });

    });

});