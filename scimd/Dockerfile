FROM golang:1.9-alpine

RUN apk add --no-cache git build-base pcre pcre-dev

ARG dest=$GOPATH/src/scimd

RUN mkdir -p $dest

WORKDIR $dest
ADD . $dest
RUN go get ./...
RUN go install

EXPOSE 8787

ENTRYPOINT scimd --service-provider-config service_provider_config.json --storage-host storage --storage-coll resources --storage-name scimd --storage-port 27017 --storage-type mongo
