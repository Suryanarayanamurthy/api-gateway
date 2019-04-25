FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

ENV SERVICE_AUTH stokr-service-auth

ENV SERVICE_AUTH_FULL_PATH http://stokr-service-auth:4010

ENV SERVICE_PROJECT stokr-service-project

ENV SERVICE_USER stokr-service-user

ENV SERVICE_CHANNEL stokr-service-channel

ENV SERVICE_COMPANY stokr-service-company

ENV SERVICE_BLOCK stokr-service-block

ENV  STOKR_SERVICE_RISK_QUESTIONS stokr-service-risk-questions

ENV STOKR_SERVICE_MEDIA stokr-service-media

ENV STOKR_SERVICE_EVENTDB stokr-service-eventdb

EXPOSE 3000

CMD ["npm" , "start"]
