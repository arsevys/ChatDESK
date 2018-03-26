var express = require('express');
var builder = require('botbuilder');
var azure =require("botbuilder-azure");
var middleware=require("./HandOff/MdpMiddleware")
var MdpHandOff=require("./HandOff/MdpHandOff")
var md=require("./enrutador/DialogFlow")
var connector = new builder.ChatConnector({
    appId: 'a0b21d95-ed6d-4870-aee0-364dc70d5a60',
    appPassword: 'eooyFRFB70^wxcDZH775|[%'
});


var app = express();
app.use('/public', express.static('public'));

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

    
            md.DialogFlow(msg.address.conversation.id.substr(0,8),msg.text,function(x){
               session.send(x); 
            })

     
    

    }
});

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
})


var agente= new MdpHandOff(bot);
var a=[];

bot.use(middleware.iniciar(agente),agente.enviar());