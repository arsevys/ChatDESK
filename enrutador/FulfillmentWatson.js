var twilio=require('twilio')('AC79b798281a40e6e1f3d63c5c3dee5e1c','65132b8905c9c5817ab625c1d791a486');
class FullfillmentWatson {

//el callback va a devolver solamente el mennsaje
static tester(session,id ,context,mensaje,callback){

   if(context["Asms"] == "si"){
   	enviarSMS(context,session);
   	context["Asms"]="no";

    return callback(mensaje,context);
   }

   return callback(mensaje,context);

}


}

function enviarSMS(context,session){


twilio.messages.create({
to: "+51928817856",
from:'+19018783898',
body:'Hola "'+context["first_name"]+'" este es el codigo de seguridad : Y145'

},(err,message)=>{
if(err){console.log("error al enviar sms",error)}
else {
	// watson.ibmcitripio(usuario,"codigosuccestoken",context)
	session.send("Por favor Ingresa el codigo Recibido (expira en  5 minutos)");
}

});





}

module.exports=FullfillmentWatson;