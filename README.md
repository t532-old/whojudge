# whojudge
A Lightweight Online Judge System. WIP

## Dependencies
- Dependencies of [Alice](https://github.com/sfls/alice)
- Node.js with ES2017 Support (Better if > v12)
- NPM (included in Node)
- Docker
- Docker compose

## Security
- Specify a **Prisma Management API Secret** in `docker-compose.yml`, replace `__YOUR_SECRET_HERE__`.
    - Also, set it as the value of the environment variable `PRISMA_MANAGEMENT_API_SECRET`.
- Specify **Database Root Username & Password** in `docker-compose.yml`, replace `__YOUR_DB_USERNAME/PASSWORD__`.
- Specify a **Prisma API Secret** in `prisma.yml`, replace `__YOUR_SECRET_HERE__`.

## Build & Run
```sh
npm install
npm start
```
