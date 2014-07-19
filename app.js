var express = require('express');
var http = require('http');
var path = require('path');
var MongoStore=require('connect-mongo')(express);
var settings=require("./settings");
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash=require("connect-flash");

var routes = require('./routes');
var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));    //当前的模板的路径。
app.set('view engine', 'ejs');                      //当前模板的引擎。
app.use(flash());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.use(express.cookieParser());
/*app.use(express.session({
    secret:settings.cookieSecret,
    key:settings.db,
    cookie:{maxAge:1000*60*60*24*30}, //30days
    store:new MongoStore({
        db:settings.db
    })
}));*/
//app.get('/', routes.index);
//app.get('/users', users.list);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
routes(app);