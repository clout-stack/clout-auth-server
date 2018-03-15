FROM node:6
LABEL maintainer "Muhammad Dadu <muhammad.dadu@thisplace.com>"

RUN apt-get update

# Update npm
RUN yarn global add npm@lts

# Tooling dependencies
RUN npm install -g sequelize-cli
RUN npm install -g nodemon

# Install app dependencies
RUN mkdir /usr/src/app
COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app && npm install

# Create app directory
WORKDIR /usr/src/app

COPY . .

EXPOSE 80
ENV HOSTNAME=0.0.0.0
