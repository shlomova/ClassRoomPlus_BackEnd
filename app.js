const createError = require('http-errors');
const errorHandler = require('./utils/errorHandler');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');
const courseRouter = require('./routes/course');
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
const postRoutes = require('./routes/post');
app.use('/posts', postRoutes);
// app.use('/course', courseRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {

  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;




