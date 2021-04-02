var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./app/routes/index');
var usersRouter = require('./app/routes/users');
var adminRouter = require('./app/routes/admin/index');
var webRouter = require('./app/routes/web/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'views/admin'))); // 后台访问地址
app.use('/web', express.static(path.join(__dirname, 'views/web'))); // h5访问地址

app.use('/', express.static(path.join(__dirname, 'views/web')));
app.use('/users', usersRouter);
app.use('/admin-api', adminRouter);
app.use('/web-api', webRouter);

app.use('/file', require('./app/routes/file')); // 文件上传接口  用来上传打包后的文件
app.use('/upload', require('./app/routes/upload')); // 图片上传到oss接口

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
