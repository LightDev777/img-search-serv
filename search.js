var express = require('express');
var app = express();
var url = require('url');
var https = require('https');
var fs = require('fs');

exports.searchImage = function() {
  https.get('https://www.googleapis.com/customsearch/v1?searchType=image&cx=010810536276528531056:ez1-u7jgcfu&q=cats&key=AIzaSyDY91TCHBk0DqfsqzLM6qcszdh5lBw-0NY',
    (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        //console.log(JSON.parse(data));
        return data;
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
  });

};
