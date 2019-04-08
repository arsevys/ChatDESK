var RAD=require("./RouteActiveDirectory");//Router Active Directory - RAD
var conf={

}


class Enrutador {


static Inicio(req,res){

		console.log(JSON.stringify(req.body));
		let data=req.body.result;
		let tA=data.action.split("-");
		let tipoApp=tA[0];
		let action=tA[1];
		console.log(tipoApp);
switch(tipoApp){
	case "ActiveDirectory":RAD.Enrutador(action,data,res);break;

	case "Base":console.log("Action ");break;
}

var t ={"speech":"Probando desde el servidor","displayText":"Hola 1235959"};




}


}


module.exports=Enrutador;