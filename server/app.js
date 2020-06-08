const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const sectorsRouter = require('./routes/sectors');
const reservationsRouter = require('./routes/reservations');
const cors = require('cors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const verifyJWT = function (req, res, next) {

  if ((req.method === "POST" && req.url === "/login") || (req.method === "POST" && req.url === "/users")) {
    next();
    return;
  }

  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }

    // se tudo estiver ok, salva no request para uso posterior
    req.user = decoded;
    next();
  });
};


app.use('/', indexRouter);
app.use('/login', loginRouter);

app.use(verifyJWT);

app.use('/users', usersRouter);
app.use('/sectors', sectorsRouter);
app.use('/reservations', reservationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });


module.exports = app;
