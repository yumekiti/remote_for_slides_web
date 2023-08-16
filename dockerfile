FROM node:18.17.1-alpine AS builder

WORKDIR /usr/local/app

COPY . .

RUN yarn --frozen-lockfile && \
    yarn build

ENV PORT=80

CMD [ "yarn", "start" ]
