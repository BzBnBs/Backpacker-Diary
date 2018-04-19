var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
<<<<<<< HEAD
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exampleApp');
=======
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/backpacker-diaries');

>>>>>>> cbf1e8ff4c1ab7d06852cf290f3ac485ec79ada5

var indexRouter = require('./routes/index');
const travelRoutes = require('./routes/travels');

var app = express();

const url = 'mongodb://localhost/travel';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/travels', travelRoutes);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
