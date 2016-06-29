var express=require('express');
var bodyparser=require('body-parser');
var leaderRouter=express.Router();
leaderRouter.use(bodyparser.json());

leaderRouter.route('/')
.all(function(req,res,next){
  res.writeHead(200,{'Content-type':'text/html'});
  next();
})
.get(function(req,res,next){
  res.end('will send all the leaders to you!');
})
.post(function(req,res,next){
  res.end('Will add the leader: '+req.body.name+' with details: '+req.body.description);
})
.delete(function(req,res,next){
  res.end('Deleting all the leaders');
});

leaderRouter.route('/:leaderId')
.all(function(req,res,next){
  res.writeHead(200,{'Content-type':'text/html'});
  next();
})
.get(function(req,res,next){
  res.end('will send details of the leader: '+req.params.leaderId);
})
.put(function(req,res,next){
  res.write('Updating the leader: '+req.params.leaderId+ '\r\n');
  res.end('Will update the leader: '+req.body.name+ ' with details: '+req.body.description);
})
.delete(function(req,res,next){
  res.end('Deleting leader: '+req.params.leaderId);
});

module.exports=leaderRouter;
