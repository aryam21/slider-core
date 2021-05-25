const db = require("../models");
const Presentation = db.Presentation;
const File = db.File;

const output = require('../helpers/generateOutput');

const getPublicPresentationBySlug = async (req, res) => {
    try {
        var presentation = await Presentation.findOne({
            where: {
                secret_key: req.params.slug,
                is_private:false
            },
            attributes: ['id', 'title', 'is_private', 'secret_key' ],
            include: [{
                model: File,
                as: 'presentation_file',
                attributes: ['id', 'path', 'size', 'mime' ],
            }]
        });

        if (presentation == null) {
            return output(res,  presentation , true, 'The resource not found', 404);
        }

        return output(res,  presentation , false, 'Success', 200);

    } catch (error) {
        return output(res, [], true, `Error: ${error}`, 500);
    }
};

module.exports = {
    getPublicPresentationBySlug,
};
