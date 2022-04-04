/**
 * Input source item for the config
 */
export type SourceItem = {
  /**
   * Source identifier
   */
  id: string;

  /**
   * Source name
   */
  name: string;

  /**
   * Source link
   */
  link: string;
};

export const sourceList: SourceItem[] = [
  {
    id: 'svalbard',
    name: 'Svalbard',
    link: 'https://fox.phys.uit.no/ASC/BACC5.jpg',
  },
  {
    id: 'kevo',
    name: 'Kevo',
    link: 'https://space.fmi.fi/MIRACLE/ASC/ASC_keograms/tmp_KEV_keo/Allsky_KEVO.jpg',
  },
  {
    id: 'sodankyla',
    name: 'Sodankyla',
    link: 'https://www.sgo.fi/Data/RealTime/Kuvat/UCL.jpg',
  },
  {
    id: 'porjus-north',
    name: 'Porjus North',
    link: 'https://uk.jokkmokk.jp/photo/nr4/latest.jpg',
  },
  {
    id: 'porjus-west',
    name: 'Porjus West',
    link: 'https://uk.jokkmokk.jp/photo/nr3/latest.jpg',
  },
  {
    id: 'porjus-east',
    name: 'Porjus East',
    link: 'https://uk.jokkmokk.jp/photo/nr5/latest.jpg',
  },
  {
    id: 'hankasalmi',
    name: 'Hankasalmi',
    link: 'https://www.ursa.fi/yhd/sirius/sivut/kuvat/ImageLastFTP_AllSKY.jpg',
  },
  {
    id: 'tampere',
    name: 'Tampere',
    link: 'https://www.ursa.fi/yhd/tampereenursa/Pics/latest_CAM-20.jpg',
  },
  {
    id: 'pori',
    name: 'Pori',
    link: 'https://karhunvartijat.fi/allsky/images/image-resize.jpg',
  },
];
