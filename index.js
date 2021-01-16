const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const getImagesDir = require('./tools/get-images-dir');
const downloadImage = require('./tools/download-image');
const createVideo = require('./tools/create-video');
const removeDuplicatedFiles = require('./tools/delete-duplicate-files');

const SOLAR_SHOTS = [
    '0094',
    '0131',
    '0171',
    '0193',
    '0211',
    '0304',
    '0335',
    '1600',
    '1700',
    'HMIIF',
    'HMIBC'
]

const SOURCES = [
    {
        name: 'svalbard',
        url: 'https://aurorainfo.eu/aurora-live-cameras/svalbard-norway-all-sky-aurora-live-camera.jpg'
    },
    {
        name: 'kiruna',
        url: 'https://aurorainfo.eu/aurora-live-cameras/kiruna-sweden-all-sky-aurora-live-camera.jpg'
    },
    {
        name: 'porjus-north',
        url: 'https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-north-view-sweden-aurora-live-camera.jpg'
    },
    {
        name: 'porjus-west',
        url: 'https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-west-view-aurora-live-camera.jpg'
    },
    {
        name: 'porjus-east',
        url: 'https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-east-view-sweden-aurora-live-camera.jpg'
    },
    {
        name: 'abisko',
        url: 'https://aurorainfo.eu/aurora-live-cameras/abisko-lights-over-lapland-sweden-aurora-live-camera.jpg'
    },
    {
        name: 'abisko-east',
        url: 'https://aurorainfo.eu/aurora-live-cameras/abisko-lights-over-lapland-sweden-aurora-live-camera-east.jpg'
    },
    {
        name: 'skibotn',
        url: 'https://aurorainfo.eu/aurora-live-cameras/skibotn-norway-all-sky-aurora-live-camera.jpg'
    },
    {
        name: 'ramfjordmoen',
        url: 'https://aurorainfo.eu/aurora-live-cameras/ramfjordmoen-norway-all-sky-aurora-live-camera.jpg'
    },
    {
        name: 'tesis',
        url: 'https://tesis.lebedev.ru/upload_test/files/fc.png'
    },
    {
        name: 'geospace-1-day',
        url: 'https://services.swpc.noaa.gov/images/geospace-1-day.png'
    },
    {
        name: 'swpc-solar-synoptic-map',
        url: 'https://services.swpc.noaa.gov/images/synoptic-map.jpg'
    },
];

SOLAR_SHOTS.forEach(element => {
    SOURCES.push({
        name: `solar-${element}`,
        url: `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_${element}.jpg`
    })
})

const getLatestImage = function (url, pathToSave) {
    url = `${url}?t=${Date.now()}`;

    return downloadImage(url, pathToSave);
};

const generateImagesPath = function (name) {
    const date = new Date();
    const datestamp = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}-${date.getHours() < 10 ? '0' : ''}${date.getHours()}-${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;

    const imagesDir = getImagesDir();

    if (!fs.existsSync(path.join(imagesDir, name))) {
        fs.mkdirSync(path.join(imagesDir, name), { recursive: true });
    }

    return path.join(imagesDir, name, `${datestamp}.jpg`);
};

const generateGifsPath = function (name) {
    const gifsDir = path.join(__dirname, 'gifs');

    if (!fs.existsSync(path.join(gifsDir, name))) {
        fs.mkdirSync(path.join(gifsDir, name), { recursive: true });
    }

    return path.join(gifsDir, name, `latest.mp4`);
};

/**
 * Get images
 */
cron.schedule('* * * * *', async () => {
    for (let i = 0; i < SOURCES.length; i++) {
        console.log(`Downloading... ${SOURCES[i].name} ${SOURCES[i].url}`);

        const imagePath = generateImagesPath(SOURCES[i].name);

        await getLatestImage(SOURCES[i].url, imagePath);

        removeDuplicatedFiles(path.dirname(imagePath));

        try {
            fs.unlinkSync(path.join(path.dirname(imagePath), '.DS_Store'))
        } catch (e) {}
    }
});

/**
 * Create gifs
 */

const createGifs = async () => {
    for (let i = 0; i < SOURCES.length; i++) {
        const gifPath = generateGifsPath(SOURCES[i].name);
        const imagesPath = path.join(__dirname, 'images', SOURCES[i].name)

        try {
            await fs.readdir(imagesPath, async function (err, files) {
                if (!files) return;

                console.log(`Creating a gif for ${SOURCES[i].name}`);

                files = files.map(function (fileName) {
                    return {
                        name: fileName,
                        time: fs.statSync(imagesPath + '/' + fileName).mtime.getTime()
                    };
                })
                    .sort(function (a, b) {
                        return a.time - b.time;
                    })
                    .map(function (v) {
                        return `${imagesPath}/${v.name}`;
                    })
                    .slice(-150);

                if (files.length > 1) {
                    files.pop();
                }

                if (files.length > 0) {
                    createVideo(files, gifPath)
                        .then(console.log)
                        .catch(console.error);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }
};

(async () => {
    await createGifs();

    cron.schedule('*/30 * * * *', createGifs);
})();


