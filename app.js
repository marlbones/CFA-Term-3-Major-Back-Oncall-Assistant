var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');

const flash = require('connect-flash');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');

var clientAuth = require('./middleware/clientAuth')

//Init app
var app = express();

app.use(cors());

//json webtoken
// var jwt = require('jsonwebtoken');
// var token = jwt.sign({ email: 'admin@admin.com' }, 'secret'); //change 'secret' to process.env.SECRET
// console.log(token);

//db setup/connection
mongoose.connect(process.env.MLAB_ONCALL);
const {connection: db} = mongoose;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to client database')
});

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
  // Secret can be anything
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Init passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator for form validation
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('.');
    const root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }
    return {
      param: formParam,
      msg: msg,
      value:value,
    };
  },
}));

// Connect flash
app.use(flash());

// Global vars for flash messages
// (res.locals for global vars)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  // Passport's own error msg
  res.locals.error = req.flash('error');
  // If user exists, assign to variable
  res.locals.user = req.user || null;
  next();
});

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
