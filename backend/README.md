
## Database setup

First step to start working with application is creating environment file in root directory:

**.env**

```shell
DATABASE_URL=mongodb+srv://<USER_NAME>:<USER_PASSWORD>@cluster0.uq22wsx.mongodb.net/<DATABASE_NAME>
JWT_SECRET=<SECRET_KEY>
```

Replace next fields with your credentials:
* __USER_NAME__, 
* __USER_PASSWORD__,
* __DATABASE_NAME__,

then run next scripts:

```shell
pnpm run db:generate
```

```shell
pnpm run db:push
```

## API

Current port: **8080**

API Prefix: __v1/api__

## Docker

Add environment file next to docker-compose file.

**.env**

```shell
DATABASE_URL=mongodb+srv://<USER_NAME>:<USER_PASSWORD>@cluster0.uq22wsx.mongodb.net/<DATABASE_NAME>
JWT_SECRET=<SECRET_KEY>
```

Run *docker-compose* command with choosed file

```shell
docker-compose -f docker-compose.<type>.yml up --build -d 
```