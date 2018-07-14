const Partial = require('./lib/partial');

/**
 * HtmlWebpackPartialsPlugin
 * @description Webpack plugin based on HTML Webpack Plugin that allows partial injection into the compiled HTML
 */

class HtmlWebpackPartialsPlugin {

  constructor(settings = {}) {
    this.settings = settings;
  }

  apply(compiler) {

    compiler.hooks.compilation.tap('HtmlWebpackPartialsPlugin', compilation => {

      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlWebpackPartialsPlugin', (data, callback) => {

        // If the input isn't an array, add it as one to simplify the process

        if ( !Array.isArray(this.settings) ) {
          this.settings = [ this.settings ];
        }

        const partial_collection = this.settings.map(partial => {
          return new Partial(partial);
        }).filter(partial => {

          // User option to conditionally inject snippet to allow for config based
          // injection management. Additionally check to see if the partial template
          // filename matches the current HTML Webpack Plugin instance. This defaults
          // to index.html if not set

          return partial.should_inject && partial.template_filename === data.plugin.options.filename;

        }).forEach(partial => {

          // Once we know we're using the partial, read the file and create a template

          partial.createTemplate();

          // Finally inject the partial into the HTML stream

          data.html = injectPartial(data.html, {
            options: partial.options,
            html: partial.template(partial.options),
            priority: partial.priority,
            location: partial.location,
          });

        });

        callback(null, data);

      });

    });

  }

}

module.exports = HtmlWebpackPartialsPlugin;


/**
 * injectPartial
 * @description takes an html string and injects new html string based on the set priority and tag location
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