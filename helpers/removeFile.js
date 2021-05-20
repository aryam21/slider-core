const fs = require('fs').promises;

module.exports = async function removeFile(path) {
    try {
        fs.unlink(path)
        console.log("File removed");
    } catch(err) {
        console.error(err)
    }
}
