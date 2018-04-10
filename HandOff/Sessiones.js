
var pg=require("pg");
const config={
"host":"localhost",
	"user":"postgres",
	"database":"chatdesk",
	"port":"5432",
	"password":"javier"
}
var pool=new pg.Pool(config)
class Sessiones{

static registrar(x,a){
 pool.connect((err,client,done)=>{
  
	  if(err){
	  	return console.log(err)
	  }
			let query=`insert into sesionesWatson(ide,sesiones)
         values($1,$2);`;

			client.query(query,[x.id,JSON.stringify(x.address)],function(error,data){
			if(error){
			  	return console.log(error)
			  }

			done();
			})
 })


}

static buscar(x,callback){
   pool.connect((err,client,done)=>{
		  
		  if(err){
		  	return console.log(err)
		  }

   let query=`select * from sesionesWatson where ide=$1`;

    client.query(query,[x],function(error,data){
		if(error){
		  	return console.log(error)
		  }

		done();
		console.log(data.rows,786854444444444444444);
		callback(false,data.rows)
		return ;
	})
		  
			
 })


}

}

module.exports=Sessiones;