FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

ENV SERVICE_AUTH stokr-service-auth

ENV SERVICE_PROJECT stokr-service-project

ENV SERVICE_USER stokr-service-user

ENV SERVICE_CHANNEL stokr-service-channel

ENV SERVICE_COMPANY stokr-service-company

ENV SERVICE_BLOCK stokr-service-block

EXPOSE 3000

CMD ["npm" , "start"]
