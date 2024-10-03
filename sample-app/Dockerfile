# Stage 1: Build
FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Stage 2: Run
FROM node:14-alpine
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/app.js ./app.js
EXPOSE 3000
CMD ["dumb-init", "node", "app.js"]

ENV PORT=3000