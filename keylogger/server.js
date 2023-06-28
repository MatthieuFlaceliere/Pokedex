const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var fs = require('fs');
const app = express();

app.use(cors())

// Body parser 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) // Encode body to json

app.post('/', function (req, res) {
  fs.appendFile('log.txt', req.body['key'], function (err) {
    if (err) throw err;
  });
  res.send();
});

app.listen(process.env.PORT || 8080);