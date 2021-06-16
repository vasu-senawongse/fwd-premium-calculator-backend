var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const morganBody = require('morgan-body');
const mongoose = require('mongoose');
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
require('./routes/routes')(app);

fs.mkdirSync(path.join(__dirname, 'logs'), { recursive: true });
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
);
mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

morganBody(app, {
  noColors: true,
  prettify: false,
  stream: accessLogStream,
  dateTimeFormat: 'iso',
  includeNewLine: true,
});
app.listen(process.env.APP_API_PORT, () =>
  console.log('server run listening on port ' + process.env.APP_API_PORT)
);
module.exports = app;
