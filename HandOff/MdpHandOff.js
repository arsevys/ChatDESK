var agente ={ id: '548zaKW7d2JATv4yqNFK2N|0000002',
     channelId: 'webchat',
     user: { id: 'userid' },
     conversation: { id: '548zaKW7d2JATv4yqNFK2N' },
     bot: { id: 'ChatDesk@kV6SgLV4YXc', name: 'ChatDesk' },
     serviceUrl: 'https://directline.botframework.com/' }


     

var builder = require('botbuilder');
var MdpDBMesaDeAyuda=require("./MdpDBMesaDeAyuda");



class MdpHandOff {

constructor(bot){
  this.bot=bot;
}


 enviar(){
 	var self=this;
   return {
   send: function (data, next) {
     if(data.address.channelId=='webchat'){
     	next();
     	return;
     }
   	console.log("------------Entrooo sendd--------------")
        console.log("Enviar : ",data)
        if(self.esAgente(data)){
        	console.log("---------Entro Agente----------")
          self.enviarMensajeAgente("coldplay")
        }
        else{
        	 next();
        }

      
    }

  };
      }

 enviarMensajeAgente(addr,x){
console.log("************".addr)
this.bot.send(new builder.Message().address(addr).text(x));

}

enviarMensajeCliente(addressCliente,x){

this.bot.send(new builder.Message().address(addressCliente).text(x));

}




static esAgente(session,callback){
     
		var valida=MdpDBMesaDeAyuda.obtener(session,(data)=>{
    if(data.length>0){
      return  callback(true);
    }
    else {
      return callback(false);
    }
    });
		console.log(valida);

		

}


}



module.exports=MdpHandOff;

