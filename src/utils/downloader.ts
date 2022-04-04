import axios, { AxiosRequestConfig } from 'axios';
import Jimp from 'jimp';
import path from 'path';
import fs from 'fs';
import imghash from 'imghash';

const IMAGE_HEIGHT = 480;
const IMAGE_EXT = 'jpg';

/**
 *
 */
class Downloader {
  /**
   *
   */
  public static getBaseDir(): string {
    return path.join(__dirname, '..', '..', 'temp');
  }

  /**
   * @param sourceUrl
   * @param directory
   * @param subDirectory
   */
  public static async save(sourceUrl: string, subDirectory: string | string []): Promise<string> {
    const baseDirectory = Downloader.getBaseDir();

    if (typeof subDirectory === 'string') {
      subDirectory = [ subDirectory ];
    }

    const dir = path.join(baseDirectory, ...subDirectory);

    /**
     * Define axios config
     */
    const axiosConfig: AxiosRequestConfig = {
      url: sourceUrl,
      responseType: 'arraybuffer',
      headers: {
        'user-agent': 'TelegramBot (like TwitterBot)',
      },
    };

    /**
     * Download data
     */
    const response = await axios(axiosConfig);
    const binaryData = Buffer.from(response.data, 'binary');
    const imagePath = path.join(dir, `${Downloader.getDateString()}.${IMAGE_EXT}`);
    const symlinkPath = path.join(dir, `latest.${IMAGE_EXT}`);
    const isSymlinkExist = fs.existsSync(symlinkPath);

    // Saving resized file

    const image = await Jimp.read(binaryData);

    await image
      .resize(Jimp.AUTO, IMAGE_HEIGHT)
      .quality(90)
      .writeAsync(imagePath);

    // Check for an existed copy

    if (isSymlinkExist) {
      const imageHash = await imghash.hash(imagePath);
      const symlinkedFile = path.join(path.dirname(symlinkPath), fs.readlinkSync(symlinkPath));
      const symlinkedFileHash = await imghash.hash(symlinkedFile);

      if (imageHash === symlinkedFileHash) {
        /**
         * Remove fresh saved image
         */
        fs.rmSync(imagePath);

        /**
         * Return original file
         */
        return symlinkedFile;
      }

      fs.rmSync(symlinkPath);
    }

    // Create a symlink

    fs.symlinkSync(
      path.relative(path.dirname(symlinkPath), imagePath),
      symlinkPath
    );

    // Return path to image

    return imagePath;
  }

  /**
   *
   */
  private static getDateString(): string {
    const date = new Date();

    const YEAR = date.getFullYear();
    const MONTH = `${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}`;
    const DAY = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    const HOUR = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`;
    const MINUTE = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    const SECOND = `${date.getSeconds() < 10 ? '0' : ''}${date.getSeconds()}`;

    return `${YEAR}-${MONTH}-${DAY}-${HOUR}-${MINUTE}-${SECOND}`;
  }
}

export default Downloader;
