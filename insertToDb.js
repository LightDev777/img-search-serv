var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbUrl = "mongodb://localhost:27017/mydb"; //process.env.PROD_MONGODB;
var baseHost = "https://img-search-serv.herokuapp.com";

//insert to database the term searched
module.exports = function(term, time) {
  var dataJson = {
    "term": term,
    "when": time
  };

  MongoClient.connect(dbUrl, function(err, db) {
    if(err) throw err;
    db.collection("recents").insertOne(dataJson, function(err, res) {
        if (err) throw err;
        console.log(res);
        db.close();
      });
  });
}
