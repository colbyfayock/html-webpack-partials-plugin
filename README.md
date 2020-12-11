# Partials for HTML Webpack Plugin
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![CircleCI Status](https://circleci.com/gh/colbyfayock/html-webpack-partials-plugin.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/colbyfayock/html-webpack-partials-plugin) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/colbyfayock/html-webpack-partials-plugin/blob/master/LICENSE)

Extends [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) to add support for partials or templates.

## Requirements
Relies on `html-webpack-plugin` 4+ (currently at beta)

## Installation
```
yarn add html-webpack-partials-plugin -D
```
or
```
npm add html-webpack-partials-plugin --save-dev
```

## Usage

Require the plugin in your webpack config:
```
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
```

Add the plugin to your webpack config as follows:
```
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackPartialsPlugin({
    path: './path/to/partials/body.html'
  })
]
```

Set up your partial:
```
<div>Hello World!</div>
```

### Settings
| Name      | Type     | Default | Description
|:---------:|:--------:|:-------:|:----------|
| path      | String   | none    | Partial location
| inject    | Boolean  | true    | Conditionally inject your partial
| location  | String   | "body"  | HTML tag name where the the partial gets added
| priority  | String   | "low"   | "high", "low", "replace" - high/low determines if the partial gets added from the start of the location or end, while replace replaces the element completely.
| template_filename | String/String[] | "index.html" | The filename of the HTML Webpack Plugin template that the partial should be attributed to. By default this is `index.html`, the HTML Webpack Plugin default output. Additionally, passing `*` will apply the partial to all templates in the compilation. This doesn't currently work in a regex format, thus something like `*.html` will NOT work and the only functionality `*` will provide is to match all templates. You can also pass an array of strings.
| options   | Object   | {}      | Local variables/options to the given partial

The settings can either be passed in as a single object or an array of objects.

## Examples

### React App Root

Don't bother creating a custom template just to add a [React](https://reactjs.org/) root element, simply add it as a partial!

#### Set Up Your Config
Using an example of `webpack.config.js` with Babel installed:
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('../../');

module.exports = {
  entry: {
    main: path.join(__dirname, './main.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, './partials/body.html')
    })
  ]
};
```

#### Set Up your Partial
Add a mounting point for your application at `partials/body.html`:

```
<div id="root"></div>
```

#### Results
💪Now your app has something to render to!
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
  <div id="root"></div><script type="text/javascript" src="main.js"></script></body>
</html>
```


### Google Analytics & Google Optimize

The [recommended installation](https://support.google.com/optimize/answer/6262084?hl=en) of [Google Optimize](https://www.google.com/analytics/optimize/) alongside Google Analytics includes installing the snippet immediately after the `<meta charset` tag from the initial server-returned HTML. Loading this clientside using something like [React Helmet](https://github.com/nfl/react-helmet), unless using server side rendering, won't give us the benefits of giving an optimal loading experience when running A/B tests. To fix this, we can inject this snippet using a partial without having to create a custom HTML template file or trying to sloppily manage it in our app.

#### Set Up Your Config
Using a basic example of `webpack.config.js`:
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('../../');

module.exports = {
  entry: {
    main: path.join(__dirname, './main.js') // Not shown in thix example
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './partials/analytics.html'),
        priority: 'high',
        location: 'head'
      }
    ])
  ]
};
```
#### Set Up your Partial
Using example code from the [installation guide](https://support.google.com/optimize/answer/6262084?hl=en), set up `partials/analytics.html`:

```
<!-- Page-hiding snippet (recommended)  -->
<style>.async-hide { opacity: 0 !important} </style>
<script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
(a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
})(window,document.documentElement,'async-hide','dataLayer',4000,
{'GTM-XXXXXX':true});</script>

<!-- Modified Analytics tracking code with Optimize plugin -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXXX-X', 'auto');
ga('require', 'GTM-XXXXXX');
ga('send', 'pageview');
</script>
```

#### Results
🙆 now you're analytics code can be easily maintained and installed in the right spot!
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"><!-- Page-hiding snippet (recommended)  -->
<style>.async-hide { opacity: 0 !important} </style>
<script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
(a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
})(window,document.documentElement,'async-hide','dataLayer',4000,
{'GTM-XXXXXX':true});</script>

<!-- Modified Analytics tracking code with Optimize plugin -->
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXXX-X', 'auto');
ga('require', 'GTM-XXXXXX');
ga('send', 'pageview');
</script>
    <title>Webpack App</title>
  </head>
  <body>
  <script type="text/javascript" src="main.js"></script></body>
</html>
```

### Other Examples
See a few other working examples here: https://html-webpack-partials-plugin.netlify.app/

See the source for the examples here: https://github.com/colbyfayock/html-webpack-partials-plugin/tree/master/examples

## Notes

### Determining Injection Point
Given the location and priority passed into the configuration, the plugin determines where to inject. The location is simply the name of the tag to use, where the priority is how high or how low in the tag we inject. For almost all situations, a high priority will inject immediately after the opening tag and low will inject immediately before the closing tag.

The one exception to this, if the passed in tagname is `head` with a `high` priority, the plugin will inject immediately after `<meta charset="utf-8">`.

### Order of Injection
The order is determined simply by the order in which the partial is included in the configuration.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://colbyfayock.com/newsletter"><img src="https://avatars2.githubusercontent.com/u/1045274?v=4" width="100px;" alt=""/><br /><sub><b>Colby Fayock</b></sub></a><br /><a href="https://github.com/colbyfayock/html-webpack-partials-plugin/commits?author=colbyfayock" title="Code">💻</a> <a href="https://github.com/colbyfayock/html-webpack-partials-plugin/commits?author=colbyfayock" title="Documentation">📖</a></td>
    <td align="center"><a href="http://ssmith.dev"><img src="https://avatars2.githubusercontent.com/u/6590114?v=4" width="100px;" alt=""/><br /><sub><b>Steven Smith</b></sub></a><br /><a href="https://github.com/colbyfayock/html-webpack-partials-plugin/commits?author=ssmith353" title="Documentation">📖</a></td>
    <td align="center"><a href="https://twitter.com/avivshafir"><img src="https://avatars2.githubusercontent.com/u/6135443?v=4" width="100px;" alt=""/><br /><sub><b>Aviv Shafir</b></sub></a><br /><a href="https://github.com/colbyfayock/html-webpack-partials-plugin/commits?author=avivshafir" title="Code">💻</a></td>
    <td align="center"><a href="http://www.jimdoyle.com.au"><img src="https://avatars3.githubusercontent.com/u/1377237?v=4" width="100px;" alt=""/><br /><sub><b>Jim Doyle</b></sub></a><br /><a href="https://github.com/colbyfayock/html-webpack-partials-plugin/commits?author=superelement" title="Code">💻</a> <a href="https://github.com/colbyfayock/html-webpack-partials-plugin/commits?author=superelement" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://septs.blog"><img src="https://avatars0.githubusercontent.com/u/3842474?v=4" width="100px;" alt=""/><br /><sub><b>Septs</b></sub></a><br /><a href="https://github.com/colbyfayock/html-webpack-partials-plugin/commits?author=septs" title="Code">💻</a></td>
    <td align="center"><a href="https://zjffun.com"><img src="https://avatars2.githubusercontent.com/u/25266120?v=4" width="100px;" alt=""/><br /><sub><b>JuFeng Zhang</b></sub></a><br /><a href="https://github.com/colbyfayock/html-webpack-partials-plugin/commits?author=zjffun" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!