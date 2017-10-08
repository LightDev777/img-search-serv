var express = require('express');
var app = express();
var url = require('url');
var https = require('https');
var fs = require('fs');
var search = require('./search');
var insertToDb = require('./insertToDb');
var queryRecent = require('./queryRecent');


var image = function(url, title, snippet, thumb) {
  this.url = url;
  this.title = title;
  this.snippet = snippet;
  this.thumb = thumb;
};

var latestTerm = function(term, when) {
  this.term = term;
  this.when = when;
};

//function to search for images
app.get('/search/*', function(req, res) {
    var q = url.parse(req.url, true),
        strSplit = q.path.split('/'),
        querySplit = strSplit[2].indexOf('&') > -1 ? strSplit[2].split('&') : [strSplit[2], 'offset=1'],
        offset = querySplit[1].split('='),
        count = offset[1] > 1 ? ((offset[1] * 10) - 10) + 1: 1,
        keyword = querySplit[0],
        d = new Date();

        console.log(querySplit);

    var fullDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();


  search(keyword, count, printData);
  insertToDb(keyword, fullDate);

  function printData(err, data) {
    if(err) throw err;
    var json = JSON.parse(data);
    var arrayObj = [];


    for(var obj of json.items) {
        var img = new image(obj.link, obj.title, obj.snippet, obj.image.thumbnailLink);
        arrayObj.push(img);
    }

    //console.log(arrayObj);

    res.writeHead(200, {'Content-Type': 'text/html'});
    for(var i = 0; i < arrayObj.length; i++) {
        res.write('<pre><code>' + JSON.stringify(arrayObj[i], null, 2) + '</code></pre>');
    }

    return res.end();
  }

});

//function to show latest terms searched
app.get('/latest/search', function(req, res) {
  queryRecent(printRecent);
  function printRecent(err, data) {
    if(err) throw err;
    //console.log(typeof data);
    var arrayLatest = [];
    for(var i = 0; i < data.length; i++) {
      var o = new latestTerm(data[i].term, data[i].when);
      arrayLatest.push(o);
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h2>Most recent searches.</h2>');
    res.write('<pre><code>' + JSON.stringify(arrayLatest, null, 2) + '</code></pre>');
    res.end();
  }

});

app.get('/index', function(req, res) {
  // if path is on home and no other  string then load the details.html
    fs.readFile("./details.html", function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
});

app.listen(process.env.PORT || 5000);
