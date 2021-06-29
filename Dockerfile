# Based on https://github.com/BretFisher/node-docker-good-defaults
FROM node:14-alpine

WORKDIR /opt
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

COPY --from=jwilder/dockerize:0.6.0 /usr/local/bin/dockerize /usr/local/bin

CMD ["npm", "run", "start"]
