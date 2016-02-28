var fs = require('fs');

var babelConfig;

try {
  babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-core/register')(babelConfig);
require('babel-polyfill');
process.env.SERVER = true;

// webpack-isomorphic-tools is all set now.
// here goes all your web application code:
var server = require('server').default;

const PORT = process.env.PORT || 3001;

server.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});
