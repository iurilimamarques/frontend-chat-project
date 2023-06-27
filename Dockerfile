FROM node:10.19-alpine

WORKDIR /app

ARG GATEWAY_URL
ARG WEBSOCKET_SERVER

ENV WEBSOCKET_SERVER=${WEBSOCKET_SERVER}
ENV GATEWAY_URL=${GATEWAY_URL}

COPY package.json webpack.config.js server.js ./
RUN npm install
COPY . /app
RUN npm run postinstall

EXPOSE 8080

ENTRYPOINT npm start
