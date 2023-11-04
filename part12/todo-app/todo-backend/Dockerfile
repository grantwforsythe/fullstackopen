FROM node:20.9.0

RUN apt-get update && apt-get upgrade -y

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD ["npm", "start"]
