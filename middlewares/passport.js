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
                User.create({ google_id:googleId, first_name: firstName, last_name:lastName, email:email, picture: picture });
            // }
//             // // let [user] = await db('users').select(['id', 'name', 'email']).where('email', user_email);
//             // let redirect_url = "";
//             // if (user_email) {
//             //     const token = jwt.sign(user_email, process.env.JWT_SECRET, { expiresIn: '12h' });
//             //     // redirect_url = `http://localhost:3000/return`
//             //     redirect_url = `http://localhost:3000/${token}`
//             //     return done(null, redirect_url);
//             // } else {
//             //     redirect_url = `http://localhost:3000/api/auth`;
//             //     return done(null, redirect_url);
//             // }
        return done(null, profile);
    })
);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});



// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// passport.serializeUser(function(user, done) {
//     /*
//     From the user take just the id (to minimize the cookie size) and just pass the id of the user
//     to the done callback
//     PS: You dont have to do it like this its just usually done like this
//     */
//     done(null, user);
//   });

// passport.deserializeUser(function(user, done) {
//     /*
//     Instead of user this function usually recives the id
//     then you use the id to select the user from the db and pass the user obj to the done callback
//     PS: You can later access this data in any routes in: req.user
//     */
//     done(null, user);
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: `http://localhost:3000/api/google/redirect`,
// },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             console.log(profile.id);
//             // let user_email = profile.emails && profile.emails[0].value;
//             // const googleId = profile.id;
//             // const email = profile.emails[0].value;
//             // await User.create({ googleId, email });
//             // // let [user] = await db('users').select(['id', 'name', 'email']).where('email', user_email);
//             // let redirect_url = "";
//             // if (user_email) {
//             //     const token = jwt.sign(user_email, process.env.JWT_SECRET, { expiresIn: '12h' });
//             //     // redirect_url = `http://localhost:3000/return`
//             //     redirect_url = `http://localhost:3000/${token}`
//             //     return done(null, redirect_url);
//             // } else {
//             //     redirect_url = `http://localhost:3000/api/auth`;
//             //     return done(null, redirect_url);
//             // }
//         } catch (error) {
//             done(error)
//         }
//     }
// ));
