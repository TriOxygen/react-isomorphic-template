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
    store: PropTypes.object,
    theme: PropTypes.string
  };
          // <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600' rel='stylesheet' type='text/css' />
          // <link href='https://fonts.googleapis.com/css?family=Josefin+Sans:400,300,600' rel='stylesheet' type='text/css' />

  render() {
    const { assets, component, store, theme } = this.props;
    let styles;
    let styleAssets;
    let cleaner;
    if (process.env.NODE_ENV === 'development') {
      const css = [
        ['static', 'styles/normalize.css'],
        ['static', 'styles/bundle.css'],
        ['node_modules', 'oxygen-md-svg-icons/lib/bundle.css']
      ];
      const scripts = [];
      styles = css.map((cssFile, index) => {
        scripts.push('script_' + index);
        return <style type="text/css" id={'script_' + index} key={index} dangerouslySetInnerHTML={{ __html: fs.readFileSync(path.resolve(path.join(...cssFile))) }}/>;
      });
      cleaner = (
        <script dangerouslySetInnerHTML={{ __html: `
          setTimeout(() => {
            ${JSON.stringify(scripts)}.forEach(script => {
              document.getElementById(script).remove();
            });
          }, 1000);
        ` }}
        />
      );
    }
    styleAssets = Object.keys(assets.styles).map((style, i) => {
      return <link href={assets.styles[style]} key={i} media="screen, projection" rel="stylesheet" type="text/css"/>
    });
    const html =
    (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content={theme} />
          <link href='https://fonts.googleapis.com/css?family=Hind+Vadodara:400,600' rel='stylesheet' type='text/css' />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <title>Coursio</title>

          {/* favicon */}
          <link rel="shortcut icon" href={assets.assets['./static/images/favicon.png']} />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {styleAssets}
          {styles}
        </head>

        <body>

          {/* rendered React page */}
          <div id="app" dangerouslySetInnerHTML={{ __html: renderToString(component) }}/>

          {/* Flux store data will be reloaded into the store on the client */}
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(store)};` }} />

          {/* javascripts */}
          {/* (usually one for each "entry" in webpack configuration) */}
          {/* (for more informations on "entries" see https://github.com/petehunt/webpack-howto/) */}
          {Object.keys(assets.javascript).map((script, i) =>
            <script src={assets.javascript[script]} key={i}/>
          )}
          {cleaner}
        </body>
      </html>
    );

    return html;
  }
}