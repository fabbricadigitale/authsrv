FROM golang:1.9-alpine

RUN apk add --no-cache git openssl build-base

ARG dest=$GOPATH/src/consent

RUN mkdir -p $dest

WORKDIR $dest
ADD . $dest
RUN go get ./...
RUN go install

# Generate certificate (project requirements)
RUN make server.crt

EXPOSE 3000
CMD ["consent"]