import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import isomorphicConfig from './webpack-isomorphic-tools-configuration';
import fs from 'fs';
import path from 'path';
import WebpackErrorNotificationPlugin from 'webpack-error-notification';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig)
        .development(process.env.NODE_ENV !== 'production');

let babelConfig;

try {
  babelConfig = JSON.parse(fs.readFileSync(path.resolve('.babelrc')));
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

babelConfig.plugins.push(['react-transform', {
  transforms: [
    {
      transform: 'react-transform-hmr',
      imports: ['react'],
      locals: ['module']
    }
  ]
}]);

// babelConfig.plugins.push(['oxygen-css', {
//   vendorPrefixes: true,
//   minify: false,
//   prefix: '',
//   compressClassNames: true,
//   bundleFile: 'static/styles/bundle.css',
//   context: 'src/oxygen-md/Styles/index.js',
//   mediaMap: {
//     phone: 'media only screen and (max-width: 767px)',
//     desktop: 'media only screen and (min-width: 768px)'
//   }
// }]);


const config = {
  cache: true,
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client',
  ],
  resolve: {
    root: [
      path.resolve('src'), path.resolve('static')
    ],
    modulesDirectories: ['node_modules'],
  },
  output: {
    path: path.join(__dirname, '..', 'static'),
    filename: 'dist/bundle.[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackErrorNotificationPlugin(),
    // new ExtractTextPlugin('static/dist/main.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      },
      __DEV__: JSON.stringify(true),
      __PROD__: JSON.stringify(false),
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
        loader: 'file-loader?name=[path][name].[ext]?[hash]'
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style-loader!css-loader?name=[path][name].[hash].[ext]', // Run both loaders
      },
    ]
  },
}


export default function (app) {

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));

  return compiler;
}