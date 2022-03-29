"use strict";

var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt');

var mongoose = require("mongoose"); // mongoose.connect("mongodb://localhost/rap_phim_db_test_2", { useNewUrlParser: true, useUnifiedTopology: true })


var Rap = require('./rap_model'); //
// function initialize(passport, getUserByEmail, getUserByID) {


function initialize(passport, getUserByEmail, getUserByID) {
  var authenticateUser = function authenticateUser(email, password, done) {
    var temp, user;
    return regeneratorRuntime.async(function authenticateUser$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(Rap.findOne({
              email: email
            }, function (err, pro) {
              if (err) {
                console.log(err);
              }

              temp = pro;
            }));

          case 2:
            user = temp;
            getUserByEmail = user;

            if (!(user == null)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              message: 'No user with that email'
            }));

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

          case 9:
            if (!_context.sent) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", done(null, user));

          case 13:
            return _context.abrupt("return", done(null, false, {
              message: 'Password incorrect'
            }));

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](6);
            return _context.abrupt("return", done(_context.t0));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[6, 16]]);
  };

  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, authenticateUser));
  passport.serializeUser(function (user, done) {
    // console.log(user, user._id, Rap.findOne({ _id: _id }));
    done(null, user._id);
  });
  passport.deserializeUser(function (_id, done) {
    Rap.findById({
      _id: _id
    }, function (err, user) {
      done(err, user);
    });
  });
}

module.exports = initialize;