

class MdpHandOff {

  static MdpMiddleware(){
  	return {
        botbuilder: function (session, next) {
            if (session.message.type === 'message') {
                comandos(session,next);
            }
        }
    };
  }






}

module.exports=MdpHandOff;


function comandos(session,next){

	console.log(session);
}