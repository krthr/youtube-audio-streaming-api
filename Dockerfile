FROM node:alpine

RUN apk add  --no-cache ffmpeg

WORKDIR /usr/app
COPY . ./

RUN npm install
RUN npm run build

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]
