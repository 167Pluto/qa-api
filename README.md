## Description

A test API used for the QA test by 167Pluto.

## Installation

```bash
$ npm install
```

## Environment variables
```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD='examplePassword'
POSTGRES_DATABASE=qa-api-test
PORT=3000
# Dont change variables bellow
JWT_SECRET='O6P)PzJ2SiAzi='
TOKEN_EXPIRY_TIME=18000000
PASSWORD_SECRET='{iVlRt~~WYR~*9X'
```

## Migration
Test migration on local database
```bash
# Run migration
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage
Api documentation
```bash
# Swagger endpoint
$ localhost:3000/api
```
