
var bd =require("./../HandOff/Sessiones");
var AssistantV1 = require('watson-developer-cloud/assistant/v1');
var FullFillment=require("./FulfillmentWatson")
var wID="661ed2e9-5f9d-4794-af72-08c65d09a3ef";
var conf ={
	  "username": "b649ff55-8e14-4566-a49c-62897ef33e08",
      "password": "0QThuFVx4umg",
      "url": 'https://gateway.watsonplatform.net/assistant/api/',
      "version": '2018-02-16'
};
class WatsonAssistant {

static mensaje(session,id,x,context,nuevo,callback){
    var assistant = new AssistantV1(conf);
console.log(x,context,nuevo)
    let mensajes={
    	input:{text:x},
    	workspace_id:wID,
    	context:context
    }
    assistant.message(mensajes,function(err,response){
    	if(err){console.log(err);}
    	else {
    		console.log(response);

    		if(nuevo){
    			bd.registrar(id,response.context,()=>{
    				callback(response.output.text)
    			})
    			return ;
    		}
    			else{
    				
    				FullFillment.tester(session,id,response.context,response.context.text,(text,context)=>{
    					bd.actualisar(id,context,()=>{
    					callback(text)
    					})
    				})
    				
    			
    			}
    		
    	}

    })

}

static getContext(x,callback){
   
   bd.buscar(x,(err,data)=>{
   	console.log("*************",err)
     if(err){console.log(err);return;}

    return callback(data);
   })


}




}


module.exports=WatsonAssistant;