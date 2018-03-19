var express = require('express');
var bodyParser=require("body-parser");



var app = express();
app.use('/public', express.static('public'));





app.post('/', function(req,res){
   res.send("Probando");
});



app.listen(process.env.port || process.env.PORT || 3100, function () {
   console.log('%s listening to %s 3100'); 
});

