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
      if(session.message.text == "Disponible"){
        let x={id:session.message.conversation.id,
               address:session.message.address
               };
           MdpDBMesaDeAyuda.insertMesadeAyuda(x,()=>{
             session.send("Usted esta disponible para recibir mensajes de clientes")
           });
        return;
      }
      session.send("USted no esta conectado con un agente")

    }

  return;
  }



var msg=session.message.text;
    MdpHandOff.esAgente(session,function(r){

    if(r){

      console.log("-----------Entro en sesion de agente-----------------")
      console.log(agente);
      agente.enviarMensajeAgente(msg);

      }
    else {
          if(msg=="Agente"){
            MdpDBMesaDeAyuda.guardar({id:session.message.address.conversation.id , address:session.message.address  });
            session.send("Conectanco con Agente ...............");
            //Buscar y hacer math con una mesa de ayuda conectado
            MdpDBMesaDeAyuda.HacerMath(session.message.address,(err)=>{
               if(err){
                session.send("Por el momento no se encuentra nadies disponible");
                return;
               }
                session.send("Agente Conectado con exito");
            } )
          }


          else {

           next();
          }

        }

    })

}

 
