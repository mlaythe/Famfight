const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const app = express();
const PORT = process.env.PORT || 8080;
const DEVPORT = 9090;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(require('./protected-routes'));
app.use(require('./user-routes'));

app.listen(PORT, err => console.log('listening on http://localhost:' + PORT));

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true,
}).listen(DEVPORT, 'localhost', (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(`Webpack Dev Server started at ${DEVPORT}`);
});

module.exports = app;