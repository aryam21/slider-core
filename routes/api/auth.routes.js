'use strict';

const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const router = express.Router();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

router.use(expressSession({ secret: 'cats', resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
    res.send('<a href="/google">Authenticate with Google</a>');
});

router.get('/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
    ));

router.get('/google/redirect',
    passport.authenticate( 'google', { successRedirect: '/api/auth/protected', failureRedirect: '/google/failure' })
);

router.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

router.get('/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});



module.exports = router;
