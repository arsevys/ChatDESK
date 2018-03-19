var apiai=require("apiai");






function DialogFlow(id,mensaje){
console.log("***************************************************************");
console.log(id,mensaje);
var dialog=apiai("5cf626273b774fa6b0ec6c898c77010c9");
var requestr=dialog.textRequest(mensaje,{
	sessionId:"123456"
});


requestr.on('response', function(response) {
    console.log(response);
});
 
requestr.on('error', function(error) {
    console.log(error);
});



return "En que te puedo ayudar";
}

exports.DialogFlow=DialogFlow;