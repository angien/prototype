var express = require('express');
var router = express.Router();

module.exports = router;

/* GET home page. */
router.get('/',
  function(req, res) {
    res.render('index', {});
  });

/* Get other apps */
router.get('/test1',
  function(req, res) {
    res.render('test1', {});
  });
