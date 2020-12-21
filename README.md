# node-docker-app

Skeleton for dokerized Node.js app

## How to run

Copy `example.env` file to `.env` and fill the gaps.

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