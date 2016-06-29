var express=require('express');
var bodyparser=require('body-parser');
var promoRouter=express.Router();
promoRouter.use(bodyparser.json());
var mongoose = require('mongoose');
var promotions=require('../models/promotions');
promoRouter.route('/')
.get(function(req,res,next){
  promotions.find({},function(err,promotions){
    if(err)throw err;
    res.json(promotions);
  });
})
.post(function(req,res,next){
  promotions.create(req.body,function(err,promotions){
      if(err)throw err;
      console.log('promotion created');
      var id=promotions._id;
      res.writeHead(200,{'Content-type':'text/html'});
      res.end('promotion created with id '+id);
  });
})
.delete(function(req,res,next){
  promotions.remove({},function(err,resp){
      if(err)throw err;
      res.json(resp);
  });
});
promoRouter.route('/:promoId')

.get(function(req,res,next){
  promotions.findById(req.params.promoId,function(err,promotion){
      if(err)throw err;
      res.json(promotion);
  });
})

.put(function(req,res,next){
  promotions.findByIdAndUpdate(req.params.promoId,{$set :req.body},{new :true},function(err,promotion){
    if(err)throw err;
    res.json(promotion);
  });
})
.delete(function(req,res,next){
  promotions.findByIdAndRemove(req.params.dishId,function(err,promotion){
    if(err)throw err;
    res.json(promotion);
  });
});
module.exports=promoRouter;
