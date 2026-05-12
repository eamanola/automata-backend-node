# base
# use non alpine for mongodb-memory-server
FROM node:24 AS base
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update
RUN apt install git
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .
RUN mkdir -p -m 0700 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN --mount=type=ssh HUSKY=0 pnpm i

# test specific
# cache memory-server-binaries before src/
FROM base AS prod-base
# dev uses src as volumes
COPY src src

# lint
FROM prod-base AS lint
COPY eslint.config.mjs .
RUN pnpm run lint

# test
FROM lint AS test
COPY jest jest
COPY jest.config.cjs .
COPY src/*.test.js src/
RUN pnpm test --passWithNoTests

# build
FROM test AS build
COPY webpack.config.cjs .
RUN pnpm run build

# prod
FROM node:24-alpine AS prod
WORKDIR /app
COPY package.json .
RUN HUSKY=0 pnpm i --prod
COPY --from=build /app/dist/index.bundle.js dist/index.bundle.js
USER node
CMD npm start

# dev
FROM base AS dev
USER node
CMD npm run dev
