var MdpHandOff=require("./MdpHandOff");
var MdpDBMesaDeAyuda=require("./MdpDBMesaDeAyuda");
class MdpMiddleware {

  static iniciar(agente){
  	return {
        botbuilder: function (session, next) {
            if (session.message.type === 'message') {
                comandos(session,next,agente);
            }
        }
    };
  }






}

module.exports=MdpMiddleware;


function comandos(session,next,agente){

	console.log(session);


  if(session.message.address.channelId=='webchat'){
    
    if(MdpDBMesaDeAyuda.obtenerAddressCliente(session.message.address.conversation.id)){
       agente.enviarMensajeCliente(MdpDBMesaDeAyuda.obtenerAddressCliente(session.message.address.conversation.id),session.message.text)
      
    }else {
      session.send("USted no esta conectado con un agente")

    }

  return;
  }



var msg=session.message.text;
if(MdpHandOff.esAgente(session)){

console.log("-----------Entro en sesion de agente-----------------")
console.log(agente);
agente.enviarMensajeAgente(msg);

}
else {
if(msg=="Agente"){
  MdpDBMesaDeAyuda.guardar({id:session.message.address.conversation.id , address:session.message.address  });
  //Buscar y hacer math con una mesa de ayuda conectado
  MdpDBMesaDeAyuda.HacerMath({ idMesa: '548zaKW7d2JATv4yqNFK2N' ,  addressCliente:session.message.address })
  session.send("En breves momentos te conectaras con un Agente y le enviara un mensaje");

}
else {

 next();
}
}

 
}