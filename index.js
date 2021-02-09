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
    'HMIBC',
    '211193171'
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
        name: 'sodankyla',
        url: 'https://aurorainfo.eu/aurora-live-cameras/sodankyla-finland-all-sky-aurora-live-camera.jpg'
    },
    {
        name: 'hankasalmi',
        url: 'https://aurorainfo.eu/aurora-live-cameras/hankasalmi-finland-all-sky-aurora-live-camera.jpg'
    },


    {
        name: 'lasco-c2',
        url: 'https://services.swpc.noaa.gov/images/animations/lasco-c2/latest.jpg'
    },
    {
        name: 'lasco-c3',
        url: 'https://services.swpc.noaa.gov/images/animations/lasco-c3/latest.jpg'
    },

    {
        name: 'enlil',
        url: 'https://services.swpc.noaa.gov/images/animations/enlil/latest.jpg'
    },

    {
        name: 'geo-density',
        url: 'https://services.swpc.noaa.gov/images/animations/geospace/density/latest.png'
    },
    {
        name: 'geo-velocity',
        url: 'https://services.swpc.noaa.gov/images/animations/geospace/velocity/latest.png'
    },
    {
        name: 'geo-pressure',
        url: 'https://services.swpc.noaa.gov/images/animations/geospace/pressure/latest.png'
    },
    {
        name: 'geo-polar-lt',
        url: 'https://services.swpc.noaa.gov/images/animations/geospace/polar_lt/latest.png'
    },
    {
        name: 'geo-global',
        url: 'https://services.swpc.noaa.gov/images/animations/geospace/global/latest.png'
    },

    // {
    //     name: 'geospace-1-day',
    //     url: 'https://services.swpc.noaa.gov/images/geospace-1-day.png'
    // },
    // {
    //     name: 'swpc-solar-synoptic-map',
    //     url: 'https://services.swpc.noaa.gov/images/synoptic-map.jpg'
    // },
    // {
    //     name: 'space-weather',
    //     url: 'https://services.swpc.noaa.gov/images/swx-overview-large.gif'
    // },
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
const getImages = async () => {

    for await (const sources of SOURCES) {
        console.log(`Downloading... ${sources.name} ${sources.url}`);

        const imagePath = generateImagesPath(sources.name);

        await getLatestImage(sources.url, imagePath);

        // await removeDuplicatedFiles(path.dirname(imagePath));

        // try {
        //     fs.unlinkSync(path.join(path.dirname(imagePath), '.DS_Store'))
        // } catch (e) {}
    }
}

const removeBadFiles = async (dirname) => {
    await removeDuplicatedFiles(dirname);

    try {
        fs.unlinkSync(path.join(path.dirname(imagePath), '.DS_Store'))
    } catch (e) {}
}


/**
 * Create gifs
 */

const createGifs = async () => {

    (async  () => {
        for (const source of SOURCES) {
            await composeGif(source);
        }
    })();

    function composeGif(source) {
        return new Promise(async (resolve, reject) => {
            const gifPath = generateGifsPath(source.name);
            const imagesPath = path.join(__dirname, 'images', source.name)

            try {
                await removeBadFiles(imagesPath);

                fs.readdir(imagesPath, function (err, files) {
                    if (!files) {
                        console.log('No files were found');
                        resolve();
                        return;
                    }

                    console.log(`Creating a gif for ${source.name}`);

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
                        .slice(-180, -1);

                    if (files.length > 1) {
                        files.pop();
                    }

                    if (files.length > 0) {
                        createVideo(files, gifPath)
                            .then(() => {
                                console.log('Done!');
                                resolve();
                            })
                            .catch(reject);
                    } else {
                        console.log('Files length not more 0');
                        resolve();
                    }
                });
            } catch (e) {
                console.error(reject);
            }
        });
    }
};

(async () => {
    // await getImages();
    // cron.schedule('* * * * *', getImages);

    // await createGifs();
    // cron.schedule('0 5 * * *', createGifs);
})();


