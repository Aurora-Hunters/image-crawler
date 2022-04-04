import { ImageSource } from '../domain/imageSource';
import { Task } from '../utils/task';
import { VideoShow } from '../utils/videoShow';
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.BOT_TOKEN);

/**
 *
 */
export class ImageCrawler {
  public sources: ImageSource[];

  /**
   * @param sources
   */
  constructor(sources: ImageSource[]) {
    this.sources = sources;
  }

  /**
   *
   */
  public init(): void {
    /**
     * Set up scheduled task "Download image"
     */
    const taskDownload = new Task(async () => {
      /**
       * Register crawlers
       */
      for (const source of this.sources) {
        console.log(`Download ${source.id}`);

        try {
          await source.download();
        } catch (e) {
          console.error(e);
        }
      }
    }, '0 * * * * *');

    taskDownload.register();

    // ---

    /**
     * Set up scheduled task "Build movie"
     */
    const taskBuild = new Task(async () => {
      const medias: {type: string, media: string, caption?: string}[]  = [];

      for (const source of this.sources) {
        console.log(`Movie for ${source.id}`);
        try {
          const imagesList = await source.getImages();

          if (imagesList.length > 7) {
            const videoShow = new VideoShow(imagesList);

            const videoPath = await videoShow.generate();

            medias.push({
              type: 'video',
              media: `${videoPath}`,
            });
          }
        } catch (e) {
          console.error(e);
        }
      }

      if (medias.length) {
        bot.sendMediaGroup(process.env.CHANNEL_ID, medias);
      }
    }, '0 0 9 * * *');
    // }, '0 * * * * *');

    taskBuild.register();
  }
}
