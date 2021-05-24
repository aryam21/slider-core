const User = require('../models').User;
const authService = require('../services/AuthService');
const output = require('../helpers/generateOutput');

const login = async (req, res) => {
    var googleId = req.body.googleId;
    var email = req.body.email;
    var firstName = req.body.givenName;
    var lastName = req.body.familyName;
    var picture = req.body.imageUrl;
    try {
        var user = await User.findOrCreate({
            where: { google_id: googleId},
            defaults: {
                google_id:googleId,
                first_name: firstName,
                last_name:lastName,
                email:email,
                picture: picture
            }
        });
    } catch (e) {
        console.log(e);
    }
    authService.signToken(req, res, user[0].dataValues.id);
};
module.exports = {
    login,
};
