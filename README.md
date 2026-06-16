Moved to [codeberg](https://codeberg.org/eamanola/automata-backend-node)

# automata-backend-node

A base environment setup & configurations for backend development, using node & express.

## includes

### docker setups for

- mongo
- redis
- test
- production
- dev

## usage & dev

- Add your app routes to src/app.js, or replace the file.
- update bin/* to use the components needed by the app
- other?

### .env

see see .env.sample for options

#### files referenced in setups

- .env.development.local,
- .env.test.local
- .env.production.local

### run

#### dev build

##### docker:

  ```
  ./bin/dev.sh
  ```

##### locally:

  ```
  pnpm run dev
  ```

#### production build

##### docker:

  ```
  ./bin/start.sh
  ```

##### locally:

```
  pnpm run build
  pnpm run start
```

## Other notes

### reserved endpoints

a preconfigured express app is provided. see [automata-app](https://github.com/eamanola/automata-app) for up to date reserved endpoints, and more details.

#### POST /signup

for creating new users

#### POST /login

for for authenticating users

#### /email-verification

for verifying email

#### GET /health

for server health
