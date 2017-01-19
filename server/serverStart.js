var express = require('express');
var bodyParser = require('body-parser');

var cats = require('./catsRoute');
var hobbies = require('./hobbiesRoute')

var app = express();
var port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/api/', cats);
app.use('/api/', hobbies);

app.listen(port);
console.log('start to listening ' + port);
