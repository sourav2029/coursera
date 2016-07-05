var express=require('express');
var bodyparser=require('body-parser');
var dishRouter=express.Router();
var mongoose = require('mongoose');
dishRouter.use(bodyparser.json());
var dishes=require('../models/dishes');
var Verify=require('./verify');
dishRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
  dishes.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})
.post(Verify.verifyOrdinaryUser,Verify.verfiyAdmin, function(req,res,next){
  dishes.create(req.body,function(err,dish){
    console.log('Dish created');
    var id =dish._id;
    res.writeHead(200,{'Content-type':'text/html'});
    res.end('Dish inserted with id '+id);
  });
})
.delete(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  dishes.remove({},function(err,resp){
    if(err)throw err;
    res.json(resp);
  });
});

dishRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
  dishes.findById(req.params.dishId,function(err,dish){
      if(err)throw err;
      res.json(dish);
  });
})
.put(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  dishes.findByIdAndUpdate(req.params.dishId,{$set :req.body},{new :true},function(err,dish){
    if(err)throw err;
    res.json(dish);
  });
})
.delete(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  dishes.findByIdAndRemove(req.params.dishId,function(err,dish){
    if(err)throw err;
    res.json(dish);
  });
});

dishRouter.route('/:dishId/comments')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})
.post(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  dishes.findById(req.params.dishId,function(err,dish){
     if (err) throw err;
     dish.comments.push(req.body);
     dish.save(function(err,dish){
       if (err) throw err;
       console.log('Updated comments');
       res.json(dish);
     });
  });
})
.delete(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  dishes.findById(req.params.dishId,function(err,dish){
       if (err) throw err;
       for(var i=(dish.comments.length -1 );i>=0;i--){
         dish.comments.id(dish.comments[i]._id).remove();
       }
       dish.save(function(err,result){
         if (err) throw err;
         res.writeHead(200,{'Content-type':'text/html'});
         res.end('Deleted all comments');
       });
  });
});
dishRouter.route('/:dishId/comments/:commentId')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
  dishes.findById(req.params.dishId,function(err,dish){
    if (err) throw err;
    res.json(dish.comments.id(req.params.commentId));
  });
})
.put(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  dishes.findById(req.params.dishId,function(err,dish){
      if (err) throw err;
      dish.comments.id(req.params.commentId).remove();
      dish.comments.push(req.body);
      dish.save(function(err,dish){
        if (err) throw err;
        console.log('updated comments');
        res.json(dish);
      });
  });
})
.delete(Verify.verifyOrdinaryUser,Verify.verfiyAdmin,function(req,res,next){
  dishes.findById(req.params.dishId,function(err,dish){
    if (err) throw err;
    dish.comments.id(req.params.commentId).remove();
    dish.save(function(err,dish){
        if (err) throw err;
        res.json(dish);
    });
  });
});
module.exports=dishRouter;
