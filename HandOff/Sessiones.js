
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
			let query=`insert into sesionesWatson(ide,sesiones,email,nombre,first_nombre,last_nombre)
         values($1,$2,$3,$4,$5,$6);`;
          let d=[x,JSON.stringify(a),a.email,a.name,a.first_name,a.last_name];
			client.query(query,d,function(error,data){
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
				set sesiones=$2,
				UltimaSession=to_char(now() AT TIME ZONE 'UTC' - interval '5 hours','YYYY-MM-DD HH24:MI:SS')
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