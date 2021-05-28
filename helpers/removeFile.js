const fs = require('fs').promises;

module.exports = async function removeFile(path) {
    try {
        await fs.unlink(path)
    } catch(err) {
        console.error(err)
    }
};
