const logger     = require('morgan'),
      cors       = require('cors'),
      express    = require('express'),
      dotenv     = require('dotenv'),
      bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

dotenv.load();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(require('./protected-routes'));
app.use(require('./user-routes'));

app.listen(port, err => {
  if (err) throw new Error(err);

  console.log('listening in http://localhost:' + port);
});
