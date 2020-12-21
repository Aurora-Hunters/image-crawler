const fs = require('fs');
const path = require('path');

const DIR_PATH = path.join(__dirname, '..', 'images');

module.exports = () => {
    if (!fs.existsSync(DIR_PATH)) {
        fs.mkdirSync(DIR_PATH, { recursive: true });
    }

    return DIR_PATH;
}
