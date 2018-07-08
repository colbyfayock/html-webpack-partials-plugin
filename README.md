# Partials for HTML Webpack Plugin

[![CircleCI Status](https://circleci.com/gh/colbyfayock/html-webpack-partials-plugin.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/colbyfayock/html-webpack-partials-plugin) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/colbyfayock/html-webpack-partials-plugin/blob/master/LICENSE)

Extends [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) to add support for partials or templates.

## Installation

Not yet published to npm, install via Github for for now:
```
npm add https://github.com/colbyfayock/html-webpack-partials-plugin --save-dev
```
or
```
yarn add https://github.com/colbyfayock/html-webpack-partials-plugin -D
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

## Notes

### Determining Injection Point
Given the location and priority passed into the configuration, the plugin determines where to inject. The location is simply the name of the tag to use, where the priority is how high or how low in the tag we inject. For almost all situations, a high priority will inject immediately after the opening tag and low will inject immediately before the closing tag. 

The one exception to this, if the passed in tagname is `head` with a `high` priority, the plugin will inject immediately after `<meta charset="utf-8">`.

### Order of Injection
The order is determined simply by the order in which the partial is included in the configuration.
