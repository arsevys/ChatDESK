var express = require('express');
var builder = require('botbuilder');

var connector = new builder.ChatConnector({
    appId: '2f5a81e5-2237-4e96-9f8b-0953aa5d1421',
    appPassword: 'redzcoHG9(:qGABGL0262=#'
});


var app = express();
app.use('/public', express.static('public'));

app.listen(process.env.port || process.env.PORT || 3000, function () {
   console.log('%s listening to %s 3000'); 
});



  

app.post('/', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
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
        session.send("You said: %s", session.message.text);
    }
});