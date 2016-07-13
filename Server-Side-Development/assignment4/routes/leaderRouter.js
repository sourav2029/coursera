var express=require('express');
var bodyparser=require('body-parser');
var leaderRouter=express.Router();
leaderRouter.use(bodyparser.json());
var mongoose = require('mongoose');
var leadership=require('../models/leadership');
var Verify=require('./verify');
leaderRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
  leadership.find({},function(err,leadership){
    if(err)throw err;
    res.json(leadership);
  });
})
.post(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  leadership.create(req.body,function(err,leadership){
      if(err)throw err;
      console.log('Leader created');
      var id=leadership._id;
      res.writeHead(200,{'Content-type':'text/html'});
      res.end('Leader created with id '+id);
  });
})
.delete(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  leadership.remove({},function(err,resp){
      if(err)throw err;
      res.json(resp);
  });
});

leaderRouter.route('/:leaderId')

.get(Verify.verifyOrdinaryUser,function(req,res,next){
  leadership.findById(req.params.leaderId,function(err,leader){
      if(err)throw err;
      res.json(leader);
  });
})
.put(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  leadership.findByIdAndUpdate(req.params.leaderId,{$set :req.body},{new :true},function(err,leader){
    if(err)throw err;
    res.json(leader);
  });
})
.delete(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  leadership.findByIdAndRemove(req.params.dishId,function(err,dish){
    if(err)throw err;
    res.json(dish);
  });
});

module.exports=leaderRouter;
