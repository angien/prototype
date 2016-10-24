var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = require('express')();
var http = require('http').Server(app);

// mongoose.connect("mongodb://localhost/", function(err, db) {  
//   if(!err) {
//       console.log("MongoDB is connected!");
//   }
//   else {
//     console.log(err);
//   }
// });

// serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// look for view html in the views directory
app.set('views', path.join(__dirname, 'public', 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

// setting up routes
app.use('/', require('./routes/index'));
app.use('/test1', require('./routes/test1'));

module.exports = app;

var port = process.env.PORT || 5000;
http.listen(port, function() {
  console.log('Listening on ' + port);
});
