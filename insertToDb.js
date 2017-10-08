var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbUrl = process.env.PROD_MONGODB;// "mongodb://localhost:27017/mydb";

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
