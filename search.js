var express = require('express');
var app = express();
var url = require('url');
var https = require('https');
var fs = require('fs');
var key = process.env.GOOGLE_KEY;
// function to search images based on keyword
module.exports = function(key, count, callback) {
  https.get('https://www.googleapis.com/customsearch/v1?searchType=image&cx=010810536276528531056:ez1-u7jgcfu&q=' + key + '&key=AIzaSyDY91TCHBk0DqfsqzLM6qcszdh5lBw-0NY&start=' + count,
    (res) => {
      var data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        //var json = JSON.parse(data);
        return callback(null, data);

      });
      res.on("error", (err) => {
        console.log("Error: " + err.message);
        return callback(err);
      });

    });
};
