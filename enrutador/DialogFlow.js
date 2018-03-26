


const dialogflow = require('dialogflow');
const projectId = {
  "type": "service_account",
  "project_id": "chatdesk-d2d97"
 
}
var apiai=require("apiai");
var dialog=apiai("5cf626273b774fa6b0ec6c898c77010c");

const sessionId = 'quickstartsession-id';


function DialogFlow(id,mensaje,callback){

console.log("***************************************************************");
//  const sessionClient = new dialogflow.SessionsClient();

//  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
// // The text query request.
// const request = {
//   session: sessionPath,
//   queryInput: {
//     text: {
//       text: mensaje,
//       languageCode: 'es',
//     },
//   },
// };
 
// // Send request and log result
// sessionClient.detectIntent(request)
//   .then(responses => {
//     console.log('Detected intent',responses);
//     const result = responses[0].queryResult;
//     console.log(`  Query: ${result.queryText}`);
//     console.log(`  Response: ${result.fulfillmentText}`);
//     if (result.intent) {
//       console.log(`  Intent: ${result.intent.displayName}`);
//     } else {
//       console.log(`  No intent matched.`);
//     }
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });





var requestr=dialog.textRequest(mensaje,{
	sessionId:"147"
});


requestr.on('response', function(response) {
    console.log(response.result.fulfillment,"#######################");
   let  res=response.result.fulfillment.messages;
   return callback(res[0].speech)
});
 
requestr.on('error', function(error) {
    console.log(error);
});

requestr.end();

return "En que te puedo ayudar";
}

exports.DialogFlow=DialogFlow;