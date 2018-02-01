FROM golang:1.9-alpine

RUN apk add --no-cache git build-base curl

ENV DEP_VERSION 0.3.2
RUN curl -L -s https://github.com/golang/dep/releases/download/v${DEP_VERSION}/dep-linux-amd64 -o $GOPATH/bin/dep
RUN chmod +x $GOPATH/bin/dep

WORKDIR /go/src/github.com/ory

RUN git clone https://github.com/ory/hydra/

WORKDIR /go/src/github.com/ory/hydra

RUN git checkout tags/v0.11.4

RUN dep ensure

RUN go install .

ADD . .

ENTRYPOINT /go/bin/hydra migrate sql $DATABASE_URL; /bin/sleep 5 && /go/bin/hydra clients create --id my-id --is-public -r code,id_token -g authorization_code,refresh_token,implicit -a hydra*,offline,openid,email,hydra -c my-id://callback && /go/bin/hydra policies create -f /go/src/github.com/ory/hydra/policy.json && /go/bin/hydra policies create -f /go/src/github.com/ory/hydra/jwtkey_policy.json && /go/bin/hydra clients import /go/src/github.com/ory/hydra/consent.json && /go/bin/hydra connect --id consent_app --secret thisisthesecret --url http://localhost:4444 && /go/bin/hydra policies delete default-admin-policy && /go/bin/hydra clients delete admin & /go/bin/hydra host --dangerous-auto-logon --dangerous-force-http --disable-telemetry

EXPOSE 4444