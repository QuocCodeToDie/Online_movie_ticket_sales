"use strict";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json(); // create application/x-www-form-urlencoded parser

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var bcrypt = require('bcrypt');

var passport = require('passport');

var initializePassport = require('./passport-config');

var flash = require('express-flash');

var session = require('express-session');

var methodOverride = require('method-override');

var jsonFile = require('jsonfile'); //////// Test DB


var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/rap_phim_db_test_4", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var Rap = require('./rap_model');

initializePassport(passport, function (email) {
  return users.find(function (user) {
    return user.email === email;
  });
}, function (_id) {
  return users.find(function (user) {
    return user._id === _id;
  });
}); //JSDOM virtual DOM

var jsdom = require("jsdom");

var got = require("got");

var JSDOM = jsdom.JSDOM; ///

var users = [];
var ticket_info = [];
var seat_info = [];
app.set('view-engine', 'ejs');
app.use(express.urlencoded({
  extended: false
}));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(express["static"]("public"));
app.get('/', checkAuthenticated, function (req, res) {
  var flag;
  var temp;

  if (req.isAuthenticated() === true) {
    res.render('index.ejs', {
      flag: 'display: none; ',
      name: req.user.name
    }); // var sas = document.getElementById('lang-switch').value
    // const dom = new JSDOM('index.ejs')
    // console.log(dom.window.document.getElementById('lang-switch').value)
    // document.getElementById("lang-switch")
    // global.document = new JSDOM("http://localhost:4000/").window.document;
    // var testcase = document.getElementById("minhthanh").value()
    // console.log(testcase)
    //res. // console.log(abc)
    // console.log(res)
  } else {
    res.render('index.ejs', {
      flag: 'display: block; '
    });
  }
}); // app.get('/movies',checkAuthenticated,(req,res)=>{
// })

app.get('/login', checkNotAuthenticated, function (req, res) {
  res.render('login.ejs');
});
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));
app.get('/register', checkNotAuthenticated, function (req, res) {
  res.render('register.ejs');
});
app.post('/register', checkNotAuthenticated, function _callee(req, res) {
  var hashedPassword;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 3:
          hashedPassword = _context.sent;
          Rap.create({
            id: Date.now().toString(),
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword
          }, function (err, rap) {
            if (err) {
              console.log(err);
            } else {
              console.log(rap);
            }
          });
          res.redirect('/login');
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.redirect('/register');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.post('/register', checkNotAuthenticated, function _callee2(req, res) {
  var hashedPassword;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 3:
          hashedPassword = _context2.sent;
          users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
          });
          res.redirect('/login');
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.redirect('/register');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.get('/en/movies', checkAuthenticated, function (req, res) {
  res.render('en/movies.ejs');
}); // app.post('/en/movies', checkAuthenticated, async(req, res) => {
//     movies_info.push[{
//         movie_name: req.body.ten_phim
//     }]
// })

app.get('/vi/movies', checkAuthenticated, function (req, res) {
  res.render('vi/movies.ejs');
}); //
//single movies:
//#1

app.get('/en/movies/:ten_phim', checkAuthenticated, function (req, res) {
  var tenphim = req.params.ten_phim; //movies_info.push[{ name: tenphim }]
  // console.log(tenphim)

  res.render('en/' + tenphim + '.ejs'); //console.log(req.user)
  // console.log(req.body)
});
app.get('/vi/movies/:ten_phim', checkAuthenticated, function (req, res) {
  var tenphim = req.params.ten_phim; //movies_info.push[{ name: tenphim }]
  // console.log(tenphim)

  res.render('vi/' + tenphim + '.ejs'); //console.log(req.user)
  // console.log(req.body)
}); ////////

app.get('/vi/movies/booking-form/:ten_phim', checkAuthenticated, function (req, res) {
  var tenphim = req.params.ten_phim;
  res.render('vi/booking-form.ejs'); // console.log(req)
  // console.log(tenphim + " " + req)
  // console.log(req)
});
app.get('/en/movies/booking-form/:ten_phim', checkAuthenticated, function (req, res) {
  var tenphim = req.params.ten_phim;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;
  res.render('en/booking-form.ejs', {
    temp: tenphim,
    date: today
  }); // console.log(tenphim)
  // console.log(req)
  // console.log(req.body.returnSL)
  // console.log("booking " + req.body.formresult2)
  // console.log(tenphim + " " + req)
  // console.log(req)
});
app.post('/en/movies/booking-form/:ten_phim', checkAuthenticated, function (req, res) {
  var tenphim = req.params.ten_phim;

  try {
    ticket_info.push({
      guest_id: req.user._id,
      guest_email: req.user.email,
      ten_phim: tenphim,
      so_luong_don: req.body.slgheDon,
      so_luong_doi: req.body.slgheDoi,
      tong_so_luong: req.body.soLuong,
      tong_so_tien: req.body.tongTien
    });
    res.redirect('/en/movies/booking-seat/' + tenphim);
  } catch (_unused3) {} // console.log(req)


  console.log(ticket_info); // console.log("booking " + req.body.formresult2)
  // console.log(tenphim + " " + req)
  // console.log(req)
});
app.get('/en/movies/booking-seat/:ten_phim', checkAuthenticated, function (req, res) {
  var tenphim = req.params.ten_phim;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

  var yyyy = today.getFullYear();
  var sl = ticket_info[0]["tong_so_luong"];
  today = dd + '/' + mm + '/' + yyyy;
  res.render('en/booking-seat.ejs', {
    temp: tenphim,
    date: today,
    amount: sl
  });
  console.log(req.body);
}); // app.post('/en/booking-form', checkAuthenticated, (req, res) => {
//     res.render('en/booking-form.ejs')
//     movies_info.push[{
//         movies_name: req.body.ten_phim
//     }]
// })
// app.post('/en/booking-form', checkAuthenticated, async(req, res) => {
//         movies_info.push[{
//             movie_name: req.body.ten_phim
//         }]
//     })
//
// app.get('/en/booking-form/chon-ghe', checkAuthenticated, (req, res) => {
//     res.render('en/booking-seat.ejs')
//         // console.log(req)
// })
// app.get('/vi/booking-form/chon-ghe', checkAuthenticated, (req, res) => {
//         res.render('vi/booking-seat.ejs')
//     })
//     ///

app["delete"]('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
}

app.listen(4000);