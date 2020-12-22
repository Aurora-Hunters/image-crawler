const crypto = require("crypto");
const fs = require("fs");

const folder = process.argv[2];
const absoluteFolder = `${__dirname}/${folder}`;

module.exports = (absoluteFolder) => {
    fs.readdir(absoluteFolder, (err, files) => {
        const map = {};

        files.forEach(filename => {
            const absoluteFilePath = `${absoluteFolder}/${filename}`;

            if (fs.existsSync(absoluteFilePath)) {
                const input = fs.createReadStream(absoluteFilePath);
                const hash = crypto.createHash("sha256");

                hash.setEncoding("hex");

                input.on("end", () => {
                    hash.end();
                    const hashValue = hash.read();

                    if (map[hashValue]) {
                        fs.unlinkSync(absoluteFilePath);
                    } else {
                        map[hashValue] = true;
                    }
                });

                input.pipe(hash);
            }
        });
    });
}
