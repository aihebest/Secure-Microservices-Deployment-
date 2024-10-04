FROM node:16-alpine3.18
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk update && apk upgrade && \
    apk add --no-cache libcrypto3>=3.1.4-r0 libssl3>=3.1.4-r0
RUN npm ci --only=production
RUN npm install semver@7.5.2 --save-dev
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]