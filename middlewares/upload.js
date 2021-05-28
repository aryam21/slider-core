require('dotenv').config();

const multer = require("multer");
const path = require("path");
const util = require("util");
const fs = require("fs");

const fileFilter = (req, file, cb, res) => {
    const filetypes = /png|zip|pdf/;
    const extname = filetypes.test(path.extname(file.originalname));
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb("Incorrect file type, please only upload PNG,PDF,ZIP formatted files.", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `${__basedir}/${process.env.FILES_STORAGE_TMP}/`;
        fs.exists(dir, exist => {
            if (!exist) {
                return fs.mkdir(dir, error => cb(error, dir));
            }
            return cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: fileFilter, limits: {fileSize: parseInt(process.env.UPLOAD_FILE_MAX_SIZE || 20000000 )}});

module.exports = uploadFile;
