
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
		console.log(data.rows,786854444444444444444);
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

  var query=`insert into clientes (ideclient,address)
			values($1,$2)`;

  client.query(query,[x.id,x.address],function(error,data){
    if(error){
    	done();
  	return console.log(error)
     }
  
			let query1=`insert into ismath 
			values($1,$2,$3)`;
			var param=[x.idhelp,x.id,x.address]
    client.query(query1,param,function(error,data){
		    if(error){
		  	return console.log(error);
		     }
         callback(false);
		  done();

		   }) 
 })
 })
}

//Buscamos un chat de mesa ayuda disponible 
static GetHelpDeskDisponible(callback){


		 pool.connect((err,client,done)=>{	
			if(err){
		  	return console.log(err)
		                   }

		  var query=`select * from helpdesk
		           where estado='0' 
		           order by id limit 1`;

		  client.query(query,[],function(error,data){
		    if(error){
		  	return console.log(error)
		     }
		     done();

		       if(data.rows.lengt==0){
		       	return  callback(false,null);
		       }
		       else {
		       	return callback(true,data.rows[0]);
		       }
		        
				  
				   }) 
		 })

}



//Obtenemos el address del math que se realizo
static obtenerAddressCliente(x,callback){

	  pool.connect((err,client,done)=>{
		  
		  if(err){
		  	return console.log(err)
		  }

			   let query=`select address from ismath where idehelpdesk=$1 
			   order by idehelpdesk limit 1`;

			    client.query(query,[x],function(error,data){
					if(error){
					  	return console.log(error)
					  }
			     
					done();
			     if(data.rows.length==0){
			     	return callback(false,null);
			     }
			     else {
			     	console.log("###################$$$$$$$$$$$$$$$$$$$$$$$$");
			     	console.log(true,JSON.parse(data.rows[0].address))
			     	return callback(true,data.rows[0].address);
			     }



	})
		  
			
 })

}
//Obtenemos el address de helpdesk del math  que se realizo 
static obtenerAddressHelpDesk(x,callback){

	  pool.connect((err,client,done)=>{
		  
		  if(err){
		  	return console.log(err)
		  }

			   let query=`
			    select h.address from ismath i
				inner join helpdesk h
				on h.idehelpdesk=i.idehelpdesk
				inner join clientes c
				on c.ideclient=i.ideclient
				where i.ideclient=$1
				order by i.ideclient limit 1
			   `;

			    client.query(query,[x],function(error,data){
					if(error){
					  	return console.log(error)
					  }
			     
					done();
			     if(data.rows.length==0){
			     	return callback(false,null);
			     }
			     else {
			     	console.log(data.rows[0]);
			     	return callback(true,data.rows[0].address);
			     }



	})
		  
			
 })

}
}

module.exports=MdpDBMesaDeAyuda;