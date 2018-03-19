
var sessiones ={};
var math={}
class  MdpDBMesaDeAyuda {

static guardar(x){

sessiones[x.id]=x.address;
console.log("-------Guardando sessiones---------");
}
static obtener(x){
	let ide=x.message.address.conversation.id;
return sessiones[ide];
}


static HacerMath(x){
	math[x.idMesa]=x.addressCliente;
}
static obtenerAddressCliente(x){
	return math[x]
}
}

module.exports=MdpDBMesaDeAyuda;