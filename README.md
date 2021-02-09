# Image crawler

Get images from target urls regularly.

Keep an eye out for webcams or any other images that update occasionally. 

## Cron jobs

* * * * * /home/taly/image-crawler/crawler.sh
30 7 * * * /home/taly/image-crawler/archiver.sh
*/5 * * * * cd /home/taly/image-crawler/images && fdupes -rdN ./

<!--

### Development

Run with a local Node core

```
yarn start
```

or with a hot code reloading

```
yarn start:dev
```

### Production

Run a production container.

```
docker-compose up -d
```
