var express = require('express');
var app = express();
var url = require('url');
var https = require('https');
var fs = require('fs');
var search = require('./search');

var baseHost = "localhost"; //"https://short-url-serv.herokuapp.com";


app.get('/search', function(req, res) {



  console.log();
  res.send(search.searchImage());
  res.end();
}).listen(5000);
