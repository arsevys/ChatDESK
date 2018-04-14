var express = require('express');
var builder = require('botbuilder');
var azure =require("botbuilder-azure");
var bodyParser=require("body-parser");
var expressMidleware=require("./enrutador/ExpressMiddleware");
var middleware=require("./HandOff/MdpMiddleware")
var MdpHandOff=require("./HandOff/MdpHandOff")
// var md=require("./enrutador/DialogFlow")
var watson=require("./enrutador/WatsonAssistant");
var FBGraph=require("./enrutador/FbGraphApi")
var connector = new builder.ChatConnector({
    appId: 'a0b21d95-ed6d-4870-aee0-364dc70d5a60',
    appPassword: 'eooyFRFB70^wxcDZH775|[%'
});


var app = express();
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(function(req,res,next){


//  console.log(JSON.stringify(req.body),778);


// //es facebook Workplace
//  if(req.body.entry){
//   console.log(req.body.entry[0].messaging[0].message.text);
//    if(req.body.entry[0].messaging[0].message.text=="Agente"){
//     console.log("Entro de agente");


//    }
//    else{

//    }
//  }
//  next();
// })





app.listen(process.env.port || process.env.PORT || 3000, function () {

   console.log('ejecutando 3000'); 

});


var object={
	"t":0
}

var agente=false;
  
  var p=[];
   var c=[];
app.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {


    var msg = session.message;
    // console.log(msg);
    if (msg.attachments && msg.attachments.length > 0) {
     // Echo back attachment
     var attachment = msg.attachments[0];

        session.send({
            text: "You sent:",
            attachments: [
                {
                    contentType: attachment.contentType,
                    contentUrl: attachment.contentUrl,
                    name: attachment.name
                }
            ]
        });

    } else {


          // bot.send(new builder.Message().address(t).text("ozuna"));

          console.log(msg.address.conversation.id);
          let aidi=msg.address.conversation.id;
    
       watson.getContext(aidi,function(z){
      

        if(z.length==0){
          FBGraph.getData(msg.address.user.id,function(data){
              console.log(data,78);
             
            watson.mensaje(aidi,msg.text,data,true,function(x){
               session.send(x); 
            })
          })
          
        }else {
           watson.mensaje(aidi,msg.text,JSON.parse(z[0].sesiones),false,function(x){
               session.send(x); 
            })
        }
          
       });   
         

     
    

    }
}).set('storage', new builder.MemoryBotStorage());

app.post("/des",function(req,res){




     res.json({
        "speech":"Probando AD",
        "displayText":"Si me voy si no estas",
        "followupEvent":{
            name:"PruebaDemo",
            data:{"usuario":"12345",
                  "pass":"admin",
                   "nombre":"Andy Robers Javier Reyes"},
            source:"Prueba"
        }
      })    
})


app.post("/conectarAgente",function(req,res){
  console.log(req.body);
})



app.get("/conectCliente",(req,res)=>{

  console.log(req);
 if (req.query['hub.mode']  &&
      req.query['hub.verify_token'] === "MDP2018") {
        console.log("Enlazado con facebook");
        res.status(200).send(req.query['hub.challenge']);
  } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);          
         }  
})



app.post("/conectCliente",(req,res)=>{
 console.log(req.body,78542);
})

var agente= new MdpHandOff(bot);
var a=[];

bot.use(middleware.iniciar(agente),agente.enviar());