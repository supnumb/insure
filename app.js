var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var moment = require('moment');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var webRoute = require('./web_route');
var apiV1 = require('./api_router_v1');

// 保险商品的管理
var admin_index= require('./routes_admin/index');
var admin_goods = require('./routes_admin/goods');
var admin_activity = require('./routes_admin/activity');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//格式化日期 
app.locals.date_format = function(date){
    return moment(date).format("YYYY-MM-DD HH:mm");
};

app.locals.cutMoreWords = function(str,length){
    var newStr = str;
    if(str.length > length){
        newStr = str.substring(0,length) + "..."
    }
    return newStr;
};

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRoute);
app.use('/v1', apiV1);
app.use('/admin', admin_index);
app.use('/admin/goods', admin_goods);
app.use('/admin/activity', admin_activity);

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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
