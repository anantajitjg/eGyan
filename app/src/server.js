var express = require('express');
var app = express();


app.get('/', function (req, res) {
    res.send("Welcome to eGyan");
});

app.listen(8080, function () {
  console.log('egyan app listening on port 8080!');
});
