

class ActiveDirectory {

static ViewPassword(x,res){
  console.log("Tu Comtraseña es 13456875");
  res.json({
  	"speech":"Probando AD",
  	"displayText":"Si me voy si no estas",
  	"followupEvent":{
  		name:"PruebaDemo",
  		data:{"usuario":"12345",
  	          "pass":"admin",
  	           "nombre":"Andy Robers Javier Reyes"},
  		source:"Prueba"
  	}
  })
}



static ChangePassword(x,res){

res.json({
	 	"speech":"Probando AD",
  	"displayText":"Si me voy si no estas",
  	"followupEvent":{
  		name:"changePass",
  		data:{"usuario":"Andy",
  	          "pass":"nuevoadmin"},
  		source:"Prueba"
  	}
});
}
}

module.exports=ActiveDirectory;