import { renderToString } from 'react-dom/server';
import React, { Component, PropTypes } from 'react';
import fs from 'fs';
import path from 'path';

export default class Html extends Component
{
  static propTypes =
  {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  };

  render() {
    const { assets, component, store } = this.props;
    let styles;
    if (process.env.NODE_ENV === 'development') {
      const css = [
        ['static', 'styles/normalize.css'],
        ['static', 'styles/bundle.css'],
        ['node_modules', 'oxygen-md-svg-icons/lib/bundle.css']
      ];

      styles = css.map((cssFile, index) => {
        return <style type="text/css" key={index} dangerouslySetInnerHTML={{ __html: fs.readFileSync(path.resolve(path.join(...cssFile))) }}/>;
      });
    }
    const html =
    (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          <title>Oz - Todo</title>

          {/* favicon */}
          <link rel="shortcut icon" href={assets.assets['./static/images/favicon.png']} />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>)}

          {styles}
        </head>

        <body>

          {/* rendered React page */}
          <div id="react-view" dangerouslySetInnerHTML={{ __html: renderToString(component) }}/>

          {/* Flux store data will be reloaded into the store on the client */}
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(store)};` }} />

          {/* javascripts */}
          {/* (usually one for each "entry" in webpack configuration) */}
          {/* (for more informations on "entries" see https://github.com/petehunt/webpack-howto/) */}
          {Object.keys(assets.javascript).map((script, i) =>
            <script src={assets.javascript[script]} key={i}/>
          )}
        </body>
      </html>
    );

    return html;
  }
}