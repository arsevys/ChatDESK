var express = require('express');
var builder = require('botbuilder');

var connector = new builder.ChatConnector({
    appId: 'f29726ef-ab8b-4d4a-9dfa-6488db721fc3',
    appPassword: 'aybeLUPZ9![!^crkPRD7684'
});



app.use('/public', express.static('public'));

app.listen(process.env.port || process.env.PORT || 3000, function () {
   console.log('%s listening to %s', app.name, app.url); 
});





app.post('/api/messages', connector.listen());