var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var config=require('./config');
var passport=require('passport');
var authenticate = require('./authenticate');
mongoose.connect(config.mongoUrl);
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected correctly to server");
});

var routes = require('./routes/index');
var crap = require('./routes/users');
var dishRouter=require('./routes/dishRouter');
var leaderRouter=require('./routes/leaderRouter');
var promoRouter=require('./routes/promoRouter');
var favoriteRouter=require('./routes/favoriteRouter');
var app = express();

app.all('*',function(req,res,next){
  if(req.secure){
    return next();
  };
  res.redirect('https://'+req.hostname+':'+app.get('secport')+req.url);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//pasport configuration
app.use(passport.initialize());

app.use('/', routes);
app.use('/users',crap );
app.use('/dishes',dishRouter);
app.use('/leadership',leaderRouter);
app.use('/promotions',promoRouter);
app.use('/favorites',favoriteRouter);
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json( {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
