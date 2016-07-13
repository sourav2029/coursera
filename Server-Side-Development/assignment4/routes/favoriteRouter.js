var express=require('express');
var bodyparser=require('body-parser');
var favoriteRouter=express.Router();
var mongoose = require('mongoose');
favoriteRouter.use(bodyparser.json());
var dishes=require('../models/dishes');
var Verify=require('./verify');
var Favorite=require('../models/favorites');
var User=require('../models/user');
favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
  var id=req.decoded._doc._id;
  Favorite.find({"postedBY":id}).
  populate('postedBY dishes').exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})
.post(Verify.verifyOrdinaryUser, function(req,res,next){
  var id=req.decoded._doc._id;
  console.log(id);
  console.log(req.body);
  var dish_id=req.body._id;
  Favorite.count({"postedBY":id},function(err,c){
    if(c==0)
    {
      var fav=new Favorite({
        "postedBY":id,
        "dishes":[req.body._id]
      });
      fav.save(function(err,fav){
        if(err) throw err;
        console.log("Dish with id: "+req.body._id+" added to favorites");
        res.json(fav);
      })
    }
    else{
      Favorite.findOne({"postedBY":id},function(err,fav){//find will not work
        if(err) throw err;
        console.log(fav);
        fav.dishes.push(dish_id);
        fav.save(function(err,favorites){
          if(err)throw err;
          console.log("Dish with id: "+req.body._id+" added to favorites");
          res.json(favorites);
        });
      });
    }
  });
})
.delete(Verify.verifyOrdinaryUser,function(req,res,next){
    var id=req.decoded._doc._id;
  Favorite.remove({"postedBY":id},function(err,resp){
    if(err)throw err;
    res.json(resp);
  });
});
favoriteRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser,function(req,res,next){
  var id=req.decoded._doc._id;
  var dish_id=req.params.dishId;
  Favorite.findOne({"postedBY":id},function(err,favorite){
    console.log(favorite);
    console.log(favorite.dishes.length);
    for(var i=0; i<favorite.dishes.length; i++){
        if (String(favorite.dishes[i])==String(dish_id)){
            favorite.dishes.remove(dish_id);
            break;
            }
        }
        favorite.save(function(err,favorite){
            if (err) throw err;
            res.json(favorite);
    });
  });
});

module.exports=favoriteRouter;
