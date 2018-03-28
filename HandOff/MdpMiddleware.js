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

	// console.log(session.message,774);


  if(session.message.address.channelId=='webchat'||session.message.address.channelId=='telegram'){
    
    MdpDBMesaDeAyuda.obtenerAddressCliente(session.message.address.conversation.id,function(validar,addressCliente){
      console.log(validar)

    if(validar){
      console.log("-----------Enviando mensajes por un agente-----------------")

     // console.log(JSON.parse(addresscliente),addressCliente)
       agente.enviarMensajeCliente(JSON.parse(addressCliente), session.message.text);
      
    


    }else {
      if(session.message.text == "Disponible"){
        // console.log(session.message.address.conversation,777777777777777777777777777)
        let x={id:session.message.address.conversation.id,
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



    })


  }

else {
           var msg=session.message.text;
              MdpHandOff.esAgente(session,function(r){

              if(r){

                console.log("-----------Entro en sesion de agente-----------------")
                // console.log(agente);
                MdpDBMesaDeAyuda.obtenerAddressHelpDesk(session.message.address.conversation.id,function(x,addr){
                  console.log(x,addr);
                  if(x){console.log("ocurrio un errorr al consultar el addres del Agente");return ;}
                 agente.enviarMensajeAgente(JSON.parse(addr),msg);
                })
                
       
                }
              else {
                    if(msg=="Agente"){
                       session.send("Conectando con Agente ...............");
                      MdpDBMesaDeAyuda.GetHelpDeskDisponible(function(exito,data){
                        console.log("***************---------------------********** \n\n\n");

                         console.log(data,"\n\n\n");

                         console.log("***************---------------------********** \n\n\n");
                        if(exito){
                         let id=session.message.address.conversation.id;
                         let addr=session.message.address; 

                         let obj={
                          id:id,
                          address:addr,
                          idhelp:data.idehelpdesk

                         }

                          //Buscar y hacer math con una mesa de ayuda conectado
                          MdpDBMesaDeAyuda.HacerMath(obj,(err)=>{
                       
                          session.send("Agente Conectado con exito");
                           } )

                        }
                        else {
                           session.send("Por el momento no se encuentra nadies disponible");
                        }

                      })
                    
                    }


                    else {

                     next();
                    }

                  }

              })
  }

}

 
