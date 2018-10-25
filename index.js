const HtmlWebpackPlugin = require('html-webpack-plugin');

const Partial = require('./lib/partial');
const Util = require('./lib/util');

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

      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync('HtmlWebpackPartialsPlugin', (data, callback) => {

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

          return partial.should_inject && ( partial.template_filename === data.plugin.options.filename || partial.template_filename === '*' );

        }).forEach(partial => {

          // Once we know we're using the partial, read the file and create a template

          partial.createTemplate();

          // Finally inject the partial into the HTML stream

          data.html = Util.injectPartial(data.html, {
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