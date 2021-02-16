#!/bin/bash

ABSOLUTE_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOWNLOADS_DIR=$ABSOLUTE_PATH/images
ARCHIVES_DIR=$ABSOLUTE_PATH/archives

rm -rf $ARCHIVES_DIR
mkdir -p $ARCHIVES_DIR
chmod 777 $ARCHIVES_DIR

declare -a SOURCES=(
  "kiruna https://aurorainfo.eu/aurora-live-cameras/kiruna-sweden-all-sky-aurora-live-camera.jpg"
  "svalbard https://aurorainfo.eu/aurora-live-cameras/svalbard-norway-all-sky-aurora-live-camera.jpg"
#  "abisko https://aurorainfo.eu/aurora-live-cameras/abisko-lights-over-lapland-sweden-aurora-live-camera.jpg"
  "abisko-east https://aurorainfo.eu/aurora-live-cameras/abisko-lights-over-lapland-sweden-aurora-live-camera-east.jpg"
  "porjus-north https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-north-view-sweden-aurora-live-camera.jpg"
  "porjus-west https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-west-view-aurora-live-camera.jpg"
#  "porjus-east https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-east-view-sweden-aurora-live-camera.jpg"
#  "skibotn https://aurorainfo.eu/aurora-live-cameras/skibotn-norway-all-sky-aurora-live-camera.jpg"
  "ramfjordmoen https://aurorainfo.eu/aurora-live-cameras/ramfjordmoen-norway-all-sky-aurora-live-camera.jpg"
  "sodankyla https://aurorainfo.eu/aurora-live-cameras/sodankyla-finland-all-sky-aurora-live-camera.jpg"
  "hankasalmi https://aurorainfo.eu/aurora-live-cameras/hankasalmi-finland-all-sky-aurora-live-camera.jpg"

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
  "solar-211193171 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_211193171.jpg"

  "lasco-c2 https://services.swpc.noaa.gov/images/animations/lasco-c2/latest.jpg"
  "lasco-c3 https://services.swpc.noaa.gov/images/animations/lasco-c3/latest.jpg"

  "geo-density https://services.swpc.noaa.gov/images/animations/geospace/density/latest.png"
  "geo-velocity https://services.swpc.noaa.gov/images/animations/geospace/velocity/latest.png"
  "geo-pressure https://services.swpc.noaa.gov/images/animations/geospace/pressure/latest.png"
  "geo-polar-lt https://services.swpc.noaa.gov/images/animations/geospace/polar_lt/latest.png"
  "geo-global https://services.swpc.noaa.gov/images/animations/geospace/global/latest.png"
)

for i in "${SOURCES[@]}"
do
  vars=($i)
  ARCHIVE_PATH=$ARCHIVES_DIR/${vars[0]}.tar
  echo "Creating archive for ${vars[0]}"

  cd $DOWNLOADS_DIR
  find ${vars[0]}/*.jpg -type f -newermt "-24 hours" -ls -exec tar -rvf $ARCHIVE_PATH {} \;

  echo "Done $ARCHIVE_PATH"
  chmod 777 $ARCHIVE_PATH
done


declare -a SOURCES_WEEK=(
  "tesis https://tesis.lebedev.ru/upload_test/files/fc.png"
  "swpc-solar-synoptic-map https://services.swpc.noaa.gov/images/synoptic-map.jpg"
  "enlil https://services.swpc.noaa.gov/images/animations/enlil/latest.jpg"
)

for i in "${SOURCES_WEEK[@]}"
do
  vars=($i)
  ARCHIVE_PATH=$ARCHIVES_DIR/${vars[0]}.tar
  echo "Creating archive for ${vars[0]}"

  cd $DOWNLOADS_DIR

  find ${vars[0]}/*.jpg -type f -newermt "-7 days" -ls -exec tar -rvf $ARCHIVE_PATH {} \;

  echo "Done $ARCHIVE_PATH"
  chmod 777 $ARCHIVE_PATH
done

