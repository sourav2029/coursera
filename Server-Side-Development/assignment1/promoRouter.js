var express=require('express');
var bodyparser=require('body-parser');
var promoRouter=express.Router();
promoRouter.use(bodyparser.json());
promoRouter.route('/')
.all(function(req,res,next){
  res.writeHead(200,{'Content-type':'text/html'});
  next();
})
.get(function(req,res,next){
  res.end('will send all the promotions to you!');
})
.post(function(req,res,next){
  res.end('Will add the promotion: '+req.body.name+' with details: '+req.body.description);
})
.delete(function(req,res,next){
  res.end('Deleting all the promotion');
});
promoRouter.route('/:promoId')
.all(function(req,res,next){
  res.writeHead(200,{'Content-type':'text/html'});
  next();
})
.get(function(req,res,next){
  res.end('will send details of the promotion: '+req.params.promoId);
})

.put(function(req,res,next){
  res.write('Updating the promotion: '+req.params.promoId+ '\r\n');
  res.end('Will update the promotion: '+req.body.name+ ' with details: '+req.body.description);
})
.delete(function(req,res,next){
  res.end('Deleting promotion: '+req.params.promoId);
});
module.exports=promoRouter;
