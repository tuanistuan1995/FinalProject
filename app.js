var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");
var session = require("express-session");
var moment = require('moment'); 
var exphbs = require('express-handlebars');


var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

const apiRouter = require('./routes/api');

var app = express();
var mongoose = require("mongoose");
// const { format } = require('path');

// connect to Database
const url =
  "mongodb+srv://anhtuan:vutuan113@cluster0.mdpk2.mongodb.net/SNSs?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    // useFindAndModify: false,
    // useCreateIndex: true
  })
  .then(() => console.log("Connection to DB sucess."))
  .catch((err) => console.log(`Connect to Db failed. Error: ${err}`));

// using Session to verify User Login.
app.use(
  session({
    secret: "mySecretSession",
    resave: true,
    saveUninitialized: false,
  })
);

// exphbs.registerHelper('dateFormat', function (date, options) {
//   const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "DD/MM/YYYY"
//   return moment(date).format(formatToUse);
// });


// const hbs = exphbs.create({
//   helpers: {
//     generateDate : (date, format) => {
//       return moment(date).format(format)
//     }
//   }
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

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
