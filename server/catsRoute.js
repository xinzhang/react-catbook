var express = require('express');
var fs = require('fs');
var router = express.Router();

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}

router.get('/cats', function(req, res, next) {
    readJSONFile('cats.json', function (err, data) {
    if(err) { throw err; }
    res.json(data);
    res.end
  });
});

router.put('/cats/:id', function(req, res, next) {
    res.json(req.cat);
  });


router.post('/cats', function(req, res, next) {
    res.json(req.cat);
  });


module.exports = router;
