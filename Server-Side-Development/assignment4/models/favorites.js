var mongoose =require('mongoose');
var Schema=mongoose.Schema;

var favoriteSchema= new Schema({
  updatedAt:{type: Date, default: Date.now},
  createdAt:{type: Date, default: Date.now},
  postedBY:{
      type:Schema.Types.ObjectId,
      ref:'User',
      unique:true
    },
    dishes:[{
      type:Schema.Types.ObjectId,
      ref:'dishes',
      unique:true
    }]
});

var Favorites=mongoose.model('Favorites',favoriteSchema);
module.exports=Favorites;
