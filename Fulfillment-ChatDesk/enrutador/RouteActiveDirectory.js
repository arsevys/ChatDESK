
var AD=require("./../app/ActiveDirectory");

class RouteActiveDirectory {


  static Enrutador(action,y,res){  // action es la accción  - Y es el data que se recibe
     switch(action){
    case "ViewPassword":AD.ViewPassword(y,res);break;
    case "ChangePassword":AD.ChangePassword(y,res);break;
   }
  

}
}
module.exports=RouteActiveDirectory;