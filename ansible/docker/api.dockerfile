FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY . ./

RUN pnpm install

EXPOSE 4000

RUN pnpm run build

CMD [ "node", "dist/src/index.js" ]