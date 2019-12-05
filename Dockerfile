FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

ENV SERVICE_AUTH stokr-service-auth

EXPOSE 3000

CMD ["npm" , "start"]
