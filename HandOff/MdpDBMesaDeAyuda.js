
var sessiones ={};
var math={};

var pg=require("pg");
const config={
"host":"localhost",
	"user":"postgres",
	"database":"chatdesk",
	"port":"5432",
	"password":"javier"
}
var pool=new pg.Pool(config)
class  MdpDBMesaDeAyuda {


//guardamos el address del cliente
static guardar(x){

 pool.connect((err,client,done)=>{
  
	  if(err){
	  	return console.log(err)
	  }
			let query=`insert into clientes (ideclient,address)
			values($1,$2)`;

			client.query(query,[x.id,JSON.stringify(x.address)],function(error,data){
			if(error){
			  	return console.log(error)
			  }

			done();
			})
 })
}

//obtenemos el addres del cliente por parte del agente ingresando el id de conversacion
static obtener(x ,callback){
 let ide=x.message.address.conversation.id;
 pool.connect((err,client,done)=>{
		  
		  if(err){
		  	return console.log(err)
		  }

   let query=`select * from clientes where ideclient=$1`;

    client.query(query,[ide],function(error,data){
		if(error){
		  	return console.log(error)
		  }

		done();
		callback(data.rows)
		return ;
	})
		  
			
 })
}


//conectar con los tipos de mesa de ayuda que estan conectados
static insertMesadeAyuda(x,callback){
   pool.connect((err,client,done)=>{
		  
		  if(err){
		  	return console.log(err)
		  }

   let query=`insert into helpdesk(idehelpdesk,address,estado)
   values($1,$2,$3)`;

    client.query(query,[x.id,x.address,"0"],function(error,data){
		if(error){
		  	return console.log(error)
		  }
     
		done();
	  callback()	
	})
		  
			
 })
}


//insertamos y conectamos las conversaciones de un cliente con un agente
static HacerMath(x,callback){


 pool.connect((err,client,done)=>{	
	if(err){
  	return console.log(err)
  }

  var query=`select * from helpdesk
           where estado='0' 
           order by id limit 1`;

  client.query(query,param,function(error,data){
    if(error){
  	return console.log(error)
     }
     if(data.rows.length==0){ callback(true); done(); return;}
			let query1=`insert into isMath 
			values($1,$2,$3)`;
			var param=[data.rows[0].idhelpdesk,x.conversation.id,x]
    client.query(query1,param,function(error,data){
		    if(error){
		  	return console.log(error)
		     }
         callback(false);
		  done();

		   }) 
 })
 })
}


static obtenerAddressCliente(x){
	return math[x]
}
}

module.exports=MdpDBMesaDeAyuda;