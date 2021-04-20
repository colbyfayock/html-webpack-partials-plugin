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

          return partial.should_inject && (
            partial.template_filename === data.plugin.options.filename ||
            Array.isArray(partial.template_filename)
              ? partial.template_filename.includes(data.plugin.options.filename)
              : partial.template_filename === '*'
          );

        }).forEach(partial => this.buildTemplate(partial, data));

        callback(null, data);

      });

    });

  }


  /**
   * Build template from Partial object and data.html, returning new html.
   */
  buildTemplate(partial, data){
    // Once we know we're using the partial, read the file and create a template

    partial.createTemplate();

    // Get partial HTML
    let partial_html = partial.template(partial.options);

    // Iterate through sub-partials and build into partial_html
    if(partial.options.subPartials != null && Array.isArray(partial.options.subPartials)){

      partial.options.subPartials.map(subpartial => {
        return new Partial(subpartial);
      }).forEach(subpartial => {
        partial_html = this.buildTemplate(subpartial, { html: partial_html });
      });

    }


    // Finally inject the partial into the HTML stream

    data.html = Util.injectPartial(data.html, {
      options: partial.options,
      html: partial_html,
      priority: partial.priority,
      location: partial.location,
    });

    return data.html;
  }

}

module.exports = HtmlWebpackPartialsPlugin;