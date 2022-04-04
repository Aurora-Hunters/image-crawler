import dotenv from 'dotenv';

dotenv.config();

import { ImageCrawler } from './app/imageCrawler';
import { ImageSource } from './domain/imageSource';

/**
 * Import list of cameras
 */
import { SourceItem, sourceList } from '../data/sourceList';

/**
 * Load sources
 */
const sources: ImageSource[] = sourceList.map((item: SourceItem) => {
  return new ImageSource(item.id, item.name, item.link);
});

/**
 * Create a new app
 */
const imageCrawler = new ImageCrawler(sources);

/**
 * Initialize the app
 */
imageCrawler.init();

