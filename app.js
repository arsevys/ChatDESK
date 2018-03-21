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
   console.log('listening 3000'); 
});


var object={
	"t":0
}

var agente=false;
  
  var p=[];
   var c=[];
app.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {

if(session.message.address.channelId=='skype'  &&  session.message.text == "Agente" ){
p.push(session);

}

if(session.message.address.channelId=='webchat'  &&  session.message.text == "Agente" ){
c.push(session);

}

    var msg = session.message;
    console.log(msg);
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
        // Echo back users text
      
        // if(session.message.text=="Agente"){
        // agente=true;
        // }
        // if(session.message.address.channelId=='webchat'){
        //  p[0].send(msg.text);return ;
        // }
        // if(session.message.address.channelId=='skype'){
        //  c[0].send(msg.text);return ;
        // }

    //     var t= { id: '1521481131693',
    //  channelId: 'skype',
    //  user:
    //   { id: '29:106S5L5hb2oGzyeTVcmDcraT5mNwUMYh2IADo9a0gGfT_2pGcQjXkaMmGaBxPPAmL' },
    //  conversation:
    //   { id: '29:106S5L5hb2oGzyeTVcmDcraT5mNwUMYh2IADo9a0gGfT_2pGcQjXkaMmGaBxPPAmL' },
    //  bot:
    //   { id: '28:2f5a81e5-2237-4e96-9f8b-0953aa5d1421',
    //     name: 'ChatDesk' },
    //  serviceUrl: 'https://smba.trafficmanager.net/apis/' };
    // bot.send(new builder.Message().address(t).text("ozuna"));

     session.send(md.DialogFlow(1545,msg.text));
    

    }
});

var agente= new MdpHandOff(bot);
var a=[];

bot.use(middleware.iniciar(agente),agente.enviar());