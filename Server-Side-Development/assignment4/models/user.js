var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var UserSchema= new Schema({
  username : String,
  password :String,
  OauthId: String,
  OauthToken: String,
  firstname:{
    type : String,
    default : ''
  },
  lastname :{
    type:String,
    default:''
  },
  admin:{
    type:Boolean,
    default :false
  }
});

UserSchema.methods.getName=function(){
  return (this.firstname+" "+this.lastname);
}
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',UserSchema);
