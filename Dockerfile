FROM node:10.19-alpine

WORKDIR /app

ENV GATEWAY_URL=https://gateway-chatapp-production.up.railway.app

COPY package.json webpack.config.js server.js ./
RUN npm install
COPY . /app
RUN npm run postinstall
EXPOSE 55001
CMD npm start
