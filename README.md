# Partials for HTML Webpack Plugin

[![CircleCI Status](https://circleci.com/gh/colbyfayock/html-webpack-partials-plugin.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/colbyfayock/html-webpack-partials-plugin) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/colbyfayock/html-webpack-partials-plugin/blob/master/LICENSE)

Extends [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) to add support for partials or templates.

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
| priority  | String   | "low"   | "high" or "low" - determines if the partial gets added from the start of the location or end
| options   | Object   | {}      | Local variables to the given partial

The settings can either be passed in as a single object or an array of objects.

## Examples

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

### Results
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
See a few other working examples here: https://github.com/colbyfayock/html-webpack-partials-plugin/tree/master/examples

## Notes

### Determining Injection Point
Given the location and priority passed into the configuration, the plugin determines where to inject. The location is simply the name of the tag to use, where the priority is how high or how low in the tag we inject. For almost all situations, a high priority will inject immediately after the opening tag and low will inject immediately before the closing tag.

The one exception to this, if the passed in tagname is `head` with a `high` priority, the plugin will inject immediately after `<meta charset="utf-8">`.

### Order of Injection
The order is determined simply by the order in which the partial is included in the configuration.
