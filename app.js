'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require("cookie-session");

const passport = require('passport');
require('./middlewares/passport');

const cors = require('cors');
const expressSession = require('express-session');    
const indexRouter = require('./routes/index');
const output = require('./helpers/generateOutput');

global.__basedir = __dirname;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use(expressSession({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));

// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }
//
// app.use(expressSession({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
//
// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });
//
// app.get('/auth/google',
//   passport.authenticate('google', { scope: [ 'email', 'profile' ] }
// ));
//
// app.get('/auth/google/redirect',
//     passport.authenticate( 'google', { successRedirect: '/protected', failureRedirect: '/auth/google/failure' })
// );
//
// app.get('/protected', isLoggedIn, (req, res) => {
//   res.send(`Hello ${req.user.displayName}`);
// });
//
// app.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('Goodbye!');
// });
//
// app.get('/auth/google/failure', (req, res) => {
//   res.send('Failed to authenticate..');
// });



app.use('/api', indexRouter);

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    if (err.code === 'LIMIT_FILE_SIZE') {
        return output(res, [], true, "Please, upload a file that's smaller than 20MB", 400);
    }
    return output(res, [], true, res.locals.message, 500);
});

module.exports = app;
