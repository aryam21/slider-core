// require('dotenv').config();
const jwt = require('jsonwebtoken');
const output = require('../helpers/generateOutput');

exports.checkTokenMW = (req, res, next) => {
    const bearerHeader = req.headers.authentication;
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        if (!token) {
            return output(res, {message: 'Not Authorized'}, true, err, 401);
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
            if (err && err.name == 'Timeout') {
                return output(res, {message: 'Token timeout'}, true, err, 401);
            }
            if(err) {
                return output(res, {message: 'Not Authorized'}, true, err, 401);
            } else {
                return req.data = data;
            }
        });
        next();
    } else {
        res.sendStatus(401);
    }
};

exports.signToken = (req, res, userId) => {
    jwt.sign({ userId: userId, email: req.body.email , googleId:req.body.googleId} , process.env.JWT_SECRET_KEY, {expiresIn:'1d'}, (err, token) => {
        if(err){
            return output(res, [], true, err, 500);
        } else {
            return output(res, {'token': token}, false, 'success', 200);
        }
    });
};
