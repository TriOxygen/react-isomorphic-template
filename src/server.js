import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import promiseMiddleware from 'lib/promiseMiddleware';
import fetchComponentData from 'lib/fetchComponentData';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import path from 'path';
import Html from 'containers/Html';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import api from 'api';
import chokidar from 'chokidar';
import AppWrapper from 'containers/AppWrapper';
// import routes from 'routes';

const app = express();

// this must be equal to your Webpack configuration "context" parameter
var projectBasePath = require('path').join(__dirname, '..');


if (process.env.NODE_ENV !== 'production') {
  require('../webpack/webpack.dev.config').default(app);
}

if (process.env.NODE_ENV === 'production') {
  console.log(path.resolve(__dirname, '../static'));
  app.use('/static', express.static(path.resolve(__dirname, '../static')));
}


app.use('/api', api(app));

/**
 * Removes a module from the cache
 */
require.uncache = function (moduleName) {
  const modulePath = path.resolve(__dirname, '../', moduleName);
  // Run over the cache looking for the files
  // loaded by the specified module name
  // require.searchCache(moduleName, function (mod) {
  //     delete require.cache[mod.id];
  // });
  if (require.cache[modulePath]) {
    require.cache[modulePath].children.forEach(child => {
      delete require.cache[child.id];
    });
    delete require.cache[modulePath];
  }

  // Remove cached paths to the module.
  // Thanks to @bentael for pointing this out.
  Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
      if (cacheKey.indexOf(modulePath)>=0) {
        delete module.constructor._pathCache[cacheKey];
      }
  });
};

// this global variable will be used later in express middleware
var webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
  .development(process.env.NODE_ENV !== 'production')
  .server(projectBasePath, function() {

    function init () {

      var routes = require('./routes').default;
      app.use( function main(req, res) {
        const location = createLocation(req.url);
        const reducer = combineReducers(reducers);
        const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

        // const routes = require('./routes');

        match({ routes, location }, (err, redirectLocation, renderProps) => {
          if (process.env.NODE_ENV !== 'production') {
            webpackIsomorphicTools.refresh()
          }

          if(err) {
            console.error(err);
            return res.status(500).end('Internal server error');
          }

          if(!renderProps)
            return res.status(404).end('Not found');

          renderProps.radiumConfig ={ userAgent: req.headers['user-agent'] };
          function renderView() {
            const initialView = (
              <Provider store={store} >
                <AppWrapper radiumConfig={{ userAgent: req.headers['user-agent'] }}>
                  <RoutingContext {...renderProps} />
                </AppWrapper>
              </Provider>
            );

            const initialState = store.getState();

            const HTML = '<!doctype html>\n' +
              renderToString(<Html assets={webpackIsomorphicTools.assets()} component={initialView} store={initialState}/>);

            return HTML;
          }

          // One-liner for current directory, ignores .dotfiles
          chokidar.watch('./src', {}).on('all', (event, pathToFile) => {
            if (event === 'change') {
              require.uncache(pathToFile);
              require.uncache('src/routes.js');
              require.uncache('src/containers/Html.js');
              app._router.stack = app._router.stack.filter(route => {
                return route.name !== 'main';
              });
              init();
            }
          });


          fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
            .then(renderView)
            .then(html => res.end(html))
            .catch(err => res.end(err.message));
        });
      });
    }
    init();
  });

export default app;
