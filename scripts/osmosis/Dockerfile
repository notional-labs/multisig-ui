FROM golang:1.18-alpine3.16 as build

RUN apk add ca-certificates git build-base linux-headers
RUN set -eux

# CosmWasm: see https://github.com/CosmWasm/wasmvm/releases
# 1) Add the releases into /lib/
ADD https://github.com/CosmWasm/wasmvm/releases/download/v1.0.0/libwasmvm_muslc.aarch64.a \ 
  https://github.com/CosmWasm/wasmvm/releases/download/v1.0.0/libwasmvm_muslc.x86_64.a \ 
  /lib/
# 2) Verify their hashes
RUN sha256sum /lib/libwasmvm_muslc.aarch64.a | grep 7d2239e9f25e96d0d4daba982ce92367aacf0cbd95d2facb8442268f2b1cc1fc; \
  sha256sum /lib/libwasmvm_muslc.x86_64.a | grep f6282df732a13dec836cda1f399dd874b1e3163504dbd9607c6af915b2740479
# Copy the right library according to architecture. The final location will be found by the linker flag `-lwasmvm_muslc`
RUN cp /lib/libwasmvm_muslc.$(uname -m).a /lib/libwasmvm_muslc.a

WORKDIR /

# Install osmosisd binary
RUN git clone https://github.com/osmosis-labs/osmosis
WORKDIR /osmosis
RUN git checkout v11.0.0
RUN --mount=type=cache,target=/root/.cache/go-build \
 --mount=type=cache,target=/root/go/pkg/mod \
 go mod download
RUN --mount=type=cache,target=/root/.cache/go-build \
  --mount=type=cache,target=/root/go/pkg/mod \
  BUILD_TAGS=muslc LINK_STATICALLY=true make build

#-------------------------------------------
FROM golang:1.18-alpine3.16

RUN apk add bash

COPY --from=build /osmosis/build/osmosisd /usr/bin/osmosisd

# Copy script
COPY *.sh /scripts/
RUN chmod +x /scripts/*.sh

WORKDIR /scripts

ENTRYPOINT [ "/bin/bash", "join_pool.sh"]