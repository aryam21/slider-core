'use strict';

const db = require("../models");
const User = db.User;

const output = require('../helpers/generateOutput');


const login = async (req, res) => {
    try {
        var presentations = await Presentation
            .findAll({
                where: {
                    user_id: req.data.userId
                },
                attributes: ['id', 'title', 'is_private', 'secret_key', 'createdAt' ],
                include: [{
                    model: File,
                    as: 'presentation_file',
                    attributes: ['id', 'path', 'size', 'mime' ],
                }],
                offset: req.params.offset,
                limit: 10,
                order: [
                    ['createdAt', 'ASC'],
                ],
            });

        return output(res,  { presentationsCount:presentationsCount, presentations:presentations } , false, 'Success', 200);

    }catch(error){

        return output(res, [], true, `Error: ${error}`, 500);
    }
}


module.exports = {
    login
};
