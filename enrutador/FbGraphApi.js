var request=require("request");
var access_token="DQVJ2c0NUMEpIX21oNmNLOWJnalMzc3pTU3FidEJtcjB5LUZA4cDVsSWZAadmx5ODF6UlBod2UzSVI1VGV2M05faE1iTkEzejJKTkxkZAmp5M09ET3FzSVpncUlwZADJzaWlXQWRXMTkzSlpKNHJabDgtMWdvVE9FVWt0VllWZAHZADbERXbnpnOXdsbUZAsTHhDUDFFSWhXMWMwb19MVVgzTkRyUm9jSmMzdWN1QWZAva3JKemlac1ZAzdXlCTjBnMTF5MUhDNUZAybXBn";
class FbGraphApi {

static getData(id,callback){
console.log("******************Extraer DAto FB **************")
	request({
		uri:"https://graph.facebook.com/v2.12/"+id+"?access_token="+access_token+"&debug=all&fields=first_name%2Cname%2Cemail%2Ccurrency%2Cid%2Clast_name%2Clink&format=json&method=get&pretty=0&suppress_http_code=1"
	    ,method:"GET",

	},(error,response,body)=>{
		let datos=JSON.parse(body);
		console.log(JSON.parse(body),7878);

        callback(datos);
	})
}


}

module.exports=FbGraphApi;