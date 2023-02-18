FROM node:10.19-alpine

WORKDIR /app

COPY package.json webpack.config.js server.js ./
RUN npm install
COPY . /app
RUN npm run postinstall
EXPOSE 55001
CMD npm start
