FROM node:17-alpine

RUN mkdir /band_website
WORKDIR /band_website

RUN apk add --update --virtual .tmp-deps python3 make g++ && \
    rm -rf /var/cache/apk/*

COPY package.json .
RUN npm install --quiet

RUN apk del .tmp-deps

COPY . .

RUN npm run build
