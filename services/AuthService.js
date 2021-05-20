const jwt = require('jsonwebtoken');
const output = require('../helpers/generateOutput');
// check if Token exists on request Header and attach token to request as attribute
exports.checkTokenMW = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers.authentication
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        if (!token) {
            return output(res, {message: 'Not Authorized'}, true, err, 401);
        }
        jwt.verify(token, 'secretkey', (err, data) => {
            if (err && err.name == 'Timeout') {
                return output(res, {message: 'Token timeout'}, true, err, 401);
            }
            if(err) {
                return output(res, {message: 'Not Authorized'}, true, err, 401);
            } else {
                return req.data = data;
            }
        })
        next();
    } else {
        res.sendStatus(401);
    }
};
// Verify Token validity and attach token data as request attribute
// exports.verifyToken = (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, data) => {
//         if(err) {
//             res.sendStatus(403);
//         } else {
//             return req.data = data;
//         }
//     })
// };
// Issue Token
exports.signToken = (req, res, userId) => {
    jwt.sign({ userId: userId, email: req.body.email , googleId:req.body.googleId}, 'secretkey', {expiresIn:'1d'}, (err, token) => {
        if(err){
            return output(res, [], true, err, 500);
        } else {
            // res.header('Access-Control-Expose-Headers', token);
            // res.cookie( 'token', token);
            return output(res, {'token': token}, false, 'success', 200);
        }
    });
}





