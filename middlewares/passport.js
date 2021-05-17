require('dotenv').config();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.User;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACKURL,
    passReqToCallback: true,
},
    function(request, accessToken, refreshToken, profile, done) {
        // let user_email = profile.emails && profile.emails[0].value;
        var googleId = profile.id;
        var email = profile.emails[0].value;
        var firstName = profile.given_name;
        var lastName = profile.family_name;
        // var fullName = `${firstName} ${lastName}`;
        var picture = profile.picture;
        // var userFound = User.findByPk({
        //     where: {
        //         email:email
        //     }
        // });
        // if (userFound){
        //     User.update({ google_id:googleId, first_name: firstName, last_name:lastName, email:email, picture: picture }, {
        //         where: {email:email}
        //     });
        // }else{
        // var currentUser = User.findOne({ where: { google_id: googleId} });

        // if (!currentUser) {
            var currentUser = User.create({ google_id:googleId, first_name: firstName, last_name:lastName, email:email, picture: picture });
        // }
        // const token = jwt.sign(email, process.env.JWT_SECRET, { expiresIn: '12h' });

        // var token = jwt.sign({ email: email, googleId:googleId}, process.env.JWT_SECRET, { expiresIn: '1h' });
        return done(null, profile);
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});



