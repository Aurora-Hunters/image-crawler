const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const getImagesDir = require('./tools/get-images-dir');
const downloadImage = require('./tools/download-image');

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
        name: 'solar-eit_171',
        url: 'https://sohowww.nascom.nasa.gov/data/realtime/eit_171/512/latest.jpg'
    },
    {
        name: 'solar-eit_195',
        url: 'https://sohowww.nascom.nasa.gov/data/realtime/eit_195/512/latest.jpg'
    },
    {
        name: 'solar-eit_284',
        url: 'https://sohowww.nascom.nasa.gov/data/realtime/eit_284/512/latest.jpg'
    },
    {
        name: 'solar-eit_304',
        url: 'https://sohowww.nascom.nasa.gov/data/realtime/eit_304/512/latest.jpg'
    },
    {
        name: 'solar-hmi_igr',
        url: 'https://sohowww.nascom.nasa.gov/data/realtime/hmi_igr/512/latest.jpg'
    },
    {
        name: 'solar-hmi_mag',
        url: 'https://sohowww.nascom.nasa.gov/data/realtime/hmi_mag/512/latest.jpg'
    },
    {
        name: 'solar-c2',
        url: 'https://sohowww.nascom.nasa.gov/data/realtime/c2/512/latest.jpg'
    },
    {
        name: 'solar-c3',
        url: 'https://sohowww.nascom.nasa.gov/data/realtime/c3/512/latest.jpg'
    }
];

const getLatestImage = function (url, pathToSave) {
    url = `${url}?t=${Date.now()}`;

    return downloadImage(url, pathToSave);
};

const generatePath = function (name) {
    const date = new Date();
    const datestamp = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}-${date.getHours() < 10 ? '0' : ''}${date.getHours()}-${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;

    const imagesDir = getImagesDir();

    if (!fs.existsSync(path.join(imagesDir, name))) {
        fs.mkdirSync(path.join(imagesDir, name), { recursive: true });
    }

    return path.join(imagesDir, name, `${datestamp}.jpg`);
};

cron.schedule('* * * * *', async () => {
    for (let i = 0; i < SOURCES.length; i++) {
        console.log(`Downloading... ${SOURCES[i].name} ${SOURCES[i].url}`);

        await getLatestImage(SOURCES[i].url, generatePath(SOURCES[i].name));
    }
});
