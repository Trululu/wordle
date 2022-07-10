## Getting started

### Tech stack

- Postgres
- Nestjs
- Typescript
- Redis

### Techniques

- redis cache
- Auth with refresh and access token
- Auth and wordle microservices

### Requirements

- Node 14.x.x
- Npm 7.x.x
- Postgres 12.x
- Docker 20.x.

## Setting up the server

create an `.env` file with the variables on `.env.example`

run `npm i`

if there is not certs in certs folder run `node apps/auth/scripts/genAuthCerts.js`

## Running with Docker

- docker-compose build
- docker-compose up -d

## test api

npm run test

### Postman

can load postman files at /postman
