FROM node:20.9.0-bullseye-slim

RUN apt-get update && apt-get upgrade -y

ENV NODE_ENV=production
ENV DEBUG=myapp:*

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD ["npm", "start"]
