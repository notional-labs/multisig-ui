#!/usr/bin/env bash

# Get current git branch
BRANCH=$( git branch --show-current)

# Get current git commit number
LABEL=$(git log -1 --format=%h)

# Label the docker container
CONTAINER_NAME=rnssolutions/multisig-ui-pylons

CONTAINER_CURRENT=rnssolutions/multisig-ui-pylons:$LABEL
CONTAINER_LATEST=${CONTAINER_NAME}:latest

# DOCKER_PASSWORD is controller by jenkins env
# DOCKER_USERNAME is controller by jenkins env
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

if [ "${BRANCH}" == 'master']; then
  # Tag current commited version with latest
  docker tag ${CONTAINER_CURRENT} ${CONTAINER_LATEST}
  # Push to  docker hub
  docker push ${CONTAINER_LATEST}
fi
# Push to  docker hub
docker push ${CONTAINER_CURRENT}
