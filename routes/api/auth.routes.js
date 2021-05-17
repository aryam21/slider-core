'use strict';

const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const router = express.Router();
const authService = require('../../services/AuthService');

const output = require('../../helpers/generateOutput');

// function isLoggedIn(req, res, next) {
//     req.user ? next() : res.sendStatus(401);
// }

router.use(expressSession({ secret: 'cats', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
    res.send('<a href="/google">Authenticate with Google</a>');
});

router.get('/google',
    passport.authenticate('google', {
        session: false,
        scope: ["profile", "email"],
        accessType: "offline",
        approvalPrompt: "force"
    }
    ));

router.get('/google/redirect',
    passport.authenticate( 'google',  { successRedirect: '/api/auth/protected', failureRedirect: '/api/auth/google/failure' })
);

// router.get('/protected', isLoggedIn, (req, res) => {
router.get('/protected', (req, res) => {
    authService.signToken(req, res);
    // return output(res, token, false, '', 200);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    // res.send('Goodbye!');
});

router.get('/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});



module.exports = router;












// // route to check token with postman.
// // using middleware to check for authorization header
// app.get('/verify', authService.checkTokenMW, (req, res) => {
//   authService.verifyToken(req, res);
//   if (null === req.authData) {
//     res.sendStatus(403);
//   } else {
//     res.json(req.authData);
//   }
// });
