FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY . ./

RUN pnpm install

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

RUN pnpm run build

CMD [ "node", ".output/server/index.mjs"]