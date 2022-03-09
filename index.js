const HtmlWebpackPlugin = require('html-webpack-plugin');

const Partial = require('./lib/partial');
const Util = require('./lib/util');

/**
 * HtmlWebpackPartialsPlugin
 * @description Webpack plugin based on HTML Webpack Plugin that allows partial injection into the compiled HTML
 */

class HtmlWebpackPartialsPlugin {
	static filesProcessed = [];

  constructor(settings = {}) {
    this.settings = settings;
  }

  apply(compiler) {
	const { webpack } = compiler;
	const { Compilation } = webpack;
	const { RawSource } = webpack.sources;

	// If the input isn't an array, add it as one to simplify the process

	if ( !Array.isArray(this.settings) ) {
		this.settings = [ this.settings ];
	}

	this.partial_collection = this.settings.map(partial => {
		return new Partial(partial);
	});

	// We treat the partial as a HtmlWebpackPlugin template so that html-loader can process the partial and get the assets (example imgs)

	this.partial_collection.forEach(partial => {
		new HtmlWebpackPlugin({
			template: partial.path,
			inject: false,
			filename: partial.unique_name,
			templateParameters: partial.options
		}).apply(compiler);
	});

	// Get list of files processed by HtmlWebpackPlugin

	compiler.hooks.compilation.tap('HtmlWebpackPartialsPlugin', compilation => {
		HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('HtmlWebpackPartialsPlugin', (data, cb) => {
			!HtmlWebpackPartialsPlugin.filesProcessed.includes(data.outputName) ? HtmlWebpackPartialsPlugin.filesProcessed.push(data.outputName) : '';
			cb(null, data);
		});
	});

	// Use this hook and this stage to ensure that all assets were already added to the compilation by other plugins
	// and we can use to get htmls and put partial in them

	compiler.hooks.thisCompilation.tap('HtmlWebpackPartialsPlugin', (compilation) => {
		compilation.hooks.processAssets.tap(
			{
				name: 'HtmlWebpackPartialsPlugin',
				stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
			},
			(assets) => {
				this.partial_collection.forEach(partial => {
					// Get list of files to add partial
					let filesProcessed = partial.template_filename;
					if(!Array.isArray(partial.template_filename)){
						if(filesProcessed == '*'){
							filesProcessed = HtmlWebpackPartialsPlugin.filesProcessed.filter(f => f != partial.unique_name);
						}else{
							filesProcessed = [partial.template_filename];
						}
					}

					filesProcessed.forEach( template_filename => {
						//We get the html template where the partial will be injected
						const dataHtml = compilation.getAsset(template_filename).source._value;
						// Inject the partial into the HTML template
						const html = Util.injectPartial(dataHtml, {
							options: partial.options,
							// We get the partial and transform it in a loash template to pass options
							html: partial.createTemplate(compilation.getAsset(partial.unique_name).source._value),
							priority: partial.priority,
							location: partial.location,
						});
	
						compilation.updateAsset(template_filename, new RawSource(html));
					});
				});
				
			});
		}
	);
	
	// With this hook we can delete the partial before webpack convert it in a html file,
	// at this point the partial should have already been injected into the selected template 

	compiler.hooks.thisCompilation.tap('HtmlWebpackPartialsPlugin', (compilation) => {
		compilation.hooks.processAssets.tap(
			{
				name: 'HtmlWebpackPartialsPlugin',
				stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE,
			},
			(assets) => {
				this.partial_collection.forEach(partial => {
					compilation.deleteAsset(partial.unique_name);
				});
			});
		}
	);
	
  }

}

module.exports = HtmlWebpackPartialsPlugin;