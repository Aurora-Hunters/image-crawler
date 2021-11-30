#!/bin/bash

DOWNLOADS_DIR=$(dirname "$0")/images

mkdir -p $DOWNLOADS_DIR
chmod 777 $DOWNLOADS_DIR

declare -a SOURCES=(
   "NOR-78-Longyearbyen http://kho.unis.no/Quicklooks/ZWO/Allsky.jpg"
   "NOR-78-Svalbard http://kho.unis.no/Quicklooks/kho_sony.png"
   "NOR-69-Skibotn-1 https://fox.phys.uit.no/ASC/Latest_ASC01.png"
   "NOR-69-Skibotn-2 https://fox.phys.uit.no/ASC/BACC5.jpg"
   "NOR-69-Ramfjord https://tromsoe-ai.cei.uec.ac.jp/~nanjo/public/aurora_alert/latest.jpg"

   "FIN-69-Kevo https://space.fmi.fi/MIRACLE/ASC/ASC_keograms/tmp_KEV_keo/Allsky_KEVO.jpg"
   "FIN-68-Muonio https://aurorasnow.fmi.fi/public_service/images/latest_MUO.jpg"
   "FIN-67-Sodankylä https://www.sgo.fi/Data/RealTime/Kuvat/UCL.jpg"
   "FIN-62-Nyrölä http://nyrola.jklsirius.fi/allsky/image-resize.jpg"
   "FIN-62-Hankasalmi https://www.ursa.fi/yhd/sirius/sivut/kuvat/ImageLastFTP_AllSKY.jpg"
   "FIN-61-Tampere https://www.ursa.fi/yhd/tampereenursa/Pics/latest_CAM-20.jpg"
   "FIN-61-Pori https://karhunvartijat.fi/allsky/images/image-resize.jpg"
   "FIN-60-Metsähovi https://space.fmi.fi/MIRACLE/RWC/latest_HOV.jpg"

   "SWE-67-Kiruna https://www.irf.se/alis/allsky/krn/latest_medium.jpeg"
   "SWE-66-Porjus-N https://uk.jokkmokk.jp/photo/nr4/latest.jpg"
   "SWE-66-Porjus-W https://uk.jokkmokk.jp/photo/nr3/latest.jpg"
   "SWE-66-Porjus-E https://uk.jokkmokk.jp/photo/nr5/latest.jpg"

#  "kiruna https://aurorainfo.eu/aurora-live-cameras/kiruna-sweden-all-sky-aurora-live-camera.jpg"
#  "svalbard https://aurorainfo.eu/aurora-live-cameras/svalbard-norway-all-sky-aurora-live-camera.jpg"
#  "abisko https://aurorainfo.eu/aurora-live-cameras/abisko-lights-over-lapland-sweden-aurora-live-camera.jpg"
#  "abisko-east https://aurorainfo.eu/aurora-live-cameras/abisko-lights-over-lapland-sweden-aurora-live-camera-east.jpg"
#  "porjus-north https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-north-view-sweden-aurora-live-camera.jpg"
#  "porjus-west https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-west-view-aurora-live-camera.jpg"
#  "porjus-east https://aurorainfo.eu/aurora-live-cameras/porjus-sweden-east-view-sweden-aurora-live-camera.jpg"
#  "skibotn https://aurorainfo.eu/aurora-live-cameras/skibotn-norway-all-sky-aurora-live-camera.jpg"
#  "ramfjordmoen https://aurorainfo.eu/aurora-live-cameras/ramfjordmoen-norway-all-sky-aurora-live-camera.jpg"
#  "sodankyla https://aurorainfo.eu/aurora-live-cameras/sodankyla-finland-all-sky-aurora-live-camera.jpg"
#  "hankasalmi https://aurorainfo.eu/aurora-live-cameras/hankasalmi-finland-all-sky-aurora-live-camera.jpg"
#  "tesis https://tesis.lebedev.ru/upload_test/files/fc.png"
#  "swpc-solar-synoptic-map https://services.swpc.noaa.gov/images/synoptic-map.jpg"
#
#  "solar-0094 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0094.jpg"
#  "solar-0131 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0131.jpg"
#  "solar-0171 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg"
#  "solar-0193 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg"
#  "solar-0211 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0211.jpg"
#  "solar-0304 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg"
#  "solar-0335 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0335.jpg"
#  "solar-1600 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_1600.jpg"
#  "solar-1700 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_1700.jpg"
#  "solar-HMIIF https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIIF.jpg"
#  "solar-HMIBC https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_HMIBC.jpg"
#  "solar-211193171 https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_211193171.jpg"
#
#  "lasco-c2 https://services.swpc.noaa.gov/images/animations/lasco-c2/latest.jpg"
#  "lasco-c3 https://services.swpc.noaa.gov/images/animations/lasco-c3/latest.jpg"
#
#  "stereo-195 https://stereo.gsfc.nasa.gov/beacon/latest_256/ahead_euvi_195_latest.jpg"
#  "stereo-171 https://stereo.gsfc.nasa.gov/beacon/latest_256/ahead_euvi_171_latest.jpg"
#  "stereo-284 https://stereo.gsfc.nasa.gov/beacon/latest_256/ahead_euvi_284_latest.jpg"
#  "stereo-304 https://stereo.gsfc.nasa.gov/beacon/latest_256/ahead_euvi_304_latest.jpg"
)

for i in "${SOURCES[@]}"
do
   vars=($i)

   IMAGE_NAME=$(date '+%Y-%m-%d-%H-%M-%S').jpg

   IMAGE_PATH=$DOWNLOADS_DIR/${vars[0]}/$IMAGE_NAME
   IMAGE_LATEST_PATH=$DOWNLOADS_DIR/${vars[0]}/latest.jpg

   echo "Downloading $i"
   echo "To: $IMAGE_PATH"

   curl ${vars[1]} --connect-timeout 10 --create-dirs --output $IMAGE_PATH && rm $IMAGE_LATEST_PATH && ln -sf $IMAGE_NAME $IMAGE_LATEST_PATH

   chmod 777 $IMAGE_PATH $IMAGE_LATEST_PATH
done
