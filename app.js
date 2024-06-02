const createError = require('http-errors');
const errorHandler = require('./utils/errorHandler');
const express = require('express');
const cors = require('cors')
const fileRouter = require('./routes/filerouts')
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');
const courseRouter = require('./routes/course');
const mailRouter = require('./routes/mail')
const admonRouter = require('./routes/admon.js')
const app = express();

app.use(cors({
  origin: true,
  credentials: true
}))
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/admon', admonRouter)
app.use('/mail', mailRouter)
app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/courses', courseRouter);
app.use('/files', fileRouter)

app.use(express.static('Files'))
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;




