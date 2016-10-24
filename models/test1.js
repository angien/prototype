var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Test1 = new Schema({
    test1String : {type: String, default: "test1"}
}, {collection:"test1"});

module.exports = mongoose.model('test1', Test1);