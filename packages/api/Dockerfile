FROM node:14-alpine

WORKDIR /usr/src/app

COPY . ./

RUN yarn

EXPOSE 4000

RUN yarn build

# remove development dependencies
RUN npm prune --production

CMD [ "node", "dist/index.js" ]