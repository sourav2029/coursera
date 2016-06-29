var express=require('express');
var bodyparser=require('body-parser');
var dishRouter=express.Router();
dishRouter.use(bodyparser.json());

dishRouter.route('/')
.all(function(req,res,next){
  res.writeHead(200,{'Content-type':'text/html'});
  next();
})
.get(function(req,res,next){
  res.end('will send all the dishes to you!');
})
.post(function(req,res,next){
  res.end('Will add the dish: '+req.body.name+' with details: '+req.body.description);
})
.delete(function(req,res,next){
  res.end('Deleting all the dishes');
});

dishRouter.route('/:dishId')
.all(function(req,res,next){
  res.writeHead(200,{'Content-type':'text/html'});
  next();
})
.get(function(req,res,next){
  res.end('will send details of the dish: '+req.params.dishId);
})
.put(function(req,res,next){
  res.write('Updating the dish: '+req.params.dishId+ '\r\n');
  res.end('Will update the dish: '+req.body.name+ ' with details: '+req.body.description);
})
.delete(function(req,res,next){
  res.end('Deleting dish: '+req.params.dishId);
});
module.exports=dishRouter;
