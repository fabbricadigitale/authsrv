FROM golang:1.9-alpine

RUN apk add --no-cache git build-base

ARG dest=$GOPATH/src/consent

RUN mkdir -p $dest

WORKDIR $dest
ADD . $dest
RUN go get ./...
RUN go install

EXPOSE 3000
CMD ["consent"]