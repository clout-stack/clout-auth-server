FROM node:6
LABEL maintainer "Muhammad Dadu <muhammad.dadu@thisplace.com>"

RUN apt-get update

# Update npm
RUN yarn global add npm@lts

# Tooling dependencies
RUN npm install -g sequelize-cli
RUN npm install -g nodemon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

RUN npm install

COPY . .

EXPOSE 80
ENV HOSTNAME=0.0.0.0