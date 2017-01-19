//[{"id":1,"name":"eating"},{"id":2,"name":"playing"}]

var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/hobbies', function(req, res, next) {
    var data = [{id:1,name:"eating"},{id:2,name:"playing"}]
    res.json(data);      
});

module.exports = router;
