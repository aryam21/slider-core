'use strict';

const db = require("../models");
const Presentation = db.Presentation;
const User = db.User;
const File = db.File;
const unzipper = require('unzipper');
const fs = require('fs');
const decompress = require("decompress");
const path = require("path");
const output = require('../helpers/generateOutput');
const moveFile = require('../helpers/moveFile');
const removeFile = require('../helpers/removeFile');

const store = async (req, res) => {

    const t = await db.sequelize.transaction();

    try {

        if (req.files.length <= 0) {
            return output(res, [], true, 'You must select at least 1 file.', 400);
        }

        var userId = req.data.userId;

        var presentation = await Presentation.create({
            user_id: userId,
            title: req.body.title,
            is_private: req.body.is_private,
            secret_key: req.body.is_private ? Math.random().toString().substring(2, 8) : null,
        },{
            transaction: t
        });

        var presentationId = presentation.dataValues.id;

        if  (req.files[0].mimetype === 'application/x-zip-compressed') {
            return output(res, [], false, 'Unhandled zip format.', 400);
        }

        if (req.files[0].mimetype == 'application/zip') {
                fs.createReadStream(req.files[0].path)
                    .pipe(unzipper.Parse())
                    .on('entry', async function (entry) {
                        let fileName = new Date().getTime();
                        if (entry.type == 'File') {
                            await entry.pipe(fs.createWriteStream(`${req.files[0].destination}/${fileName}.png`));
                            let mimeType = entry.path.split('.').pop();
                            let size = entry.vars.uncompressedSize;
                            let oldPath = `public/uploads/tmp/${fileName}.${mimeType}`;
                            let newPath = `public/uploads/${userId}/${presentationId}/${fileName}.${mimeType}`;
                            await moveFile(oldPath, newPath);
                            let newPathDb = `uploads/${userId}/${presentationId}/${fileName}.${mimeType}`;
                            await File.create({
                                presentation_id: presentationId,
                                path: newPathDb,
                                name:`${fileName }.${mimeType}`,
                                size: size ,
                                mime: mimeType,
                            })
                        }
                    });
                removeFile(req.files[0].path);
                await t.commit();
                return output(res, [], false, 'File has been uploaded from.', 200);
        }


        for (const file of req.files) {
            let mimeType = file.mimetype.split('/').pop();
            let fileName = new Date().getTime();
            let oldPath = `public/uploads/tmp/${file.filename}`;
            let newPath = `public/uploads/${userId}/${presentationId}/${fileName}.${mimeType}`;
            moveFile(oldPath, newPath);
            let newPathDb = `uploads/${userId}/${presentationId}/${fileName}.${mimeType}`;
            await File.create({
                presentation_id: presentationId,
                path: newPathDb,
                name: `${fileName}.${mimeType}`,
                size: file.size,
                mime: mimeType,
            },{
                transaction: t
            });
        }
        await t.commit();
        return output(res, [], false, 'File has been uploaded.', 200);
    }
    catch (error) {
        await t.rollback();
        return output(res, [], true, `Error when trying upload files: ${error}`, 500);
    }
};

const getPresentByOffset = async (req, res) => {
    try {
        const presentationsCount = await Presentation.count({
            where: {
                user_id: req.data.userId
            },
        });
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
                offset: (req.params.offset-1)*10,
                limit: 10,
                order: [
                    ['createdAt', 'DESC'],
                ],
            });

        return output(res, { presentationsCount:presentationsCount, presentations:presentations } , false, 'Success', 200);

    }catch(error){

        return output(res, [], true, `Error: ${error}`, 500);
    }
};

// const getPresentsByUser = async (req, res) => {
//     try {
//         const presentationsCount = await Presentation.count({});
//         var presentations = await Presentation
//             .findAll({
//                 where: {
//                     user_id: req.data.userId
//                 },
//                 attributes: ['id', 'title', 'is_private', 'secret_key', 'createdAt' ],
//                 include: [{
//                     model: File,
//                     as: 'presentation_file',
//                     attributes: ['id', 'path', 'size', 'mime' ],
//                 }],
//                 offset: 1,
//                 limit: 10,
//                 order: [
//                     ['createdAt', 'ASC'],
//                 ],
//             });

//         return output(res,  { 'presentationsCount': presentationsCount,  'presentations': presentations} , false, 'Success', 200);

//     }catch(error){

//         return output(res, [], true, `Error: ${error}`, 500);
//     }
// };

const getPresentById = async (req, res) => {
    try {
        var presentation = await Presentation.findByPk(req.params.id,
            {
                attributes: ['id', 'title', 'is_private', 'secret_key' ],
                include: [{
                    model: File,
                    as: 'presentation_file',
                    attributes: ['id', 'path', 'size', 'mime' ],
                }]
            });

        if (presentation) {
            var link = req.protocol + '://' + req.get('host') + req.originalUrl;
            return output(res,  [{'link':link, 'secret_key':presentation.dataValues.secret_key}] , false, 'Success', 200);
        }
        return output(res,  [] , true, 'The resource not found', 404);

    } catch (error) {
        return output(res, [], true, `Error: ${error}`, 500);
    }
};

const getPresentBySlug = async (req, res) => {
    try {
        var presentation = await Presentation.findOne({
            where: {
                secret_key: req.params.slug,
                user_id: req.data.userId
            },
            attributes: ['id', 'title', 'is_private', 'secret_key' ],
            include: [{
                model: File,
                as: 'presentation_file',
                attributes: ['id', 'path', 'size', 'mime' ],
            }]
        });

        if (presentation == null) {
            return output(res,  presentation , false, 'The resource not found', 404);
        }

        return output(res,  presentation , false, 'Success', 200);

    } catch (error) {
        return output(res, [], true, `Error: ${error}`, 500);
    }
};

module.exports = {
    // getPresentsByUser,
    getPresentBySlug,
    getPresentById,
    getPresentByOffset,
    store,
};
