var express=require('express');
var bodyparser=require('body-parser');
var promoRouter=express.Router();
promoRouter.use(bodyparser.json());
var mongoose = require('mongoose');
var promotions=require('../models/promotions');
var Verify=require('./verify');
promoRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
  promotions.find({},function(err,promotions){
    if(err)throw err;
    res.json(promotions);
  });
})
.post(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  promotions.create(req.body,function(err,promotions){
      if(err)throw err;
      console.log('promotion created');
      var id=promotions._id;
      res.writeHead(200,{'Content-type':'text/html'});
      res.end('promotion created with id '+id);
  });
})
.delete(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  promotions.remove({},function(err,resp){
      if(err)throw err;
      res.json(resp);
  });
});
promoRouter.route('/:promoId')

.get(Verify.verifyOrdinaryUser,function(req,res,next){
  promotions.findById(req.params.promoId,function(err,promotion){
      if(err)throw err;
      res.json(promotion);
  });
})

.put(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  promotions.findByIdAndUpdate(req.params.promoId,{$set :req.body},{new :true},function(err,promotion){
    if(err)throw err;
    res.json(promotion);
  });
})
.delete(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  promotions.findByIdAndRemove(req.params.dishId,function(err,promotion){
    if(err)throw err;
    res.json(promotion);
  });
});
module.exports=promoRouter;
