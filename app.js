const createError = require('http-errors');
const errorHandler = require('./utils/errorHandler');
const express = require('express');
const path = require('path');
const cors = require('cors');
const fileRouter = require('./routes/filerouts');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');
const courseRouter = require('./routes/course');
const verificationRouter = require('./routes/verification'); // יבוא של ראוטר האימות
const app = express();

app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.urlencoded({ extended: true }));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');;

// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/courses', courseRouter);
app.use('/files', fileRouter)
app.use('/verification', verificationRouter);

app.use(express.static('Files'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {

  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;




