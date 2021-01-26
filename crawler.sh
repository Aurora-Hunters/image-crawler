#!/bin/bash

DOWNLOADS_DIR=images

declare -a SOURCES=(
  "kiruna https://aurorainfo.eu/aurora-live-cameras/kiruna-sweden-all-sky-aurora-live-camera.jpg"
  "svalbard https://aurorainfo.eu/aurora-live-cameras/svalbard-norway-all-sky-aurora-live-camera.jpg"
  "abisko https://aurorainfo.eu/aurora-live-cameras/abisko-lights-over-lapland-sweden-aurora-live-camera.jpg"
  "abisko-east https://aurorainfo.eu/aurora-live-cameras/abisko-lights-over-lapland-sweden-aurora-live-camera-east.jpg"
  "porjus-north https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-north-view-sweden-aurora-live-camera.jpg"
  "porjus-west https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-west-view-aurora-live-camera.jpg"
  "porjus-east https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-east-view-sweden-aurora-live-camera.jpg"
  "skibotn https://aurorainfo.eu/aurora-live-cameras/skibotn-norway-all-sky-aurora-live-camera.jpg"
  "ramfjordmoen https://aurorainfo.eu/aurora-live-cameras/ramfjordmoen-norway-all-sky-aurora-live-camera.jpg"
  "tesis https://tesis.lebedev.ru/upload_test/files/fc.png"
  "swpc-solar-synoptic-map https://services.swpc.noaa.gov/images/synoptic-map.jpg"

  "solar-0094 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0094.jpg"
  "solar-0131 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0131.jpg"
  "solar-0171 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg"
  "solar-0193 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg"
  "solar-0211 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0211.jpg"
  "solar-0304 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg"
  "solar-0335 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0335.jpg"
  "solar-1600 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_1600.jpg"
  "solar-1700 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_1700.jpg"
  "solar-HMIIF https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIIF.jpg"
  "solar-HMIBC https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIBC.jpg"
)

for i in "${SOURCES[@]}"
do
   vars=($i)

   IMAGE_PATH=$(dirname "$0")/$DOWNLOADS_DIR/${vars[0]}/$(date '+%Y-%m-%d-%H-%M-%S').jpg

   echo "Downloading $i"
   echo "To: $IMAGE_PATH"

   curl ${vars[1]}  --create-dirs --output $IMAGE_PATH
done
