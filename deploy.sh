#!/bin/bash

git stash
git pull
if [ -f "../env-multisig" ]; then
    echo "Multisig env file exists."
    cp ../env-multisig .env.local
fi
which npm
npm install
npm run build
systemctl restart multisig.service
