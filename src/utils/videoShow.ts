// import videoshow from 'videoshow';

import ffmpeg from './ffmpeg';
import path from 'path';
import fs from 'fs';

const VIDEO_EXT = 'mp4';
const INPUT_FPS = 12;

/**
 *
 */
export class VideoShow {
  /**
   * List of images
   */
  public images: string[];

  public options: Record<string, string | number | boolean>;

  /**
   * @param images
   */
  constructor(images: string[]) {
    this.images = images;

    this.options = {
      fps: 30,
      loop: 0.12, // seconds
      transition: false,
      videoBitrate: 1024,
      videoCodec: 'libx264',
      size: '?x480',
      // audioBitrate: '128k',
      // audioChannels: 2,
      format: 'mp4',
      pixelFormat: 'yuv420p',
    };
  }

  /**
   * @param customOptions
   */
  public overrideOptions(customOptions: Record<string, string | number | boolean> = {}): void {
    this.options = {
      ...this.options,
      ...customOptions,
    };
  }

  /**
   *
   */
  public async generate(): Promise<string> {
    const fileDir = path.dirname(this.images[0]);
    const videoName = 'timelapse.mp4';
    const videoPath = path.join(fileDir, videoName);

    const LISTFILENAME = path.join(fileDir, 'list.txt');

    let list = '';

    this.images.forEach(file => {
      if (!fs.existsSync(file)) {
        return;
      }

      list += `file '${file}'\n`;
    });

    await fs.writeFileSync(LISTFILENAME, list);

    return new Promise((resolve, reject) => {
      try {
        ffmpeg(LISTFILENAME)
          .inputOptions([
            '-f concat',
            '-safe 0',
          ])
          .size(`?x480`)
          .videoFilter([
            {
              filter: 'deflicker',
              options: {
                size: 7,
              },
            },
          ])
          .outputOption([
            '-y',
            '-pix_fmt yuv420p',
          ])
          .inputFPS(INPUT_FPS)
          .fps(30)
          .videoCodec(VIDEO_EXT === 'mp4' ? 'libx264' : '')
          .toFormat(VIDEO_EXT)
          .on('start', function (commandLine) {
            console.log('Spawned Ffmpeg with command: ' + commandLine);
          })
          .on('progress', progress => {
            const percentage = Math.round(progress.frames / (this.images.length * 30 / INPUT_FPS) * 99);

            console.log('Processing: ' + percentage + '% done');
          })
          .on('end', async () => {
            console.log('Transcoding succeeded !');

            try {
              fs.unlinkSync(LISTFILENAME);
            } catch (e) {}

            resolve(videoPath);
          })
          .on('error', function (err) {
            reject(err);
          })
          .save(videoPath);


        // videoshow(this.images, this.options)
        //   .save(videoPath)
        //   .on('error', reject)
        //   .on('end', resolve);
      } catch (e) {
        reject(e);
      }
    });
  }
}
