const passport = require('passport');

exports.index = (req, res) => { res.json('Show Login Form'); }

exports.login = () =>{
    passport.authenticate('google', { scope: ['profile', 'email']});
}

exports.logout = (req, res, next) => { req.logout(); res.redirect('/'); }

exports.back = () => {
    passport.authenticate('google', { session: true, failureRedirect: `https://localhost:3000/api/auth/` }), (req, res) => {
        res.redirect(req.user);  
    };
}

