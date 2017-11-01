var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var index = require('./routes/index');
var news = require('./routes/news');
var about = require('./routes/about');
var instrument = require('./routes/instrument');
var contact = require('./routes/contact');
var download = require('./routes/download');
var message = require('./routes/message');
var manager = require('./routes/manager');
var login = require('./routes/login');
var file = require('./routes/file');
var article = require('./routes/article');

var app = express(); // the main app

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'watch dog',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 80000 }
}));

// load routers on main app 
app.use('/index', index);
app.use('/', index);
app.use('/news', news);
app.use('/about', about);
app.use('/instrument', instrument);
app.use('/contact', contact);
app.use('/message', message);
app.use('/download', download);
app.use('/manager', manager);
app.use('/file', file);
app.use('/article', article);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err); //to the error event
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;