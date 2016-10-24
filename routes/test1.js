var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use( bodyParser.json() ); 

var voice = require('../models/test1')

router.get('/get',
  function(req, res) {
    var message = "Successfully did a GET request.";
    console.log(message);
    res.send(message);
  });

router.post('/post/:message',
  function(req, res) {
    console.log("Message was sent via POST: " + req.params.message);
  });


module.exports = router;

