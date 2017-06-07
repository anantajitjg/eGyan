var express = require('express');
var app = express();
var path = require('path');


app.get('/',function(req,res){
   res.sendFile(path.join(__dirname, 'public', "index.html"));
});

//loading static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, function () {
  console.log('egyan app listening on port 8080!');
});
