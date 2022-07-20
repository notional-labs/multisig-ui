#!/bin/bash

git stash
git pull
cp ../env-multisig .env.local
npm install
npm run build
npm run start
