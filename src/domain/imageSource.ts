import Downloader from '../utils/downloader';
import path from 'path';
import fs from 'fs';

/**
 * Image source entity
 */
export class ImageSource {
  /**
   * ImageSource constructor
   *
   * @param id
   * @param name
   * @param link
   */
  constructor(
    public id: string,
    public name: string,
    public link: string
  ) {}

  /**
   *
   */
  public async download(): Promise<void> {
    const sourseUrl = this.link;
    const directoryName = this.id;

    await Downloader.save(sourseUrl, directoryName);

    return;
  }

  /**
   * @param lastHours
   */
  public async getImages(lastHours = 10): Promise<string[]> {
    const directoryName = this.id;
    const filesDir = path.join(Downloader.getBaseDir(), directoryName);
    const date = new Date();
    const startDate = date.getTime() - lastHours * (60*60*1000);

    const files = fs.readdirSync(filesDir);

    /**
     * Filter files not older "startDate"
     */
    return files
      .filter(file => {
        if (['latest.jpg', 'list.txt', 'timelapse.mp4'].includes(file)) {
          return false;
        }

        const stat = fs.statSync(path.join(filesDir, file));

        return stat.ctimeMs > startDate;
      })
      .map(filename => {
        return path.join(filesDir, filename);
      })
      .slice(0, -1);
  }
}
