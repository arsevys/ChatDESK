var twilio=require('twilio')('AC79b798281a40e6e1f3d63c5c3dee5e1c','65132b8905c9c5817ab625c1d791a486');


class FullfillmentWatson {

//el callback va a devolver solamente el mennsaje
static tester(session,id ,context,mensaje,callback){

   if(context["Asms"] == "si"){
   	// enviarSMS(context,session);
   	context["Asms"]="no";
    context["smsCodigo"]="An20";
    return callback(mensaje,context);
   }


   if(context["Action-Fullfillment"]=="si"){
    context["Action-Fullfillment"]="no";
    setTimeout(function(){
    	 changePassword(context,session);
    },1000)
     
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

function changePassword(context,session){

	// request({
	// 	url:"",👍
	// 	type:""
	// },(error,body)=>{
     
	// })
twilio.messages.create({
to: "+51928817856",
from:'+19018783898',
body:'Hola "'+context["first_name"]+'" tu nueva contraseña es  admin'

},(err,message)=>{
if(err){console.log("error al enviar sms",error)}
else {
	// watson.ibmcitripio(usuario,"codigosuccestoken",context)
  session.send(`Ya esta! 👍
   Tu clave fue enviada por SMS. 
   Recuerda cambiarla en tu primer login .`);

    session.send(`Espero haberte ayudado mi atención , por favor califica mi atencion : ⭐⭐⭐⭐⭐`);
}

});

  console.log("Respuesta Cambiado")	;

}