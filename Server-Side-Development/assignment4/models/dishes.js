var mongoose =require('mongoose');
var Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency=mongoose.Types.Currency;
var commentSchema= new Schema(
  {
    rating:{
      type:Number,
      min:1,
      max:5,
      required :true
    },
    comment:{
      type:String,
      required :true
    },
  postedBY:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'//not UserSchema you need to refer the existing model not schema
    }
  },
  {
    timestamps :true
  });

  var dishSchema=new Schema(
    {
      name :{
        type:String,
        required:true,
        unique:true
      },
      image :{
        type:String,
        require:true,
      },
      category:{
        type:String,
        required :true,
      },
      label:{
        type :String,
        default:""
      },
      price:{
        type :Currency,
        required :true
      },
      description:{
        type:String,
        required:true
      },
      comments:[commentSchema]
    },
    {
      timestamps:true
    });

    var dishes=mongoose.model('dishes',dishSchema);
    module.exports=dishes;
