const fs = require('fs');
const path = require('path');
const _template = require('lodash/template');

class HtmlWebpackPartialsPlugin {

  constructor(settings = {}) {
    this.path = settings.path;
    this.location = settings.location || 'body';
    this.priority = settings.priority || 'low';
    this.should_inject = typeof settings.inject === 'undefined' ? true : !!(settings.inject);
    this.options = Object.assign({}, settings.options);
  }

  apply(compiler) {

    compiler.hooks.compilation.tap('HtmlWebpackPartialsPlugin', compilation => {

      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlWebpackPartialsPlugin', (data, callback) => {

        // User option to conditionally inject snippet to allow for config based
        // injection management

        if ( !this.should_inject ) {
          callback(null, data);
          return;
        }

        const file = fs.readFileSync(path.resolve(this.path), 'utf8');
        const template = _template(file);

        data.html = injectPartial(data.html, {
          options: this.options,
          html: template(this.options),
          priority: this.priority,
          location: this.location,
        });

        callback(null, data);

      });

    });

  }

}

module.exports = HtmlWebpackPartialsPlugin;


/**
 * injectPartial
 * @description takes an html string and injects new html string based on the
 *     set priority and tag location
 */

function injectPartial(base_html, { options, html, priority, location }) {

  let tag;
  let regex;
  let replacement;

  if ( location === 'head' && priority === 'high' ) {
    tag = '<meta charset="utf-8">';
    regex = new RegExp(tag, 'i');
  } else {
    tag = targetTag(priority, location);
    regex = new RegExp(tag.replace('/', '\/'), 'i');
  }

  if ( priority === 'low' ) {
    replacement = `${html}${tag}`;
  } else {
    replacement = `${tag}${html}`;
  }

  return base_html.replace(regex, replacement);

}


/**
 * targetTag
 * @description Creates an opening or closing html tag string based on priority and location
 */

function targetTag(priority, location) {
  return `<${priority === 'high' ? '' : '/'}${location}>`;
}