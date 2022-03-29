const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

var mongoose = require("mongoose")
    // mongoose.connect("mongodb://localhost/rap_phim_db_test_2", { useNewUrlParser: true, useUnifiedTopology: true })
var Rap = require('./models/rap_model');
//
// function initialize(passport, getUserByEmail, getUserByID) {


function initialize(passport, getUserByEmail, getUserByID) {
    const authenticateUser = async(email, password, done) => {
        //
        //24/8/2020**********************************************
        // var user = {}



        var temp;

        await Rap.findOne({ email: email }, function(err, pro) {
            if (err) { console.log(err) }
            temp = pro;
        });
        const user = temp
        getUserByEmail = user





        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }


    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser(function(user, done) {
        // console.log(user, user._id, Rap.findOne({ _id: _id }));
        done(null, user._id);
    });


    passport.deserializeUser((_id, done) => {
        Rap.findById({ _id: _id }, function(err, user) {
            done(err, user);
        });


    })




}

module.exports = initialize