var express= require('express');
var morgan=require('morgan');
var bodyparser=require('body-parser');
var hostname='localhost';
var port=4000;
var dishRouter=require('./dishRouter');
var promoRouter=require('./promoRouter');
var leaderRouter=require('./leaderRouter');
var app=express();
app.use(morgan('dev'));
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leadership',leaderRouter);
app.use(express.static(__dirname+'/public'));

app.listen(port,hostname,function(){
  console.log(`Server listening at http://${hostname}:${port}`);
});

module.exports=app;
