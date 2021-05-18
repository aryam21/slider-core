const jwt = require('jsonwebtoken');
const output = require('../helpers/generateOutput');


// check if Token exists on request Header and attach token to request as attribute
exports.checkTokenMW = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader.split(' ')[1];
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
                return output(res, [], true, err, 403);
                // res.sendStatus(403);
            } else {
                return req.authData = authData;
            }
        })
        next();
    } else {
        res.sendStatus(403);
    }
};

// Verify Token validity and attach token data as request attribute
// exports.verifyToken = (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err) {
//             res.sendStatus(403);
//         } else {
//             return req.authData = authData;
//         }
//     })
// };

// Issue Token
exports.signToken = (req, res) => {
    jwt.sign({ email: req.body.email || 'some' , googleId:req.body.id || 'some'}, 'secretkey', {expiresIn:'1d'}, (err, token) => {
        if(err){
            return output(res, [], true, err, 500);
        } else {
            // res.header('Access-Control-Expose-Headers', token);
            res.cookie( 'token', token);
            return output(res, [], false, 'success', 200);
        }
    });
}
