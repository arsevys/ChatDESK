
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

static registrar(x,a,callback){
 pool.connect((err,client,done)=>{
  
	  if(err){
	  	return console.log(err)
	  }
			let query=`insert into sesionesWatson(ide,sesiones)
         values($1,$2);`;

			client.query(query,[x,JSON.stringify(a)],function(error,data){
			if(error){
			  	return console.log(error)
			  }

			done();
			return callback();

			})
 })


}

static actualisar(x,a,callback){
 pool.connect((err,client,done)=>{
  
	  if(err){
	  	return console.log(err)
	  }
			let query=`update sesioneswatson
				set sesiones=$2
				where ide=$1;`;

			client.query(query,[x,JSON.stringify(a)],function(error,data){
			if(error){
			  	return console.log(error)
			  }

			done();
			return callback();

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