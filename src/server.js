import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import { Provider } from 'react-redux';
import fetchComponentData from 'lib/fetchComponentData';
import path from 'path';
import Html from 'containers/Html';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import chokidar from 'chokidar';
import AppWrapper from 'containers/AppWrapper';
import configureStore from 'reducers/configureStore';
import mongoose from 'mongoose';
import { NotFoundError } from 'Errors';
import Config from 'Config';
import session from 'express-session';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);
// import routes from 'routes';

 mongoose.Promise = global.Promise;

const app = express();

// this must be equal to your Webpack configuration "context" parameter
var projectBasePath = require('path').join(__dirname, '..');

if (process.env.NODE_ENV !== 'production') {
  require('../webpack/webpack.dev.config').default(app);
}

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.resolve(__dirname, '../static')));
}

mongoose.connect(Config.mongodb.url);

app.use(session({
    secret: 'Very secret stuffs',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    })
}));

/**
 * Removes a module from the cache
 */
require.uncache = function (moduleName) {
  const modulePath = path.resolve(__dirname, '../', moduleName);
  // Run over the cache looking for the files
  // loaded by the specified module name
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
  // require(modulePath);

};

// this global variable will be used later in express middleware
var webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools-configuration'))
  .development(process.env.NODE_ENV !== 'production')
  .server(projectBasePath, function() {

    function init () {

      var routes = require('./routes').default;

      const api = require('api').default;
      app.use('/api/v1', api(app) );

      app.use( function main(req, res, next) {
        const { session } = req;
        session.calls = session.calls || 0;
        session.calls++;
        console.log(session)
        const location = createLocation(req.url);

        const store = configureStore();
        // const routes = require('./routes');

        match({ routes, location }, async (err, redirectLocation, renderProps) => {
          if (process.env.NODE_ENV !== 'production') {
            webpackIsomorphicTools.refresh()
          }

          if(err) {
            return next(err);
            // return res.status(500).end('Internal server error');
          }

          if(!renderProps) {
            return next(new NotFoundError());
            // return res.status(404).end('Not found');
          }

          renderProps.radiumConfig ={ userAgent: req.headers['user-agent'] };
          function renderView() {
            const initialView = (
              <Provider store={store} >
                <AppWrapper radiumConfig={{ userAgent: req.headers['user-agent'] }}>
                  <RouterContext {...renderProps} />
                </AppWrapper>
              </Provider>
            );

            const initialState = store.getState();

            return '<!doctype html>\n' +
              renderToString(<Html assets={webpackIsomorphicTools.assets()} component={initialView} store={initialState}/>);
          }

          try {
            await fetchComponentData(store.dispatch, renderProps.components, renderProps.params);
            res.end(renderView());
          } catch (err) {
            res.end(err.message);
          }

        });
      });

      app.use(function errorHandler(error, req, res, next) {
        if (res.headersSent) {
          return next(error);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(500);
        if (error) {
          res.json({
            error
          });
        } else {
          res.json({
            error: {
              code: 'End of the road, man'
            }
          });
        }
      });
    }

    chokidar.watch('./src', {}).on('all', (event, pathToFile) => {
      const blacklistedRoutes = {
        urlencodedParser: true,
        jsonParser: true,
        main: true,
        router: true,
        apiHandler: true,
        notFoundHandler: true,
        errorHandler: true
      }
      if (event === 'change') {
        try {
          require.uncache(pathToFile);
          require.uncache('src/routes.js');
          require.uncache('src/containers/Html.js');
          require.uncache('src/containers/App.js');
          require.uncache('src/containers/Home.js');
          require.uncache('src/api/index.js');
          app._router.stack = app._router.stack.filter(route => {
            return !blacklistedRoutes[route.name];
          });
          init();
        } catch (e) {
          console.error(e);
        }
      }
    });
    init();


  });

export default app;
