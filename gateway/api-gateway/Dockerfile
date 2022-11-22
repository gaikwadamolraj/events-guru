FROM node:18-alpine as prod

WORKDIR /usr/src/app

COPY . ./

RUN npm i 

RUN npm run build

CMD [ "npm", "run","start:prod"]