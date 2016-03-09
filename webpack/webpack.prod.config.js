var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var isomorphicConfig = require('./webpack-isomorphic-tools-configuration');

var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig)
        .development(process.env.NODE_ENV !== 'production');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var babelConfig;

try {
  babelConfig = JSON.parse(fs.readFileSync(path.resolve('.babelrc')));
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}


// babelConfig.plugins.push(['oxygen-css', {
//   vendorPrefixes: true,
//   minify: true,
//   prefix: '',
//   compressClassNames: true,
//   bundleFile: 'static/styles/bundle.css',
//   context: 'src/oxygen-md/Styles/index.js',
//   mediaMap: {
//     phone: 'media only screen and (max-width: 767px)',
//     desktop: 'media only screen and (min-width: 768px)'
//   }
// }]);

require('babel-core/register')(babelConfig);
module.exports = {
  entry: [
    './src/client'
  ],
  resolve: {
    root: [
      path.resolve('src'), path.resolve('static')
    ],
    modulesDirectories: ['node_modules'],
  },
  output: {
    path: path.join(__dirname, '..'),
    filename: 'static/dist/bundle.[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('static/dist/main.[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      },
      __DEV__: JSON.stringify(false),
      __PROD__: JSON.stringify(true),
    }),
    webpackIsomorphicToolsPlugin
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /src/,
        loader: 'babel',
        query: babelConfig
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'file-loader?name=[path][name].[hash].[ext]'
      },
      {
        test: /\.css$/, // Only .css files
        // loader: 'style-loader!css-loader', // Run both loaders
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
    ]
  },
}
