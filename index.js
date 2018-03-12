const express=require("express");
var bodyParser=require("body-parser");
const webhookclient=require("dialogflow-fulfillment");

var Enrutador=require("./Enrutador/Enrutador");
var app=express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",Enrutador.Inicio)

app.get("/",function(req,res){
console.log(req.body);
var t ={"speech":"Hello, Wemnt!","displayText":"Hello, Wemnt!"};

})

app.listen("3000",function(){
	console.log("El servidor se ejecuta en el puerto 3000");
});