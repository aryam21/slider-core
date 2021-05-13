const fs = require('fs').promises;
const path = require('path');

module.exports = async function moveFile(oldPath, newPath) {
    await fs.mkdir(path.dirname(newPath), { recursive: true });
    return fs.rename(oldPath, newPath);
}
