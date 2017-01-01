const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const webpackConfig = require('../webpack.config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const DEVPORT = 9090;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

if (process.env.NODE_ENV === 'test') {
  app.use(logger('dev'));
}

app.get('/*', (req,res) => {
  res.sendfile(path.join(__dirname, 'index.html'))
});

app.use(require('./routes/userRoutes'));
app.use(require('./routes/familyRoutes'));

app.listen(PORT, (err) => console.log('listening on http://localhost:' + PORT));

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
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
