FROM node:20-alpine

WORKDIR /usr/src/app

COPY . ./

RUN yarn

EXPOSE 4000

RUN yarn build

CMD [ "node", "dist/index.js" ]