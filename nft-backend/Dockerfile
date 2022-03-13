FROM golang:1.17-alpine3.14

ENV GO111MODULE=on

RUN apk --no-cache add build-base git mercurial gcc linux-headers
RUN apk add --no-cache -X https://dl-cdn.alpinelinux.org/alpine/edge/testing solidity
RUN apk add --no-cache -X https://dl-cdn.alpinelinux.org/alpine/edge/community docker

RUN go install github.com/gochain/web3/cmd/web3@latest

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /app/main ./cmd/api/main.go

ENV PATH="/usr/bin/solc:$PATH"

EXPOSE 4000
ENTRYPOINT ["/app/main"]
