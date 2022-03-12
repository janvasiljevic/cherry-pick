FROM node:16-alpine3.11

RUN apk --no-cache add curl

COPY . /usr/src/app
WORKDIR /usr/src/app

EXPOSE 8080

CMD ["yarn", "start:docker"] 